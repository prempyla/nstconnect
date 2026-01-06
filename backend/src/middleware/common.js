const { v4: uuidv4 } = require("uuid"); // Tool to generate unique random IDs
const rateLimit = require("express-rate-limit"); // Tool to limit how many requests a user can make (prevents spam)
const xss = require("xss-clean"); // Tool to clean user input and prevent security attacks (XSS)
const validator = require("validator");
const cookieParser = require("cookie-parser"); // Tool to read cookies sent by the browser

// ---------------------------
// 1. Anonymous ID middleware
// ---------------------------
// This function gives every visitor a unique "nametag" (ID) so we can track them without them logging in.
function attachAnonymousId(req, res, next) {
    // We decide what to call our cookie. If not set in .env, we use "sr_anonymous_id".
    const cookieName = process.env.ANON_COOKIE_NAME || "sr_anonymous_id";

    // Step 1: Try to find the ID in the cookies sent by the browser
    let anonId = req.cookies?.[cookieName];

    // Step 2: If they don't have an ID yet (first time visitor), create one
    if (!anonId) {
        anonId = uuidv4(); // Generate a new unique ID

        // Save this ID in the user's browser as a cookie
        res.cookie(cookieName, anonId, {
            maxAge: 1000 * 60 * 60 * 24 * 365, // The cookie lasts for 1 year
            httpOnly: false,                  // false means frontend JavaScript can read this cookie if needed
            sameSite: "lax",                  // Security setting for how cookies are sent
        });
    }

    // Step 3: Attach the ID to the request object so other parts of our app can use it
    req.anonymousId = anonId;

    // Move to the next step in the server
    next();
}

// ---------------------------
// 2. Rate Limiter Middleware
// ---------------------------
// This is like a security guard that stops people from spamming.
const limiter = rateLimit({
    windowMs: 60 * 1000,  // Time window: 1 minute
    max: 100,             // Limit: Allow 100 requests per minute per IP address (increased for development)
});

// ---------------------------
// 3. Confession Validation
// ---------------------------
// This function checks if the "confession" text sent by the user is valid before we save it.
function validateConfession(req, res, next) {
    let { text } = req.body; // Get the text from the request

    // Check if text is missing or not a string
    if (!text || typeof text !== "string") {
        return res.status(400).json({ error: "Confession text is required." });
    }

    // Remove extra spaces from the beginning and end
    text = text.trim();

    // Check if the text is empty after trimming
    if (validator.isEmpty(text)) {
        return res.status(400).json({ error: "Confession cannot be empty." });
    }

    // Check if the text is too long (more than 2000 characters)
    if (text.length > 2000) {
        return res.status(400).json({ error: "Confession too long." });
    }

    // "Sanitize" or clean the text to remove any dangerous code (like scripts) that hackers might try to inject
    req.body.text = validator.escape(text);

    // If everything is good, move to the next step
    next();
}

// ---------------------------
// EXPORTS
// ---------------------------
// Export these functions so they can be used in other files (like routes)
module.exports = {
    cookieParser,
    // xss,
    limiter,
    attachAnonymousId,
    validateConfession,
};
