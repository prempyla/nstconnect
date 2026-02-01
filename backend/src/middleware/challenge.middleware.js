const validator = require("validator");

// Validate challenge creation data
function validateChallenge(req, res, next) {
    const { title, prompt } = req.body;

    // Title is required
    if (!title || typeof title !== "string" || validator.isEmpty(title.trim())) {
        return res.status(400).json({ error: "Challenge title is required" });
    }

    // Prompt/description is required
    if (!prompt || typeof prompt !== "string" || validator.isEmpty(prompt.trim())) {
        return res.status(400).json({ error: "Challenge prompt is required" });
    }

    // Title length check (max 200 chars)
    if (title.trim().length > 200) {
        return res.status(400).json({ error: "Title must be 200 characters or less" });
    }

    // Prompt length check (max 1000 chars)
    if (prompt.trim().length > 1000) {
        return res.status(400).json({ error: "Prompt must be 1000 characters or less" });
    }

    // Sanitize inputs
    req.body.title = validator.escape(title.trim());
    req.body.prompt = validator.escape(prompt.trim());

    next();
}

// Validate check-in/response data
function validateCheckIn(req, res, next) {
    const { text } = req.body;

    // Text is required for check-in
    if (!text || typeof text !== "string" || validator.isEmpty(text.trim())) {
        return res.status(400).json({ error: "Check-in text is required" });
    }

    // Text length check (max 2000 chars)
    if (text.trim().length > 2000) {
        return res.status(400).json({ error: "Check-in text must be 2000 characters or less" });
    }

    // Sanitize
    req.body.text = validator.escape(text.trim());

    next();
}

module.exports = {
    validateChallenge,
    validateCheckIn,
};
