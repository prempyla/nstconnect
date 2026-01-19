// src/routes/messages.js
const express = require("express");
const prisma = require("../../db");

const router = express.Router();

/**
 * GET /api/rooms/:roomId/messages?limit=20&cursor=<messageId>
 */
router.get("/rooms/:roomId/messages", async (req, res) => {
    try {
        const { roomId } = req.params;
        const limit = Math.min(parseInt(req.query.limit || "30", 10), 100);
        const cursor = req.query.cursor;

        // Get messages newest → oldest
        const messages = await prisma.message.findMany({
            where: { roomId },
            orderBy: { createdAt: "desc" },
            take: limit,
            ...(cursor && {
                cursor: { id: cursor },
                skip: 1 // skip the cursor itself
            }),
            select: {
                id: true,
                text: true,
                userId: true,
                createdAt: true
            }
        });

        // Determine next cursor
        const nextCursor =
            messages.length > 0 ? messages[messages.length - 1].id : null;

        return res.json({
            messages: messages.reverse(), // frontend likes oldest → newest
            nextCursor
        });
    } catch (err) {
        console.error("Error fetching messages:", err);
        res.status(500).json({ error: "Server error" });
    }
});

module.exports = router;
