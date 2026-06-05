const express = require("express");
const cors = require("cors");
const weatherRoutes = require("./routes/weatherRoutes");

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/weather", weatherRoutes);

// Root endpoint
app.get("/", (req, res) => {
  res.json({
    message: "Weather Forecast API",
    endpoints: {
      getWeather: "GET /api/weather/:city",
    },
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

module.exports = app;
