/**
 * SYSTEM TESTS — Weather Forecast API (End-to-End Behavior)
 * Tests the full application as a user would interact with it.
 * Mocks the external API to simulate real scenarios without network calls.
 */

const request = require("supertest");
const app = require("../app");

jest.mock("../services/weatherService");
const { getWeatherByCity } = require("../services/weatherService");

describe("Weather API — System Tests (End-to-End Scenarios)", () => {
  beforeEach(() => jest.clearAllMocks());

  // --- SYSTEM TEST 1: Full happy path for Islamabad ---
  test("ST-01: Full system flow — user requests weather for Islamabad", async () => {
    getWeatherByCity.mockResolvedValue({
      city: "Islamabad",
      country: "PK",
      temperature: { current: 29, feelsLike: 31, min: 24, max: 34, unit: "Celsius" },
      condition: { main: "Clouds", description: "scattered clouds" },
      humidity: 65,
      windSpeed: 4.2,
      visibility: 10000,
      timestamp: new Date().toISOString(),
    });

    const res = await request(app)
      .get("/api/weather/Islamabad")
      .expect("Content-Type", /json/)
      .expect(200);

    expect(res.body.success).toBe(true);
    expect(res.body.data.city).toBe("Islamabad");
    expect(res.body.data.condition.main).toBe("Clouds");
    expect(res.body.data.temperature.unit).toBe("Celsius");
    expect(typeof res.body.data.humidity).toBe("number");
  });

  // --- SYSTEM TEST 2: Multiple cities in sequence ---
  test("ST-02: System handles multiple city requests correctly", async () => {
    const cities = ["Karachi", "Lahore", "Peshawar"];
    const mockData = (name) => ({
      city: name,
      country: "PK",
      temperature: { current: 30, feelsLike: 32, min: 25, max: 35, unit: "Celsius" },
      condition: { main: "Clear", description: "clear sky" },
      humidity: 55,
      windSpeed: 3.0,
      visibility: 10000,
      timestamp: new Date().toISOString(),
    });

    for (const city of cities) {
      getWeatherByCity.mockResolvedValueOnce(mockData(city));
      const res = await request(app).get(`/api/weather/${city}`);
      expect(res.statusCode).toBe(200);
      expect(res.body.data.city).toBe(city);
    }
  });

  // --- SYSTEM TEST 3: Invalid city triggers graceful error message ---
  test("ST-03: System gracefully handles invalid city name", async () => {
    getWeatherByCity.mockRejectedValue({ response: { status: 404 } });

    const res = await request(app).get("/api/weather/NotARealCityAtAll");

    expect(res.statusCode).toBe(404);
    expect(res.body.success).toBe(false);
    expect(res.body).toHaveProperty("error");
    expect(typeof res.body.error).toBe("string");
  });

  // --- SYSTEM TEST 4: Special character rejection before hitting service ---
  test("ST-04: System rejects special character city names before external API call", async () => {
    const res = await request(app).get("/api/weather/City<script>");

    expect(res.statusCode).toBe(400);
    expect(getWeatherByCity).not.toHaveBeenCalled(); // Should fail at controller level
    expect(res.body.success).toBe(false);
  });

  // --- SYSTEM TEST 5: Rainy weather scenario ---
  test("ST-05: System correctly returns rainy weather condition", async () => {
    getWeatherByCity.mockResolvedValue({
      city: "Murree",
      country: "PK",
      temperature: { current: 15, feelsLike: 13, min: 12, max: 18, unit: "Celsius" },
      condition: { main: "Rain", description: "light rain" },
      humidity: 90,
      windSpeed: 5.5,
      visibility: 5000,
      timestamp: new Date().toISOString(),
    });

    const res = await request(app).get("/api/weather/Murree");

    expect(res.statusCode).toBe(200);
    expect(res.body.data.condition.main).toBe("Rain");
    expect(res.body.data.humidity).toBeGreaterThan(80);
  });

  // --- SYSTEM TEST 6: API key missing scenario ---
  test("ST-06: System returns proper error when API is not configured", async () => {
    getWeatherByCity.mockRejectedValue(new Error("API_KEY_MISSING"));

    const res = await request(app).get("/api/weather/Islamabad");

    expect(res.statusCode).toBe(500);
    expect(res.body.success).toBe(false);
    expect(res.body.error).toContain("API key");
  });

  // --- SYSTEM TEST 7: Response content-type is always JSON ---
  test("ST-07: System always returns Content-Type application/json", async () => {
    getWeatherByCity.mockResolvedValue({
      city: "Lahore",
      country: "PK",
      temperature: { current: 35, feelsLike: 38, min: 30, max: 40, unit: "Celsius" },
      condition: { main: "Haze", description: "haze" },
      humidity: 70,
      windSpeed: 2.0,
      visibility: 3000,
      timestamp: new Date().toISOString(),
    });

    const res = await request(app).get("/api/weather/Lahore");

    expect(res.headers["content-type"]).toMatch(/application\/json/);
  });
});
