const prisma = require("../../db");

// Helper: Calculate challenge progress for a user
async function calculateChallengeProgress(challenge, userId) {
    // Get all responses for this user on this challenge
    const responses = await prisma.challengeResponse.findMany({
        where: {
            challengeId: challenge.id,
            userId: userId,
        },
        orderBy: { createdAt: "asc" },
    });

    // Calculate total days based on dates
    let totalDays = 30; // Default
    if (challenge.startAt && challenge.endAt) {
        const diffTime = Math.abs(new Date(challenge.endAt) - new Date(challenge.startAt));
        totalDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    }

    // Current day is number of responses
    const currentDay = responses.length;

    // Progress percentage
    const progress = Math.round((currentDay / totalDays) * 100);

    // Last check-in date
    const lastCheckIn = responses.length > 0 ? responses[responses.length - 1].createdAt : null;

    return {
        currentDay,
        totalDays,
        progress,
        lastCheckIn,
        userParticipating: responses.length > 0,
    };
}

// GET /challenges - List all public challenges (excluding ones user has joined)
async function getChallenges(req, res) {
    try {
        const userId = req.anonymousId;

        const challenges = await prisma.challenge.findMany({
            where: { isPublic: true },
            orderBy: { createdAt: "desc" },
            include: {
                responses: {
                    select: { userId: true },
                },
            },
        });

        // Format with participant count and user participation
        const formattedChallenges = await Promise.all(
            challenges.map(async (challenge) => {
                // Count unique participants
                const uniqueUsers = new Set(challenge.responses.map((r) => r.userId));
                const participants = uniqueUsers.size;

                // Check if current user is participating
                const userParticipating = challenge.responses.some((r) => r.userId === userId);

                // Calculate progress for this challenge
                const progressData = await calculateChallengeProgress(challenge, userId);

                return {
                    id: challenge.id,
                    title: challenge.title,
                    prompt: challenge.prompt,
                    startAt: challenge.startAt,
                    endAt: challenge.endAt,
                    isPublic: challenge.isPublic,
                    createdAt: challenge.createdAt,
                    creatorId: challenge.creatorId,
                    participants,
                    userParticipating,
                    currentDay: progressData.currentDay,
                    totalDays: progressData.totalDays,
                    isCreator: challenge.creatorId === userId,
                };
            })
        );

        // Filter out challenges user has already joined
        const availableChallenges = formattedChallenges.filter(c => !c.userParticipating);

        res.json(availableChallenges);
    } catch (error) {
        console.error("Error fetching challenges:", error);
        res.status(500).json({ error: "Server error" });
    }
}

// POST /challenges - Create new challenge
async function createChallenge(req, res) {
    try {
        const userId = req.anonymousId;
        const { title, prompt, startAt, endAt, isPublic } = req.body;

        // Ensure anonymous user exists
        await prisma.anonymousUser.upsert({
            where: { id: userId },
            update: { lastActive: new Date() },
            create: { id: userId },
        });

        // Create the challenge
        const challenge = await prisma.challenge.create({
            data: {
                title,
                prompt,
                startAt: startAt ? new Date(startAt) : new Date(),
                endAt: endAt ? new Date(endAt) : null,
                isPublic: isPublic !== undefined ? isPublic : true,
                creatorId: userId, // Track who created the challenge
            },
        });

        // Automatically join the creator to the challenge
        await prisma.challengeResponse.create({
            data: {
                challengeId: challenge.id,
                userId: userId,
                text: "Challenge created! Day 1 begins.",
            },
        });

        res.status(201).json({
            id: challenge.id,
            title: challenge.title,
            prompt: challenge.prompt,
            startAt: challenge.startAt,
            endAt: challenge.endAt,
            isPublic: challenge.isPublic,
            createdAt: challenge.createdAt,
            participants: 1,
            userParticipating: true,
            isCreator: true,
        });
    } catch (error) {
        console.error("Error creating challenge:", error);
        res.status(500).json({ error: "Server error" });
    }
}

// GET /challenges/:id - Get challenge details
async function getChallengeById(req, res) {
    try {
        const userId = req.anonymousId;
        const { id } = req.params;

        const challenge = await prisma.challenge.findUnique({
            where: { id },
            include: {
                responses: {
                    select: { userId: true, createdAt: true },
                },
            },
        });

        if (!challenge) {
            return res.status(404).json({ error: "Challenge not found" });
        }

        // Calculate progress for current user
        const progressData = await calculateChallengeProgress(challenge, userId);

        // Count unique participants
        const uniqueUsers = new Set(challenge.responses.map((r) => r.userId));
        const participants = uniqueUsers.size;

        res.json({
            id: challenge.id,
            title: challenge.title,
            prompt: challenge.prompt,
            startAt: challenge.startAt,
            endAt: challenge.endAt,
            isPublic: challenge.isPublic,
            createdAt: challenge.createdAt,
            participants,
            ...progressData,
            isCreator: challenge.creatorId === userId,
        });
    } catch (error) {
        console.error("Error fetching challenge:", error);
        res.status(500).json({ error: "Server error" });
    }
}

// POST /challenges/:id/join - Join a challenge
async function joinChallenge(req, res) {
    try {
        const userId = req.anonymousId;
        const { id } = req.params;

        // Check if challenge exists
        const challenge = await prisma.challenge.findUnique({
            where: { id },
        });

        if (!challenge) {
            return res.status(404).json({ error: "Challenge not found" });
        }

        // Check if user already joined
        const existingResponse = await prisma.challengeResponse.findFirst({
            where: {
                challengeId: id,
                userId: userId,
            },
        });

        if (existingResponse) {
            return res.status(400).json({ error: "Already joined this challenge" });
        }

        // Ensure anonymous user exists
        await prisma.anonymousUser.upsert({
            where: { id: userId },
            update: { lastActive: new Date() },
            create: { id: userId },
        });

        // Create first response (joining)
        const response = await prisma.challengeResponse.create({
            data: {
                challengeId: id,
                userId: userId,
                text: "Joined the challenge! Let's go!",
            },
        });

        res.status(201).json({
            message: "Successfully joined challenge",
            responseId: response.id,
        });
    } catch (error) {
        console.error("Error joining challenge:", error);
        res.status(500).json({ error: "Server error" });
    }
}

// POST /challenges/:id/complete - Submit daily check-in
async function completeCheckIn(req, res) {
    try {
        const userId = req.anonymousId;
        const { id } = req.params;
        const { text } = req.body;

        // Check if challenge exists
        const challenge = await prisma.challenge.findUnique({
            where: { id },
        });

        if (!challenge) {
            return res.status(404).json({ error: "Challenge not found" });
        }

        // Check if user has joined
        const userResponses = await prisma.challengeResponse.findMany({
            where: {
                challengeId: id,
                userId: userId,
            },
        });

        if (userResponses.length === 0) {
            return res.status(400).json({ error: "Must join challenge before checking in" });
        }

        // Check if already checked in today
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const lastResponse = userResponses[userResponses.length - 1];
        const lastResponseDate = new Date(lastResponse.createdAt);
        lastResponseDate.setHours(0, 0, 0, 0);

        if (lastResponseDate.getTime() === today.getTime()) {
            return res.status(400).json({ error: "Already checked in today" });
        }

        // Ensure anonymous user exists
        await prisma.anonymousUser.upsert({
            where: { id: userId },
            update: { lastActive: new Date() },
            create: { id: userId },
        });

        // Create check-in response
        const response = await prisma.challengeResponse.create({
            data: {
                challengeId: id,
                userId: userId,
                text: text,
            },
        });

        // Calculate updated progress
        const progressData = await calculateChallengeProgress(challenge, userId);

        res.status(201).json({
            message: "Check-in recorded",
            responseId: response.id,
            currentDay: progressData.currentDay,
            progress: progressData.progress,
        });
    } catch (error) {
        console.error("Error completing check-in:", error);
        res.status(500).json({ error: "Server error" });
    }
}

// GET /challenges/my - Get user's challenges (including private ones they created)
async function getMyChallenges(req, res) {
    try {
        const userId = req.anonymousId;

        // Get all challenge IDs where user has responses
        const userResponses = await prisma.challengeResponse.findMany({
            where: { userId },
            select: { challengeId: true },
            distinct: ["challengeId"],
        });

        const participatingChallengeIds = userResponses.map((r) => r.challengeId);

        // Get challenges where user is participating OR is the creator
        const challenges = await prisma.challenge.findMany({
            where: {
                OR: [
                    { id: { in: participatingChallengeIds } },
                    { creatorId: userId, isPublic: false }, // Include private challenges created by user
                ],
            },
            include: {
                responses: {
                    select: { userId: true },
                },
            },
        });

        if (challenges.length === 0) {
            return res.json({ publicChallenges: [], privateChallenges: [] });
        }

        // Format with progress data
        const formattedChallenges = await Promise.all(
            challenges.map(async (challenge) => {
                const progressData = await calculateChallengeProgress(challenge, userId);
                const uniqueUsers = new Set(challenge.responses.map((r) => r.userId));
                const participants = uniqueUsers.size;

                return {
                    id: challenge.id,
                    title: challenge.title,
                    prompt: challenge.prompt,
                    startAt: challenge.startAt,
                    endAt: challenge.endAt,
                    isPublic: challenge.isPublic,
                    createdAt: challenge.createdAt,
                    creatorId: challenge.creatorId,
                    participants,
                    ...progressData,
                    isCreator: challenge.creatorId === userId,
                };
            })
        );

        // Separate into public and private challenges
        const publicChallenges = formattedChallenges.filter(c => c.isPublic);
        const privateChallenges = formattedChallenges.filter(c => !c.isPublic);

        res.json({ publicChallenges, privateChallenges });
    } catch (error) {
        console.error("Error fetching user challenges:", error);
        res.status(500).json({ error: "Server error" });
    }
}

// DELETE /challenges/:id - Delete a challenge
async function deleteChallenge(req, res) {
    try {
        const userId = req.anonymousId;
        const { id } = req.params;

        // Check if challenge exists
        const challenge = await prisma.challenge.findUnique({
            where: { id },
        });

        if (!challenge) {
            return res.status(404).json({ error: "Challenge not found" });
        }

        // Check if user is the creator
        if (challenge.creatorId !== userId) {
            return res.status(403).json({ error: "You are not authorized to delete this challenge" });
        }

        // Delete the challenge
        await prisma.challenge.delete({
            where: { id },
        });

        res.json({ message: "Challenge deleted successfully" });
    } catch (error) {
        console.error("Error deleting challenge:", error);
        res.status(500).json({ error: "Server error" });
    }
}

module.exports = {
    getChallenges,
    createChallenge,
    getChallengeById,
    joinChallenge,
    completeCheckIn,
    getMyChallenges,
    deleteChallenge,
};
