const express = require("express");
const router = express.Router();
const { getHeadlines } = require("../controllers/newsController");

// GET /api/news/:country
router.get("/:country", getHeadlines);

module.exports = router;
