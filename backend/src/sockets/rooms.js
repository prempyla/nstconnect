// src/sockets/rooms.js
const prisma = require("../../db");
const Filter = require("bad-words");
const profanityFilter = new Filter();

// in-memory map { roomId: Set(anonymousIds) }
const roomOnlineMap = new Map();
// track last message times to prevent spamming
const messageTimestampMap = new Map(); // key = anonymousId, value = timestamp

module.exports = function (io) {
    io.on("connection", (socket) => {
        console.log("🔌 Client connected:", socket.id);

        // Helper to parse cookies
        const parseCookies = (str) => {
            if (!str) return {};
            return str.split(';').reduce((acc, item) => {
                const [key, value] = item.trim().split('=');
                acc[key] = value;
                return acc;
            }, {});
        };

        const cookies = parseCookies(socket.handshake.headers.cookie);
        const cookieName = process.env.ANON_COOKIE_NAME || "sr_anonymous_id";
        const socketAnonId = cookies[cookieName];

        if (socketAnonId) {
            socket.userId = socketAnonId; // Pre-set userId from cookie
        }

        // Step A — Join room event
        socket.on("room:join", async ({ roomId, anonymousId }) => {
            try {
                // Use payload ID or fallback to cookie ID
                const finalAnonId = anonymousId || socket.userId;

                if (!roomId || !finalAnonId) {
                    console.log("Missing roomId or anonymousId for join");
                    return;
                }

                // Update socket.userId to ensure it's set
                socket.userId = finalAnonId;

                // Ban check
                const banned = await prisma.roomBan.findFirst({
                    where: { roomId, userId: finalAnonId }
                });
                if (banned) {
                    socket.emit("room:join:error", { message: "You are banned from this room" });
                    return;
                }

                // Validate membership
                const membership = await prisma.roomMembership.findFirst({
                    where: { roomId, userId: finalAnonId }
                });

                if (!membership) {
                    console.log("❌ Not a member of room:", roomId);
                    socket.emit("room:join:error", { message: "Not a member of the room" });
                    return;
                }

                socket.join(roomId);

                // Store anonymousId on socket for disconnect handling
                socket.userId = finalAnonId;

                // Track presence
                if (!roomOnlineMap.has(roomId)) {
                    roomOnlineMap.set(roomId, new Set());
                }
                roomOnlineMap.get(roomId).add(finalAnonId);

                console.log(`👤 User ${finalAnonId} joined room ${roomId}`);

                // Broadcast presence count
                io.to(roomId).emit("presence:update", {
                    roomId,
                    count: roomOnlineMap.get(roomId).size
                });

                // Notify others
                socket.to(roomId).emit("room:userJoined", { userId: finalAnonId });
            } catch (err) {
                console.error("Error in room:join:", err);
            }
        });

        // Step B — Send message event
        socket.on("message:send", async ({ roomId, text, anonymousId }) => {
            try {
                const finalAnonId = anonymousId || socket.userId;

                if (!roomId || !text || !finalAnonId) return;

                // Rate limiting
                const now = Date.now();
                const last = messageTimestampMap.get(finalAnonId) || 0;

                if (now - last < 800) { // 800 ms between messages
                    return; // ignore spam
                }

                messageTimestampMap.set(finalAnonId, now);

                // Check membership again — safety
                const membership = await prisma.roomMembership.findFirst({
                    where: { roomId, userId: finalAnonId }
                });
                if (!membership) return;

                let cleanText = text.trim();

                // profanity filter
                try {
                    cleanText = profanityFilter.clean(cleanText);
                } catch (e) {
                    // fallback if filter fails
                }

                // Store in DB
                const message = await prisma.message.create({
                    data: {
                        roomId,
                        userId: finalAnonId,
                        text: cleanText
                    },
                    select: {
                        id: true,
                        roomId: true,
                        userId: true,
                        text: true,
                        createdAt: true
                    }
                });

                // Broadcast to room
                io.to(roomId).emit("message:receive", message);
            } catch (err) {
                console.error("Error sending message:", err);
            }
        });

        // Step C — Typing indicators
        // typing start
        socket.on("typing:start", ({ roomId, anonymousId }) => {
            socket.to(roomId).emit("typing:start", { userId: anonymousId });
        });

        // typing stop
        socket.on("typing:stop", ({ roomId, anonymousId }) => {
            socket.to(roomId).emit("typing:stop", { userId: anonymousId });
        });

        // Step C — disconnect log
        socket.on("disconnecting", () => {
            console.log("🔌 Client disconnecting:", socket.id);

            const rooms = [...socket.rooms].filter(r => r !== socket.id);
            for (const roomId of rooms) {
                // This socket left room
                const set = roomOnlineMap.get(roomId);
                if (!set) continue;

                // We don't know anonymousId here, so map must track socket-user relation
                const anonymousId = socket.userId;
                if (anonymousId) {
                    set.delete(anonymousId);

                    io.to(roomId).emit("presence:update", {
                        roomId,
                        count: set.size
                    });
                }
            }
        });
    });
};
