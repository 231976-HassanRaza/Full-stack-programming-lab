const express = require("express");
const axios = require("axios");
const router = express.Router();

router.get("/:city", async (req, res) => {
  const { city } = req.params;

  if (!city || city.trim().length === 0) {
    return res.status(400).json({
      success: false,
      message: "City name is required.",
      example: "/api/weather/Islamabad",
    });
  }

  const API_KEY = process.env.WEATHER_API_KEY;
  if (!API_KEY || API_KEY === "your_weatherapi_key_here") {
    return res.status(500).json({
      success: false,
      message: "WeatherAPI key missing. Add WEATHER_API_KEY to .env",
      howToGet: "https://www.weatherapi.com/signup.aspx → free → instant key",
    });
  }

  try {
    const response = await axios.get("https://api.weatherapi.com/v1/current.json", {
      params: {
        key: API_KEY,
        q: city.trim(),
        aqi: "no",
      },
    });

    const { location, current } = response.data;

    return res.status(200).json({
      success: true,
      city: location.name,
      country: location.country,
      temperature: {
        current: `${current.temp_c}°C`,
        feelsLike: `${current.feelslike_c}°C`,
      },
      condition: {
        main: current.condition.text,
        description: current.condition.text,
        icon: `https:${current.condition.icon}`,
      },
      humidity: `${current.humidity}%`,
      windSpeed: `${current.wind_kph} km/h`,
      visibility: `${current.vis_km} km`,
      fetchedAt: new Date().toISOString(),
    });

  } catch (error) {
    if (error.response) {
      const code = error.response.data?.error?.code;
      if (code === 1006) {
        return res.status(404).json({
          success: false,
          message: `City "${city}" not found.`,
        });
      }
      if (code === 2006 || code === 2007 || code === 2008) {
        return res.status(401).json({
          success: false,
          message: "Invalid or disabled WeatherAPI key.",
        });
      }
    }
    return res.status(500).json({
      success: false,
      message: "Failed to fetch weather data.",
      error: error.message,
    });
  }
});

module.exports = router;