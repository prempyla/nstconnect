require('dotenv').config();
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const {
    cookieParser,
    limiter,
    attachAnonymousId,
    validateConfession,
} = require("./src/middleware/common");

const confessionRoutes = require("./src/routes/confession.routes");
const challengeRoutes = require("./src/routes/challenge.routes");
const roomRoutes = require("./src/routes/rooms");
const messageRoutes = require("./src/routes/messages");
const messageFlagRoutes = require("./src/routes/messageFlags");
const roomBanRoutes = require("./src/routes/roomBan");

const app = express();
const server = http.createServer(app);

const allowedOrigins = [
    'http://localhost:3000',
    'http://localhost:3001',
    process.env.FRONTEND_URL,
].filter(Boolean);

// Socket.IO setup
const io = new Server(server, {
    cors: {
        origin: allowedOrigins,
        credentials: true,
    },
});

// Attach socket handler
require("./src/sockets/rooms")(io);

// Trust proxy - required for Render and other hosting platforms
app.set('trust proxy', 1);

// CORS configuration
app.use(cors({
    origin: allowedOrigins,
    credentials: true
}));

// General middleware
app.use(express.json());
app.use(cookieParser());

// Apply rate limiting globally
app.use(limiter);

// Attach anonymous ID
app.use(attachAnonymousId);

// Routes
app.use("/confessions", confessionRoutes);
app.use("/challenges", challengeRoutes);
app.use("/", roomRoutes);
app.use("/", messageRoutes);
app.use("/", messageFlagRoutes);
app.use("/", roomBanRoutes);

const PORT = process.env.PORT || 4000;

if (require.main === module) {
    server.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}

module.exports = { app, server };
