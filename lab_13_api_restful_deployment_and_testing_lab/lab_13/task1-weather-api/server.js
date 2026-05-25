const express = require("express");
const cors = require("cors");
require("dotenv").config();

const weatherRoutes = require("./routes/weatherRoutes");

const app = express();

/* Middleware */
app.use(cors());
app.use(express.json());

/* Welcome Route */
app.get("/", (req, res) => {
  res.json({
    message: "Weather Forecast API - Lab 13 Task 1",
    author: "Hassan Raza",
    endpoints: {
      getWeather: "GET /api/weather/:city",
      example: "GET /api/weather/Islamabad",
    },
  });
});

/* Routes */
app.use("/api/weather", weatherRoutes);

/* 404 Handler */
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

/* Global Error Handler */
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err.message);
  res.status(500).json({
    success: false,
    message: "Internal server error",
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Weather API server running on http://localhost:${PORT}`);
  console.log(`📡 Test: http://localhost:${PORT}/api/weather/Islamabad`);
});
