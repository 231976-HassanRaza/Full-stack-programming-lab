const express = require("express");
const cors = require("cors");
require("dotenv").config();

const newsRoutes = require("./routes/newsRoutes");

const app = express();

/* Middleware */
app.use(cors());
app.use(express.json());

/* Welcome Route */
app.get("/", (req, res) => {
  res.json({
    message: "News Headlines API - Lab 13 Task 2",
    author: "Hassan Raza",
    endpoints: {
      getNewsByCountry: "GET /api/news/:countryCode",
      examples: [
        "GET /api/news/pk  → Pakistan",
        "GET /api/news/us  → United States",
        "GET /api/news/gb  → United Kingdom",
        "GET /api/news/in  → India",
        "GET /api/news/ae  → UAE",
      ],
    },
    validCountryCodes:
      "ISO 3166-1 alpha-2 codes: ae, ar, at, au, be, bg, br, ca, cn, co, cu, cz, de, eg, fr, gb, gr, hk, hu, id, ie, il, in, it, jp, kr, lt, lv, ma, mx, my, ng, nl, no, nz, ph, pl, pt, ro, rs, ru, sa, se, sg, si, sk, th, tr, tw, ua, us, ve, za",
  });
});

/* Routes */
app.use("/api/news", newsRoutes);

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

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`✅ News API server running on http://localhost:${PORT}`);
  console.log(`📡 Test: http://localhost:${PORT}/api/news/pk`);
  console.log(`📡 Test: http://localhost:${PORT}/api/news/us`);
});
