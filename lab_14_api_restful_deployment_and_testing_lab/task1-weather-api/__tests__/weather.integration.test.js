/**
 * INTEGRATION TESTS — Weather API Routes
 * Tests the Express routes + controller layer together.
 * The weatherService (axios) is mocked so no real HTTP calls are made.
 */

const request = require("supertest");
const app = require("../app");

// Mock the entire weatherService module
jest.mock("../services/weatherService");
const { getWeatherByCity } = require("../services/weatherService");

const mockWeatherData = {
  city: "Islamabad",
  country: "PK",
  temperature: {
    current: 28.5,
    feelsLike: 30.1,
    min: 25.0,
    max: 32.0,
    unit: "Celsius",
  },
  condition: {
    main: "Clear",
    description: "clear sky",
  },
  humidity: 60,
  windSpeed: 3.5,
  visibility: 10000,
  timestamp: new Date().toISOString(),
};

describe("Weather API — Integration Tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // --- INTEGRATION TEST 1: Successful weather fetch ---
  test("IT-01: GET /api/weather/:city — should return 200 with weather data for valid city", async () => {
    getWeatherByCity.mockResolvedValue(mockWeatherData);

    const res = await request(app).get("/api/weather/Islamabad");

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toHaveProperty("city", "Islamabad");
    expect(res.body.data).toHaveProperty("humidity");
    expect(res.body.data.temperature).toHaveProperty("current");
    expect(res.body.data.condition).toHaveProperty("main");
  });

  // --- INTEGRATION TEST 2: City not found ---
  test("IT-02: GET /api/weather/:city — should return 404 for an invalid city", async () => {
    const error = { response: { status: 404 } };
    getWeatherByCity.mockRejectedValue(error);

    const res = await request(app).get("/api/weather/FakeCityABCXYZ");

    expect(res.statusCode).toBe(404);
    expect(res.body.success).toBe(false);
    expect(res.body.error).toMatch(/not found/i);
  });

  // --- INTEGRATION TEST 3: Invalid city name (special characters) ---
  test("IT-03: GET /api/weather/:city — should return 400 for city name with special characters", async () => {
    const res = await request(app).get("/api/weather/City123!!!");

    expect(res.statusCode).toBe(400);
    expect(res.body.success).toBe(false);
    expect(res.body.error).toMatch(/invalid city/i);
  });

  // --- INTEGRATION TEST 4: API key missing ---
  test("IT-04: GET /api/weather/:city — should return 500 when API key is missing", async () => {
    getWeatherByCity.mockRejectedValue(new Error("API_KEY_MISSING"));

    const res = await request(app).get("/api/weather/Lahore");

    expect(res.statusCode).toBe(500);
    expect(res.body.success).toBe(false);
    expect(res.body.error).toMatch(/api key/i);
  });

  // --- INTEGRATION TEST 5: Unauthorized API key ---
  test("IT-05: GET /api/weather/:city — should return 401 for invalid API key", async () => {
    const error = { response: { status: 401 } };
    getWeatherByCity.mockRejectedValue(error);

    const res = await request(app).get("/api/weather/Karachi");

    expect(res.statusCode).toBe(401);
    expect(res.body.success).toBe(false);
    expect(res.body.error).toMatch(/invalid api key/i);
  });

  // --- INTEGRATION TEST 6: Response JSON structure ---
  test("IT-06: GET /api/weather/:city — response must include all required fields", async () => {
    getWeatherByCity.mockResolvedValue(mockWeatherData);

    const res = await request(app).get("/api/weather/Islamabad");

    expect(res.body.data).toHaveProperty("city");
    expect(res.body.data).toHaveProperty("temperature");
    expect(res.body.data).toHaveProperty("condition");
    expect(res.body.data).toHaveProperty("humidity");
    expect(res.body.data).toHaveProperty("windSpeed");
    expect(res.body.data).toHaveProperty("timestamp");
  });

  // --- INTEGRATION TEST 7: Root route ---
  test("IT-07: GET / — should return API info at root endpoint", async () => {
    const res = await request(app).get("/");

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("message");
    expect(res.body).toHaveProperty("endpoints");
  });

  // --- INTEGRATION TEST 8: Unknown route returns 404 ---
  test("IT-08: GET /api/unknown — should return 404 for non-existent route", async () => {
    const res = await request(app).get("/api/unknown");

    expect(res.statusCode).toBe(404);
  });
});
