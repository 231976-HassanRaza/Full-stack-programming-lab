# Lab 14 — MERN Stack Application Testing Using Jest
**Full Stack Programming | Air University Islamabad**

---

## Overview

This lab contains two independent REST API projects:

| Task | Folder | Port | External API |
|------|--------|------|-------------|
| Task 8.1 | `task1-weather-api` | 5001 | OpenWeatherMap |
| Task 8.2 | `task2-news-api` | 5002 | NewsAPI.org |

---

## Prerequisites

- Node.js (LTS) installed
- npm
- Postman (for manual testing)

---

## Task 8.1 — Weather Forecast API

### Setup

```bash
cd task1-weather-api
npm install
```

### Configure API Key

1. Go to https://openweathermap.org/api → Sign up → Copy your API key


### Run Server

```bash
npm start
# Server runs on http://localhost:5001
```

### Endpoints

| Method | URL | Description |
|--------|-----|-------------|
| GET | `/` | API info |
| GET | `/api/weather/:city` | Get weather for a city |

### Example Requests (Browser or Postman)

```
GET http://localhost:5001/api/weather/Islamabad
GET http://localhost:5001/api/weather/Karachi
GET http://localhost:5001/api/weather/London
```

### Sample Response

```json
{
  "success": true,
  "data": {
    "city": "Islamabad",
    "country": "PK",
    "temperature": {
      "current": 29.5,
      "feelsLike": 31.2,
      "min": 25.0,
      "max": 34.0,
      "unit": "Celsius"
    },
    "condition": {
      "main": "Clouds",
      "description": "scattered clouds"
    },
    "humidity": 65,
    "windSpeed": 4.2,
    "visibility": 10000,
    "timestamp": "2025-06-03T10:30:00.000Z"
  }
}
```

### Run Jest Tests

```bash
npm test
```

**Test coverage:** 21 tests across 3 suites
- `weatherService.unit.test.js` — 6 Unit Tests (service logic, mocked axios)
- `weather.integration.test.js` — 8 Integration Tests (routes + controller)
- `weather.system.test.js` — 7 System Tests (end-to-end scenarios)

---

## Task 8.2 — News Headlines API

### Setup

```bash
cd task2-news-api
npm install
```

### Configure API Key

1. Go to https://newsapi.org/ → Register → Copy your API key

### Run Server

```bash
npm start
# Server runs on http://localhost:5002
```

### Endpoints

| Method | URL | Description |
|--------|-----|-------------|
| GET | `/` | API info |
| GET | `/api/news/:country` | Get top headlines for a country |

### Supported Country Codes

`pk`, `us`, `gb`, `in`, `au`, `ca`, `de`, `fr`, `jp`, `cn`, `sa`, and many more (ISO 3166-1 alpha-2)

### Example Requests

```
GET http://localhost:5002/api/news/pk
GET http://localhost:5002/api/news/us
GET http://localhost:5002/api/news/gb
```

### Sample Response

```json
{
  "success": true,
  "data": {
    "country": "PK",
    "totalResults": 38,
    "articlesReturned": 5,
    "articles": [
      {
        "title": "Pakistan tech exports reach new high",
        "source": "Dawn",
        "url": "https://dawn.com/news/...",
        "publishedAt": "2025-06-03T08:00:00Z"
      }
    ],
    "fetchedAt": "2025-06-03T10:30:00.000Z"
  }
}
```

### Run Jest Tests

```bash
npm test
```

**Test coverage:** 27 tests across 3 suites
- `newsService.unit.test.js` — 9 Unit Tests (service logic, mocked axios)
- `news.integration.test.js` — 10 Integration Tests (routes + controller)
- `news.system.test.js` — 8 System Tests (end-to-end scenarios)

---

## Testing Summary

| Project | Unit Tests | Integration Tests | System Tests | Total |
|---------|-----------|-------------------|--------------|-------|
| Task 8.1 Weather API | 6 | 8 | 7 | **21** |
| Task 8.2 News API | 9 | 10 | 8 | **27** |
| **Total** | **15** | **18** | **15** | **48** |

All 48 tests pass ✅

---
