// src/routes/rooms.js
const express = require('express');
const prisma = require('../../db');
const validator = require('validator');
const { validateRoomCreate } = require('../middleware');
const crypto = require('crypto');

const router = express.Router();

/**
 * POST /api/rooms
 * Create a new room (public or private)
 * Body: { name, description?, isPublic, joinCode? }
 */
router.post('/rooms', validateRoomCreate, async (req, res) => {
    try {
        const anonId = req.anonymousId;
        const { name, description, isPublic, joinCode } = req.body;

        // ensure anonymous user exists
        await prisma.anonymousUser.upsert({
            where: { id: anonId },
            update: { lastActive: new Date() },
            create: { id: anonId }
        });

        // Auto-generate joinCode if private and not provided
        let finalJoinCode = joinCode;
        if (!isPublic && !finalJoinCode) {
            finalJoinCode = crypto.randomBytes(4).toString('hex').toUpperCase();
        }

        const room = await prisma.room.create({
            data: {
                name,
                description: description || null,
                isPublic,
                joinCode: isPublic ? null : finalJoinCode,
                createdBy: anonId
            }
        });

        // Automatically add creator as member
        await prisma.roomMembership.create({
            data: {
                roomId: room.id,
                userId: anonId
            }
        });

        return res.status(201).json({
            id: room.id,
            description: room.description,
            isPublic: room.isPublic,
            joinCode: room.joinCode,
            createdAt: room.createdAt
        });
    } catch (err) {
        console.error('Error creating room:', err);
        return res.status(500).json({ error: 'Server error' });
    }
});

/**
 * GET /api/rooms/public
 * List public rooms (Available Rooms)
 * Query: ?limit=20
 */
router.get('/rooms/public', async (req, res) => {
    try {
        const limit = Math.min(parseInt(req.query.limit || '20', 10), 100);

        const rooms = await prisma.room.findMany({
            where: { isPublic: true },
            orderBy: { createdAt: 'desc' },
            take: limit,
            select: {
                id: true,
                name: true,
                description: true,
                createdAt: true,
                _count: {
                    select: { members: true }
                }
            }
        });

        const data = rooms.map(r => ({
            id: r.id,
            name: r.name,
            description: r.description,
            createdAt: r.createdAt,
            memberCount: r._count.members
        }));

        res.json({ data });
    } catch (err) {
        console.error('Error listing public rooms:', err);
        res.status(500).json({ error: 'Server error' });
    }
});

/**
 * POST /api/rooms/join
 * Join a room by code (public or private)
 * Body: { joinCode }
 */
router.post('/rooms/join', async (req, res) => {
    try {
        const anonId = req.anonymousId;
        const { joinCode } = req.body;

        if (!joinCode) {
            return res.status(400).json({ error: 'Join code required' });
        }

        const room = await prisma.room.findUnique({
            where: { joinCode }
        });

        if (!room) {
            return res.status(404).json({ error: 'Room not found' });
        }

        // Ban check
        const banned = await prisma.roomBan.findFirst({
            where: { roomId: room.id, userId: anonId }
        });
        if (banned) {
            return res.status(403).json({ error: 'You are banned from this room' });
        }

        // ensure anon user exists
        await prisma.anonymousUser.upsert({
            where: { id: anonId },
            update: { lastActive: new Date() },
            create: { id: anonId }
        });

        // try create membership
        try {
            await prisma.roomMembership.create({
                data: {
                    roomId: room.id,
                    userId: anonId
                }
            });
        } catch (err) {
            // ignore if already member
        }

        return res.json({
            ok: true,
            room: {
                id: room.id,
                name: room.name,
                description: room.description,
                isPublic: room.isPublic,
                createdAt: room.createdAt
            }
        });
    } catch (err) {
        console.error('Error joining room by code:', err);
        res.status(500).json({ error: 'Server error' });
    }
});

/**
 * POST /api/rooms/:roomId/join
 * Join a room (public or private)
 * For private room, require joinCode in body
 * Body: { joinCode? }
 */
router.post('/rooms/:roomId/join', async (req, res) => {
    try {
        const anonId = req.anonymousId;
        const { roomId } = req.params;
        const { joinCode } = req.body || {};

        const room = await prisma.room.findUnique({
            where: { id: roomId }
        });

        if (!room) {
            return res.status(404).json({ error: 'Room not found' });
        }

        // private room → require joinCode to match
        if (!room.isPublic) {
            if (!joinCode) {
                return res.status(400).json({ error: 'Join code required for private room' });
            }
            if (joinCode !== room.joinCode) {
                return res.status(403).json({ error: 'Invalid join code' });
            }
        }

        // ensure anon user exists
        await prisma.anonymousUser.upsert({
            where: { id: anonId },
            update: { lastActive: new Date() },
            create: { id: anonId }
        });

        // try create membership (ignore if already exists)
        try {
            await prisma.roomMembership.create({
                data: {
                    roomId: room.id,
                    userId: anonId
                }
            });
        } catch (err) {
            // Unique constraint violation (already a member) → safely ignore
            // Prisma error code is "P2002", but we can just ignore all errors here
            console.warn('Membership create failed (maybe already member):', err.meta || err.message);
        }

        return res.json({
            ok: true,
            room: {
                id: room.id,
                name: room.name,
                description: room.description,
                isPublic: room.isPublic,
                joinCode: room.joinCode,
                createdAt: room.createdAt
            }
        });
    } catch (err) {
        console.error('Error joining room:', err);
        res.status(500).json({ error: 'Server error' });
    }
});

/**
 * GET /api/rooms/me
 * My Rooms – rooms I created or joined
 */
router.get('/rooms/me', async (req, res) => {
    try {
        const anonId = req.anonymousId;

        if (!anonId) {
            return res.status(400).json({ error: 'Anonymous id missing' });
        }

        // ensure user exists
        await prisma.anonymousUser.upsert({
            where: { id: anonId },
            update: { lastActive: new Date() },
            create: { id: anonId }
        });

        const ownedRooms = await prisma.room.findMany({
            where: { createdBy: anonId },
            select: {
                id: true,
                name: true,
                description: true,
                isPublic: true,
                joinCode: true,
                createdAt: true
            }
        });

        const memberRooms = await prisma.roomMembership.findMany({
            where: { userId: anonId },
            select: {
                room: {
                    select: {
                        id: true,
                        name: true,
                        description: true,
                        isPublic: true,
                        joinCode: true,
                        createdAt: true
                    }
                }
            }
        });

        // Merge and dedupe rooms
        const map = new Map();

        for (const r of ownedRooms) {
            map.set(r.id, { ...r, role: 'owner' });
        }

        for (const m of memberRooms) {
            const r = m.room;
            if (!map.has(r.id)) {
                map.set(r.id, { ...r, role: 'member' });
            } else {
                // if already owner, keep owner
            }
        }

        const data = Array.from(map.values()).sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );

        res.json({ data });
    } catch (err) {
        console.error('Error fetching my rooms:', err);
        res.status(500).json({ error: 'Server error' });
    }
});

/**
 * GET /api/rooms/:roomId
 * Get room details
 */
router.get('/rooms/:roomId', async (req, res) => {
    try {
        const anonId = req.anonymousId;
        const { roomId } = req.params;

        const room = await prisma.room.findUnique({
            where: { id: roomId },
            include: {
                _count: {
                    select: { members: true }
                }
            }
        });

        if (!room) {
            return res.status(404).json({ error: 'Room not found' });
        }

        // Check if user is banned
        const banned = await prisma.roomBan.findFirst({
            where: { roomId: room.id, userId: anonId }
        });

        if (banned) {
            return res.status(403).json({ error: 'You are banned from this room' });
        }

        const isOwner = room.createdBy === anonId;

        // Check membership
        const membership = await prisma.roomMembership.findUnique({
            where: {
                roomId_userId: { roomId: room.id, userId: anonId }
            }
        });

        const isMember = !!membership || isOwner;

        return res.json({
            room: {
                id: room.id,
                name: room.name,
                description: room.description,
                isPublic: room.isPublic,
                joinCode: isOwner ? room.joinCode : undefined, // Only owner sees join code natively if private, wait... public rooms don't need it. Private rooms: members should maybe see it to share? Let's show it to members too so they can invite friends!
                createdAt: room.createdAt,
                memberCount: room._count.members,
                isOwner,
                isMember
            }
        });
    } catch (err) {
        console.error('Error fetching room details:', err);
        res.status(500).json({ error: 'Server error' });
    }
});

/**
 * DELETE /api/rooms/:roomId/leave
 * Leave a room (public or private)
 */
router.delete('/rooms/:roomId/leave', async (req, res) => {
    try {
        const anonId = req.anonymousId;
        const { roomId } = req.params;

        await prisma.roomMembership.deleteMany({
            where: { roomId, userId: anonId }
        });

        return res.json({ ok: true });
    } catch (err) {
        console.error('Error leaving room:', err);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
