// src/routes/roomBan.js
const express = require("express");
const prisma = require("../../db");

const router = express.Router();

router.post("/rooms/:roomId/ban", async (req, res) => {
    try {
        const anonId = req.anonymousId;
        const { roomId } = req.params;
        const { targetUserId } = req.body;

        const room = await prisma.room.findUnique({ where: { id: roomId } });
        if (!room) return res.status(404).json({ error: "Room not found" });

        // Only creator can ban
        if (room.createdBy !== anonId) {
            return res.status(403).json({ error: "Not allowed" });
        }

        await prisma.roomBan.create({
            data: {
                roomId,
                userId: targetUserId
            }
        });

        return res.json({ ok: true });
    } catch (err) {
        console.error("Error banning user:", err);
        res.status(500).json({ error: "Server error" });
    }
});

module.exports = router;
