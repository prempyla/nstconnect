const express = require("express");
const router = express.Router();
const {
    getChallenges,
    createChallenge,
    getChallengeById,
    joinChallenge,
    completeCheckIn,
    getMyChallenges,
    deleteChallenge,
} = require("../controllers/challenge.controller");
const {
    validateChallenge,
    validateCheckIn,
} = require("../middleware/challenge.middleware");

// GET /challenges/my - Must be before /:id to avoid conflict
router.get("/my", getMyChallenges);

// GET /challenges - List all public challenges
router.get("/", getChallenges);

// POST /challenges - Create new challenge
router.post("/", validateChallenge, createChallenge);

// GET /challenges/:id - Get challenge by ID
router.get("/:id", getChallengeById);

// POST /challenges/:id/join - Join a challenge
router.post("/:id/join", joinChallenge);

// POST /challenges/:id/complete - Submit daily check-in
router.post("/:id/complete", validateCheckIn, completeCheckIn);

// DELETE /challenges/:id - Delete a challenge
router.delete("/:id", deleteChallenge);

module.exports = router;
