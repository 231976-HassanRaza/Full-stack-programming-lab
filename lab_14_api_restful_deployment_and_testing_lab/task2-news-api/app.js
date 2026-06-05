const express = require("express");
const cors = require("cors");
const newsRoutes = require("./routes/newsRoutes");

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/news", newsRoutes);

// Root endpoint
app.get("/", (req, res) => {
  res.json({
    message: "News Headlines API",
    endpoints: {
      getHeadlines: "GET /api/news/:country",
      example: "GET /api/news/pk  (Pakistan)",
      countryCodes: "us, pk, gb, in, au, ca, de, fr, jp, cn",
    },
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

module.exports = app;
