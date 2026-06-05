/**
 * UNIT TESTS — weatherService.js
 * Tests the service layer in isolation by mocking axios.
 */

const axios = require("axios");
jest.mock("axios");

const { getWeatherByCity } = require("../services/weatherService");

// Mock successful OpenWeather API response
const mockApiResponse = {
  data: {
    name: "Islamabad",
    sys: { country: "PK" },
    main: {
      temp: 28.5,
      feels_like: 30.1,
      temp_min: 25.0,
      temp_max: 32.0,
      humidity: 60,
    },
    weather: [{ main: "Clear", description: "clear sky" }],
    wind: { speed: 3.5 },
    visibility: 10000,
  },
};

describe("WeatherService — Unit Tests", () => {
  beforeEach(() => {
    // Set API key for tests
    process.env.OPENWEATHER_API_KEY = "test_valid_api_key";
    jest.clearAllMocks();
  });

  afterEach(() => {
    delete process.env.OPENWEATHER_API_KEY;
  });

  // --- UNIT TEST 1: Successful response shape ---
  test("UT-01: should return structured weather data for a valid city", async () => {
    axios.get.mockResolvedValue(mockApiResponse);

    const result = await getWeatherByCity("Islamabad");

    expect(result).toHaveProperty("city", "Islamabad");
    expect(result).toHaveProperty("country", "PK");
    expect(result).toHaveProperty("temperature");
    expect(result.temperature).toHaveProperty("current", 28.5);
    expect(result.temperature).toHaveProperty("unit", "Celsius");
    expect(result).toHaveProperty("condition");
    expect(result.condition).toHaveProperty("main", "Clear");
    expect(result).toHaveProperty("humidity", 60);
    expect(result).toHaveProperty("windSpeed", 3.5);
    expect(result).toHaveProperty("timestamp");
  });

  // --- UNIT TEST 2: Axios called with correct params ---
  test("UT-02: should call OpenWeather API with correct parameters", async () => {
    axios.get.mockResolvedValue(mockApiResponse);

    await getWeatherByCity("Karachi");

    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith(
      "https://api.openweathermap.org/data/2.5/weather",
      {
        params: {
          q: "Karachi",
          appid: "test_valid_api_key",
          units: "metric",
        },
      }
    );
  });

  // --- UNIT TEST 3: Missing API key ---
  test("UT-03: should throw API_KEY_MISSING when API key is not set", async () => {
    process.env.OPENWEATHER_API_KEY = "your_openweather_api_key_here";

    await expect(getWeatherByCity("Lahore")).rejects.toThrow("API_KEY_MISSING");
    expect(axios.get).not.toHaveBeenCalled();
  });

  // --- UNIT TEST 4: City not found (404) ---
  test("UT-04: should throw when city is not found (404 from API)", async () => {
    const error = { response: { status: 404 } };
    axios.get.mockRejectedValue(error);

    await expect(getWeatherByCity("InvalidCityXYZ")).rejects.toMatchObject({
      response: { status: 404 },
    });
  });

  // --- UNIT TEST 5: Unauthorized (401) ---
  test("UT-05: should throw when API key is invalid (401 from API)", async () => {
    const error = { response: { status: 401 } };
    axios.get.mockRejectedValue(error);

    await expect(getWeatherByCity("Islamabad")).rejects.toMatchObject({
      response: { status: 401 },
    });
  });

  // --- UNIT TEST 6: Timestamp is a valid ISO string ---
  test("UT-06: should include a valid ISO timestamp in the response", async () => {
    axios.get.mockResolvedValue(mockApiResponse);

    const result = await getWeatherByCity("Islamabad");
    const parsedDate = new Date(result.timestamp);

    expect(parsedDate.toISOString()).toBe(result.timestamp);
  });
});
