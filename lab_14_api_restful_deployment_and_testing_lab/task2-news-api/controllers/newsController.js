const { getHeadlinesByCountry } = require("../services/newsService");

/**
 * GET /api/news/:country
 * Returns top headlines for the given country code.
 */
const getHeadlines = async (req, res) => {
  const { country } = req.params;

  // Validate country param exists
  if (!country || country.trim() === "") {
    return res.status(400).json({
      success: false,
      error: "Country code is required",
    });
  }

  // Validate format: must be 2 alpha characters
  const countryRegex = /^[a-zA-Z]{2}$/;
  if (!countryRegex.test(country.trim())) {
    return res.status(400).json({
      success: false,
      error: "Invalid country code format. Use a 2-letter ISO code (e.g., 'us', 'pk', 'gb').",
    });
  }

  try {
    const newsData = await getHeadlinesByCountry(country.trim());

    return res.status(200).json({
      success: true,
      data: newsData,
    });
  } catch (err) {
    if (err.message === "API_KEY_MISSING") {
      return res.status(500).json({
        success: false,
        error: "News API key is not configured. Please set NEWS_API_KEY in .env",
      });
    }

    if (err.message === "INVALID_COUNTRY_CODE") {
      return res.status(400).json({
        success: false,
        error: `Country code "${country}" is not supported. Use a valid ISO 3166-1 alpha-2 code.`,
      });
    }

    if (err.response && err.response.status === 401) {
      return res.status(401).json({
        success: false,
        error: "Invalid News API key. Please check your API key.",
      });
    }

    if (err.response && err.response.status === 429) {
      return res.status(429).json({
        success: false,
        error: "Rate limit exceeded. Please try again later.",
      });
    }

    return res.status(500).json({
      success: false,
      error: "Failed to fetch news headlines. Please try again later.",
    });
  }
};

module.exports = { getHeadlines };
