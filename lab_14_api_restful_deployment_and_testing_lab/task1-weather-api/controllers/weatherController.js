const { getWeatherByCity } = require("../services/weatherService");

/**
 * GET /api/weather/:city
 * Returns real-time weather data for the given city.
 */
const getWeather = async (req, res) => {
  const { city } = req.params;

  // Validate city parameter
  if (!city || city.trim() === "") {
    return res.status(400).json({
      success: false,
      error: "City name is required",
    });
  }

  // Sanitize: allow only letters, spaces, hyphens
  const cityRegex = /^[a-zA-Z\s\-]+$/;
  if (!cityRegex.test(city)) {
    return res.status(400).json({
      success: false,
      error: "Invalid city name. Use only letters, spaces, or hyphens.",
    });
  }

  try {
    const weatherData = await getWeatherByCity(city.trim());

    return res.status(200).json({
      success: true,
      data: weatherData,
    });
  } catch (err) {
    // API key missing
    if (err.message === "API_KEY_MISSING") {
      return res.status(500).json({
        success: false,
        error: "Weather API key is not configured. Please set OPENWEATHER_API_KEY in .env",
      });
    }

    // City not found (OpenWeather returns 404)
    if (err.response && err.response.status === 404) {
      return res.status(404).json({
        success: false,
        error: `City "${city}" not found. Please check the city name and try again.`,
      });
    }

    // Unauthorized (bad API key)
    if (err.response && err.response.status === 401) {
      return res.status(401).json({
        success: false,
        error: "Invalid API key. Please check your OpenWeather API key.",
      });
    }

    // Generic server error
    return res.status(500).json({
      success: false,
      error: "Failed to fetch weather data. Please try again later.",
    });
  }
};

module.exports = { getWeather };
