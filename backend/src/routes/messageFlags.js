// src/routes/messageFlags.js
const express = require("express");
const prisma = require("../../db");

const router = express.Router();

/**
 * POST /api/messages/:messageId/flag
 * body: { reason }
 */
router.post("/messages/:messageId/flag", async (req, res) => {
    try {
        const anonId = req.anonymousId;
        const { messageId } = req.params;
        const { reason } = req.body || {};

        const exists = await prisma.message.findUnique({
            where: { id: messageId },
            select: { id: true, roomId: true }
        });
        if (!exists) return res.status(404).json({ error: "Message not found" });

        await prisma.anonymousUser.upsert({
            where: { id: anonId },
            update: { lastActive: new Date() },
            create: { id: anonId }
        });

        await prisma.flag.create({
            data: {
                contentType: "message",
                contentId: messageId,
                reason: reason?.slice(0, 500) || null,
                userId: anonId
            }
        });

        return res.status(201).json({ ok: true });
    } catch (err) {
        console.error("Error flagging message:", err);
        res.status(500).json({ error: "Server error" });
    }
});

module.exports = router;
