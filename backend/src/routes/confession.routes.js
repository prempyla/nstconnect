// src/routes/confession.routes.js
const express = require("express");
const router = express.Router();
const {
  createConfession,
  getConfessions,
  getConfessionById,
  flagConfession
} = require("../controllers/confession.controller");

const { validateConfession } = require("../middleware/common");

// POST /confessions
router.post("/", validateConfession, createConfession);

// GET /confessions
router.get("/", getConfessions);

// GET /confessions/:id
router.get("/:id", getConfessionById);

// POST /confessions/:id/flag
router.post("/:id/flag", flagConfession);

module.exports = router;
