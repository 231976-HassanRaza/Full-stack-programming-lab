const express = require("express");
const router = express.Router();
const { getWeather } = require("../controllers/weatherController");

// GET /api/weather/:city
router.get("/:city", getWeather);

module.exports = router;
