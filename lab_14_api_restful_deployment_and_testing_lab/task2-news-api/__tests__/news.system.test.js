/**
 * SYSTEM TESTS — News Headlines API (End-to-End Behavior)
 * Tests the full system as a user would interact with it.
 */

const request = require("supertest");
const app = require("../app");

jest.mock("../services/newsService");
const { getHeadlinesByCountry } = require("../services/newsService");

const buildMockNews = (country, count = 5) => ({
  country: country.toUpperCase(),
  totalResults: 100,
  articlesReturned: count,
  articles: Array.from({ length: count }, (_, i) => ({
    title: `${country.toUpperCase()} News Headline ${i + 1}`,
    source: `Source ${i + 1}`,
    url: `https://example.com/${country}/${i + 1}`,
    publishedAt: new Date(Date.now() - i * 3600000).toISOString(),
  })),
  fetchedAt: new Date().toISOString(),
});

describe("News API — System Tests (End-to-End Scenarios)", () => {
  beforeEach(() => jest.clearAllMocks());

  // --- SYSTEM TEST 1: Pakistan headlines full flow ---
  test("ST-01: Full system flow — user requests Pakistan headlines", async () => {
    getHeadlinesByCountry.mockResolvedValue(buildMockNews("pk", 8));

    const res = await request(app)
      .get("/api/news/pk")
      .expect("Content-Type", /json/)
      .expect(200);

    expect(res.body.success).toBe(true);
    expect(res.body.data.country).toBe("PK");
    expect(res.body.data.articles).toHaveLength(8);
    expect(res.body.data.articles[0]).toHaveProperty("title");
    expect(res.body.data.articles[0]).toHaveProperty("source");
    expect(res.body.data.articles[0]).toHaveProperty("url");
    expect(res.body.data.articles[0]).toHaveProperty("publishedAt");
  });

  // --- SYSTEM TEST 2: Multiple countries in sequence ---
  test("ST-02: System handles headlines for multiple countries correctly", async () => {
    const countryCodes = ["us", "gb", "in", "pk"];

    for (const code of countryCodes) {
      getHeadlinesByCountry.mockResolvedValueOnce(buildMockNews(code));
      const res = await request(app).get(`/api/news/${code}`);
      expect(res.statusCode).toBe(200);
      expect(res.body.data.country).toBe(code.toUpperCase());
    }
  });

  // --- SYSTEM TEST 3: Case insensitivity — uppercase country code ---
  test("ST-03: System should handle uppercase country code input", async () => {
    getHeadlinesByCountry.mockResolvedValue(buildMockNews("us"));

    // Controller lowercases before passing to service, but route param US should still work
    const res = await request(app).get("/api/news/US");

    // US is 2 letters alpha — passes format check; service mock returns data
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
  });

  // --- SYSTEM TEST 4: Articles capped at 10 ---
  test("ST-04: System returns at most 10 articles", async () => {
    getHeadlinesByCountry.mockResolvedValue(buildMockNews("us", 10));

    const res = await request(app).get("/api/news/us");

    expect(res.statusCode).toBe(200);
    expect(res.body.data.articles.length).toBeLessThanOrEqual(10);
  });

  // --- SYSTEM TEST 5: Invalid format rejected before service call ---
  test("ST-05: System rejects 3-char country code without hitting the service", async () => {
    const res = await request(app).get("/api/news/usa");

    expect(res.statusCode).toBe(400);
    expect(getHeadlinesByCountry).not.toHaveBeenCalled();
  });

  // --- SYSTEM TEST 6: Service failure is handled gracefully ---
  test("ST-06: System returns 500 with clear message on unexpected service failure", async () => {
    getHeadlinesByCountry.mockRejectedValue(new Error("Unexpected DB failure"));

    const res = await request(app).get("/api/news/us");

    expect(res.statusCode).toBe(500);
    expect(res.body.success).toBe(false);
    expect(typeof res.body.error).toBe("string");
  });

  // --- SYSTEM TEST 7: Response always has JSON content type ---
  test("ST-07: All responses are Content-Type application/json", async () => {
    getHeadlinesByCountry.mockResolvedValue(buildMockNews("de", 3));

    const res = await request(app).get("/api/news/de");
    expect(res.headers["content-type"]).toMatch(/application\/json/);
  });

  // --- SYSTEM TEST 8: fetchedAt is a valid ISO timestamp ---
  test("ST-08: Response fetchedAt field is a valid ISO timestamp", async () => {
    getHeadlinesByCountry.mockResolvedValue(buildMockNews("pk", 5));

    const res = await request(app).get("/api/news/pk");
    const { fetchedAt } = res.body.data;

    expect(typeof fetchedAt).toBe("string");
    expect(() => new Date(fetchedAt).toISOString()).not.toThrow();
  });
});
