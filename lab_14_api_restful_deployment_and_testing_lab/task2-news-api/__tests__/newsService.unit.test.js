/**
 * UNIT TESTS — newsService.js
 * Tests the service layer in isolation by mocking axios.
 */

const axios = require("axios");
jest.mock("axios");

const { getHeadlinesByCountry, VALID_COUNTRIES } = require("../services/newsService");

// Mock NewsAPI response
const mockApiResponse = {
  data: {
    status: "ok",
    totalResults: 38,
    articles: [
      {
        source: { name: "Dawn" },
        title: "Pakistan to boost tech exports in 2025",
        url: "https://dawn.com/news/1234567",
        publishedAt: "2025-06-03T08:00:00Z",
      },
      {
        source: { name: "Geo News" },
        title: "Islamabad hosts international summit",
        url: "https://geo.tv/news/987654",
        publishedAt: "2025-06-03T07:30:00Z",
      },
      {
        source: { name: "The News" },
        title: "[Removed]", // Should be filtered out
        url: "https://thenews.com.pk/removed",
        publishedAt: "2025-06-02T12:00:00Z",
      },
    ],
  },
};

describe("NewsService — Unit Tests", () => {
  beforeEach(() => {
    process.env.NEWS_API_KEY = "test_valid_news_api_key";
    jest.clearAllMocks();
  });

  afterEach(() => {
    delete process.env.NEWS_API_KEY;
  });

  // --- UNIT TEST 1: Successful response structure ---
  test("UT-01: should return structured news data for a valid country code", async () => {
    axios.get.mockResolvedValue(mockApiResponse);

    const result = await getHeadlinesByCountry("pk");

    expect(result).toHaveProperty("country", "PK");
    expect(result).toHaveProperty("articles");
    expect(Array.isArray(result.articles)).toBe(true);
    expect(result).toHaveProperty("fetchedAt");
    expect(result).toHaveProperty("totalResults");
    expect(result).toHaveProperty("articlesReturned");
  });

  // --- UNIT TEST 2: [Removed] articles are filtered out ---
  test("UT-02: should filter out articles with [Removed] title", async () => {
    axios.get.mockResolvedValue(mockApiResponse);

    const result = await getHeadlinesByCountry("pk");

    const removedArticles = result.articles.filter((a) => a.title === "[Removed]");
    expect(removedArticles.length).toBe(0);
  });

  // --- UNIT TEST 3: Article shape contains required fields ---
  test("UT-03: each article should contain title, source, url, publishedAt", async () => {
    axios.get.mockResolvedValue(mockApiResponse);

    const result = await getHeadlinesByCountry("pk");

    result.articles.forEach((article) => {
      expect(article).toHaveProperty("title");
      expect(article).toHaveProperty("source");
      expect(article).toHaveProperty("url");
      expect(article).toHaveProperty("publishedAt");
    });
  });

  // --- UNIT TEST 4: Axios called with correct parameters ---
  test("UT-04: should call NewsAPI with correct params", async () => {
    axios.get.mockResolvedValue(mockApiResponse);

    await getHeadlinesByCountry("us");

    expect(axios.get).toHaveBeenCalledWith(
      "https://newsapi.org/v2/top-headlines",
      {
        params: {
          country: "us",
          apiKey: "test_valid_news_api_key",
          pageSize: 10,
        },
      }
    );
  });

  // --- UNIT TEST 5: Throws when API key is missing ---
  test("UT-05: should throw API_KEY_MISSING when key is not set", async () => {
    process.env.NEWS_API_KEY = "your_newsapi_key_here";

    await expect(getHeadlinesByCountry("us")).rejects.toThrow("API_KEY_MISSING");
    expect(axios.get).not.toHaveBeenCalled();
  });

  // --- UNIT TEST 6: Throws for unsupported country code ---
  test("UT-06: should throw INVALID_COUNTRY_CODE for unsupported country", async () => {
    await expect(getHeadlinesByCountry("zz")).rejects.toThrow("INVALID_COUNTRY_CODE");
    expect(axios.get).not.toHaveBeenCalled();
  });

  // --- UNIT TEST 7: Country code is normalized to uppercase in output ---
  test("UT-07: should normalize country code to uppercase in response", async () => {
    axios.get.mockResolvedValue(mockApiResponse);

    const result = await getHeadlinesByCountry("pk");
    expect(result.country).toBe("PK");
  });

  // --- UNIT TEST 8: Result is capped at 10 articles ---
  test("UT-08: should return at most 10 articles", async () => {
    const manyArticles = Array.from({ length: 20 }, (_, i) => ({
      source: { name: `Source ${i}` },
      title: `Article ${i}`,
      url: `https://example.com/${i}`,
      publishedAt: new Date().toISOString(),
    }));

    axios.get.mockResolvedValue({
      data: { status: "ok", totalResults: 20, articles: manyArticles },
    });

    const result = await getHeadlinesByCountry("us");
    expect(result.articles.length).toBeLessThanOrEqual(10);
  });

  // --- UNIT TEST 9: VALID_COUNTRIES includes pk and us ---
  test("UT-09: VALID_COUNTRIES should include common country codes", () => {
    expect(VALID_COUNTRIES).toContain("pk");
    expect(VALID_COUNTRIES).toContain("us");
    expect(VALID_COUNTRIES).toContain("gb");
    expect(VALID_COUNTRIES).toContain("in");
  });
});
