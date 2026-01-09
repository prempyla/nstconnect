// src/controllers/confession.controller.js
const prisma = require("../../db");

// ----------------------------
// Create confession
// ----------------------------
async function createConfession(req, res) {
    try {
        const anonId = req.anonymousId;
        const { text } = req.body;

        // Ensure anon user exists
        const user = await prisma.anonymousUser.upsert({
            where: { id: anonId },
            update: { lastActive: new Date() },
            create: { id: anonId }
        });

        const confession = await prisma.confession.create({
            data: { userId: user.id, content: text }
        });

        return res.status(201).json({
            id: confession.id,
            content: confession.content,
            created_at: confession.createdAt
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Server error" });
    }
}

// ----------------------------
// List confessions
// ----------------------------
async function getConfessions(req, res) {
    try {
        const limit = Math.min(parseInt(req.query.limit || "20"), 100);

        const confessions = await prisma.confession.findMany({
            orderBy: { createdAt: "desc" },
            take: limit,
            select: { id: true, content: true, createdAt: true }
        });

        // Map to frontend format
        const formattedConfessions = confessions.map(c => ({
            id: c.id,
            content: c.content,
            created_at: c.createdAt
        }));

        res.json(formattedConfessions);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
}

// ----------------------------
// Get confession by ID
// ----------------------------
async function getConfessionById(req, res) {
    try {
        const confession = await prisma.confession.findUnique({
            where: { id: req.params.id },
            select: { id: true, content: true, createdAt: true }
        });

        if (!confession) {
            return res.status(404).json({ error: "Not found" });
        }

        res.json({
            id: confession.id,
            content: confession.content,
            created_at: confession.createdAt
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
}

// ----------------------------
// Flag a confession
// ----------------------------
async function flagConfession(req, res) {
    try {
        const anonId = req.anonymousId;
        const confessionId = req.params.id;
        const reason = req.body?.reason || null;

        const exists = await prisma.confession.findUnique({
            where: { id: confessionId }
        });
        if (!exists) return res.status(404).json({ error: "Confession not found" });

        await prisma.anonymousUser.upsert({
            where: { id: anonId },
            update: { lastActive: new Date() },
            create: { id: anonId }
        });

        await prisma.flag.create({
            data: {
                contentType: "confession",
                contentId: confessionId,
                reason: reason?.slice(0, 300),
                userId: anonId
            }
        });

        res.status(201).json({ ok: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
}

module.exports = {
    createConfession,
    getConfessions,
    getConfessionById,
    flagConfession
};
