const express = require("express");
const axios = require("axios");
const router = express.Router();

// Valid ISO 3166-1 alpha-2 country codes supported by NewsAPI
const VALID_COUNTRY_CODES = new Set([
  "ae", "ar", "at", "au", "be", "bg", "br", "ca", "cn", "co",
  "cu", "cz", "de", "eg", "fr", "gb", "gr", "hk", "hu", "id",
  "ie", "il", "in", "it", "jp", "kr", "lt", "lv", "ma", "mx",
  "my", "ng", "nl", "no", "nz", "ph", "pl", "pt", "ro", "rs",
  "ru", "sa", "se", "sg", "si", "sk", "th", "tr", "tw", "ua",
  "us", "ve", "za", "pk",
]);

/**
 * @route   GET /api/news/:countryCode
 * @desc    Get top 5-10 news headlines for a given country
 * @access  Public
 * @param   countryCode - ISO 3166-1 alpha-2 code (e.g., pk, us, gb)
 */
router.get("/:countryCode", async (req, res) => {
  const countryCode = req.params.countryCode.toLowerCase().trim();

  // --- Input Validation ---
  if (!countryCode || countryCode.length !== 2) {
    return res.status(400).json({
      success: false,
      message: "Country code must be a 2-letter ISO code (e.g., pk, us, gb).",
      examples: ["/api/news/pk", "/api/news/us", "/api/news/gb"],
    });
  }

  if (!VALID_COUNTRY_CODES.has(countryCode)) {
    return res.status(400).json({
      success: false,
      message: `Country code "${countryCode}" is not supported by NewsAPI.`,
      hint: "Use valid ISO 3166-1 alpha-2 codes like: pk, us, gb, in, ae, sa",
      validCodes: Array.from(VALID_COUNTRY_CODES).join(", "),
    });
  }

  // --- API Key Check ---
  const API_KEY = process.env.NEWS_API_KEY;
  if (!API_KEY || API_KEY === "your_newsapi_org_key_here") {
    return res.status(500).json({
      success: false,
      message: "NewsAPI key is missing. Please add it to your .env file.",
      howToGet: "https://newsapi.org/ → Sign up for free → Copy API key",
    });
  }

  try {
    // --- Fetch from NewsAPI ---
    const url = `https://newsapi.org/v2/top-headlines`;
    const response = await axios.get(url, {
      params: {
        country: countryCode,
        apiKey: API_KEY,
        pageSize: 10, // fetch up to 10 articles
      },
    });

    const { status, totalResults, articles } = response.data;

    if (status !== "ok") {
      return res.status(502).json({
        success: false,
        message: "NewsAPI returned an unexpected response.",
      });
    }

    if (!articles || articles.length === 0) {
      return res.status(404).json({
        success: false,
        message: `No news headlines found for country code "${countryCode}".`,
        hint: "This might be a region with limited coverage.",
      });
    }

    // --- Map & filter clean articles (skip removed articles) ---
    const cleanArticles = articles
      .filter((a) => a.title && a.title !== "[Removed]")
      .slice(0, 10)
      .map((article, index) => ({
        index: index + 1,
        title: article.title,
        source: article.source?.name || "Unknown",
        url: article.url,
        publishedAt: article.publishedAt
          ? new Date(article.publishedAt).toLocaleString("en-US", {
              dateStyle: "medium",
              timeStyle: "short",
            })
          : "N/A",
        description: article.description || "No description available.",
      }));

    // --- Final Response ---
    return res.status(200).json({
      success: true,
      country: countryCode.toUpperCase(),
      totalResultsFromAPI: totalResults,
      articlesReturned: cleanArticles.length,
      fetchedAt: new Date().toISOString(),
      headlines: cleanArticles,
    });
  } catch (error) {
    // --- Handle API Errors ---
    if (error.response) {
      const status = error.response.status;
      const apiMessage =
        error.response.data?.message || "Unknown error from NewsAPI";

      if (status === 401) {
        return res.status(401).json({
          success: false,
          message: "Invalid or expired NewsAPI key.",
          detail: apiMessage,
        });
      }

      if (status === 426) {
        return res.status(426).json({
          success: false,
          message:
            "NewsAPI free plan does not support this request from deployed servers. Use localhost for testing.",
          detail: apiMessage,
        });
      }

      if (status === 429) {
        return res.status(429).json({
          success: false,
          message:
            "NewsAPI rate limit exceeded. Free plan allows 100 requests/day.",
        });
      }

      return res.status(status).json({
        success: false,
        message: `NewsAPI error: ${apiMessage}`,
      });
    }

    // Network / timeout
    console.error("News fetch error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Failed to connect to news service. Check your internet.",
      error: error.message,
    });
  }
});

module.exports = router;
