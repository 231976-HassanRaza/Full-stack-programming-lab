const axios = require("axios");

const BASE_URL = "https://newsapi.org/v2/top-headlines";

// Supported country codes
const VALID_COUNTRIES = [
  "ae","ar","at","au","be","bg","br","ca","ch","cn","co","cu","cz","de",
  "eg","fr","gb","gr","hk","hu","id","ie","il","in","it","jp","kr","lt",
  "lv","ma","mx","my","ng","nl","no","nz","ph","pl","pt","ro","rs","ru",
  "sa","se","sg","si","sk","th","tr","tw","ua","us","ve","za","pk"
];

/**
 * Fetch top headlines for a given country code.
 * @param {string} country - ISO 3166-1 alpha-2 country code (e.g., "us", "pk")
 * @returns {Object} Structured news data
 */
const getHeadlinesByCountry = async (country) => {
  const apiKey = process.env.NEWS_API_KEY;

  if (!apiKey || apiKey === "your_newsapi_key_here") {
    throw new Error("API_KEY_MISSING");
  }

  const countryCode = country.toLowerCase();

  if (!VALID_COUNTRIES.includes(countryCode)) {
    throw new Error("INVALID_COUNTRY_CODE");
  }

  const response = await axios.get(BASE_URL, {
    params: {
      country: countryCode,
      apiKey,
      pageSize: 10, // Limit to 10 articles as per lab requirement
    },
  });

  const data = response.data;

  if (data.status !== "ok") {
    throw new Error("NEWS_API_ERROR");
  }

  // Filter out articles with [Removed] content and map to clean structure
  const articles = data.articles
    .filter((a) => a.title && a.title !== "[Removed]")
    .slice(0, 10)
    .map((article) => ({
      title: article.title,
      source: article.source?.name || "Unknown",
      url: article.url,
      publishedAt: article.publishedAt,
    }));

  return {
    country: countryCode.toUpperCase(),
    totalResults: data.totalResults,
    articlesReturned: articles.length,
    articles,
    fetchedAt: new Date().toISOString(),
  };
};

module.exports = { getHeadlinesByCountry, VALID_COUNTRIES };
