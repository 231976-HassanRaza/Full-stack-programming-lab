const axios = require("axios");

const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

/**
 * Fetch weather data for a given city from OpenWeatherMap API.
 * @param {string} city - The city name
 * @returns {Object} Structured weather data
 */
const getWeatherByCity = async (city) => {
  const apiKey = process.env.OPENWEATHER_API_KEY;

  if (!apiKey || apiKey === "your_openweather_api_key_here") {
    throw new Error("API_KEY_MISSING");
  }

  const response = await axios.get(BASE_URL, {
    params: {
      q: city,
      appid: apiKey,
      units: "metric", // Celsius
    },
  });

  const data = response.data;

  return {
    city: data.name,
    country: data.sys.country,
    temperature: {
      current: data.main.temp,
      feelsLike: data.main.feels_like,
      min: data.main.temp_min,
      max: data.main.temp_max,
      unit: "Celsius",
    },
    condition: {
      main: data.weather[0].main,
      description: data.weather[0].description,
    },
    humidity: data.main.humidity,
    windSpeed: data.wind.speed,
    visibility: data.visibility,
    timestamp: new Date().toISOString(),
  };
};

module.exports = { getWeatherByCity };
