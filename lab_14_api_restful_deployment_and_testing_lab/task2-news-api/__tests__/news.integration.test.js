/**
 * INTEGRATION TESTS — News API Routes
 * Tests the Express routes + controller together with mocked service.
 */

const request = require("supertest");
const app = require("../app");

jest.mock("../services/newsService");
const { getHeadlinesByCountry } = require("../services/newsService");

const mockNewsData = {
  country: "PK",
  totalResults: 38,
  articlesReturned: 5,
  articles: [
    {
      title: "Pakistan tech sector sees record growth",
      source: "Dawn",
      url: "https://dawn.com/1",
      publishedAt: "2025-06-03T08:00:00Z",
    },
    {
      title: "New policy announced for IT exports",
      source: "Geo News",
      url: "https://geo.tv/2",
      publishedAt: "2025-06-03T07:00:00Z",
    },
    {
      title: "PM visits tech park in Islamabad",
      source: "The News",
      url: "https://thenews.com.pk/3",
      publishedAt: "2025-06-03T06:00:00Z",
    },
    {
      title: "Startup ecosystem expands in Lahore",
      source: "Express Tribune",
      url: "https://tribune.com.pk/4",
      publishedAt: "2025-06-03T05:00:00Z",
    },
    {
      title: "Digital Pakistan initiative update",
      source: "ARY News",
      url: "https://arynews.tv/5",
      publishedAt: "2025-06-03T04:00:00Z",
    },
  ],
  fetchedAt: new Date().toISOString(),
};

describe("News API — Integration Tests", () => {
  beforeEach(() => jest.clearAllMocks());

  // --- INTEGRATION TEST 1: Successful fetch ---
  test("IT-01: GET /api/news/:country — should return 200 with articles for valid country", async () => {
    getHeadlinesByCountry.mockResolvedValue(mockNewsData);

    const res = await request(app).get("/api/news/pk");

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toHaveProperty("country", "PK");
    expect(Array.isArray(res.body.data.articles)).toBe(true);
    expect(res.body.data.articles.length).toBeGreaterThan(0);
  });

  // --- INTEGRATION TEST 2: Invalid country code format ---
  test("IT-02: GET /api/news/:country — should return 400 for invalid code format (>2 chars)", async () => {
    const res = await request(app).get("/api/news/usa");

    expect(res.statusCode).toBe(400);
    expect(res.body.success).toBe(false);
    expect(res.body.error).toMatch(/2-letter/i);
  });

  // --- INTEGRATION TEST 3: Unsupported country code ---
  test("IT-03: GET /api/news/:country — should return 400 for unsupported country code", async () => {
    getHeadlinesByCountry.mockRejectedValue(new Error("INVALID_COUNTRY_CODE"));

    const res = await request(app).get("/api/news/zz");

    expect(res.statusCode).toBe(400);
    expect(res.body.success).toBe(false);
    expect(res.body.error).toMatch(/not supported/i);
  });

  // --- INTEGRATION TEST 4: API key missing ---
  test("IT-04: GET /api/news/:country — should return 500 when API key is missing", async () => {
    getHeadlinesByCountry.mockRejectedValue(new Error("API_KEY_MISSING"));

    const res = await request(app).get("/api/news/us");

    expect(res.statusCode).toBe(500);
    expect(res.body.success).toBe(false);
    expect(res.body.error).toMatch(/api key/i);
  });

  // --- INTEGRATION TEST 5: Unauthorized API key ---
  test("IT-05: GET /api/news/:country — should return 401 for bad API key", async () => {
    getHeadlinesByCountry.mockRejectedValue({ response: { status: 401 } });

    const res = await request(app).get("/api/news/gb");

    expect(res.statusCode).toBe(401);
    expect(res.body.success).toBe(false);
  });

  // --- INTEGRATION TEST 6: Rate limit exceeded ---
  test("IT-06: GET /api/news/:country — should return 429 for rate limit error", async () => {
    getHeadlinesByCountry.mockRejectedValue({ response: { status: 429 } });

    const res = await request(app).get("/api/news/us");

    expect(res.statusCode).toBe(429);
    expect(res.body.success).toBe(false);
    expect(res.body.error).toMatch(/rate limit/i);
  });

  // --- INTEGRATION TEST 7: Response contains required article fields ---
  test("IT-07: GET /api/news/:country — each article should have title, source, url, publishedAt", async () => {
    getHeadlinesByCountry.mockResolvedValue(mockNewsData);

    const res = await request(app).get("/api/news/pk");

    res.body.data.articles.forEach((article) => {
      expect(article).toHaveProperty("title");
      expect(article).toHaveProperty("source");
      expect(article).toHaveProperty("url");
      expect(article).toHaveProperty("publishedAt");
    });
  });

  // --- INTEGRATION TEST 8: Root route returns API info ---
  test("IT-08: GET / — should return API info at root endpoint", async () => {
    const res = await request(app).get("/");

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("message", "News Headlines API");
    expect(res.body).toHaveProperty("endpoints");
  });

  // --- INTEGRATION TEST 9: Numeric-only country code rejected ---
  test("IT-09: GET /api/news/:country — should reject numeric-only country code", async () => {
    const res = await request(app).get("/api/news/12");

    expect(res.statusCode).toBe(400);
    expect(res.body.success).toBe(false);
  });

  // --- INTEGRATION TEST 10: Unknown route ---
  test("IT-10: GET /api/unknown — should return 404 for unknown routes", async () => {
    const res = await request(app).get("/api/unknown");
    expect(res.statusCode).toBe(404);
  });
});
