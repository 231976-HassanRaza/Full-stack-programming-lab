# Lab 13 - API RESTful Deployment and Testing
**Full Stack Programming | Air University Islamabad**
**Student:** Hassan Raza | **Instructor:** Mr. Sharif Hussain

---

## Overview

This lab contains two RESTful APIs built with **Node.js + Express.js** that integrate external third-party services:

| Task | API | External Service |
|------|-----|-----------------|
| Task 1 | Weather Forecast API | OpenWeatherMap |
| Task 2 | News Headlines API | NewsAPI.org |

---

## 🔑 How to Get API Keys

### Task 1 – OpenWeatherMap API Key
1. Go to [WeatherAPI.com](WeatherAPI.com)
2. Click **Sign In / Create Account** (free)
3. Sign up free → verify email
4. Copy your API key from dashboard — works immediately

### Task 2 – NewsAPI Key
1. Go to [https://newsapi.org/](https://newsapi.org/)
2. Click **Get API Key** (free developer plan)
3. Fill in the form → verify your email
4. Copy your API key from the dashboard
5. ⚠️ Free plan: 100 requests/day, **localhost only**

---

## 📁 Project Structure

```
lab_13_api_restful_deployment_and_testing_lab/
│
├── task1-weather-api/
│   ├── server.js            ← Entry point
│   ├── package.json
│   ├── .env.example         ← Copy to .env and add your key
│   └── routes/
│       └── weatherRoutes.js ← GET /api/weather/:city
│
├── task2-news-api/
│   ├── server.js            ← Entry point
│   ├── package.json
│   ├── .env.example         ← Copy to .env and add your key
│   └── routes/
│       └── newsRoutes.js    ← GET /api/news/:countryCode
│
└── README.md
```

---

## ⚙️ How to Run

### Task 1 – Weather API

```bash
# Step 1: Enter the folder
cd task1-weather-api

# Step 2: Install dependencies
npm install

# Step 3: Create .env file
copy .env.example .env       # Windows
# OR
cp .env.example .env         # Mac/Linux

# Step 4: Open .env and paste your OpenWeatherMap API key
# OPENWEATHER_API_KEY=abc123yourkey

# Step 5: Start the server
npm run dev      # with auto-restart (nodemon)
# OR
npm start        # without auto-restart
```

Server runs at: `http://localhost:5000`

---

### Task 2 – News API

```bash
# Step 1: Enter the folder
cd task2-news-api

# Step 2: Install dependencies
npm install

# Step 3: Create .env file
copy .env.example .env       # Windows
# OR
cp .env.example .env         # Mac/Linux

# Step 4: Open .env and paste your NewsAPI key
# NEWS_API_KEY=abc123yourkey

# Step 5: Start the server
npm run dev      # with auto-restart (nodemon)
# OR
npm start        # without auto-restart
```

Server runs at: `http://localhost:5001`

---

## 📡 API Endpoints

### Task 1 – Weather API

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Welcome + API info |
| GET | `/api/weather/:city` | Get weather for a city |

**Test URLs (open in browser or Postman):**
```
http://localhost:5000/api/weather/Islamabad
http://localhost:5000/api/weather/Karachi
http://localhost:5000/api/weather/London
http://localhost:5000/api/weather/Dubai
http://localhost:5000/api/weather/New York
```

**Sample Response:**
```json
{
  "success": true,
  "city": "Islamabad",
  "country": "PK",
  "temperature": {
    "current": "32°C",
    "feelsLike": "35°C",
    "min": "28°C",
    "max": "36°C"
  },
  "condition": {
    "main": "Clear",
    "description": "clear sky",
    "icon": "https://openweathermap.org/img/wn/01d@2x.png"
  },
  "humidity": "45%",
  "windSpeed": "3.5 m/s",
  "visibility": "10.0 km",
  "fetchedAt": "2026-05-24T10:00:00.000Z"
}
```

---

### Task 2 – News API

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Welcome + valid country codes |
| GET | `/api/news/:countryCode` | Get top 10 headlines by country |

**Test URLs (open in browser or Postman):**
```
http://localhost:5001/api/news/pk    → Pakistan
http://localhost:5001/api/news/us    → United States
http://localhost:5001/api/news/gb    → United Kingdom
http://localhost:5001/api/news/in    → India
http://localhost:5001/api/news/ae    → UAE
http://localhost:5001/api/news/sa    → Saudi Arabia
```

**Sample Response:**
```json
{
  "success": true,
  "country": "PK",
  "totalResultsFromAPI": 35,
  "articlesReturned": 10,
  "fetchedAt": "2026-05-24T10:00:00.000Z",
  "headlines": [
    {
      "index": 1,
      "title": "Pakistan wins T20 series against New Zealand",
      "source": "Dawn News",
      "url": "https://www.dawn.com/...",
      "publishedAt": "May 24, 2026, 9:00 AM",
      "description": "Pakistan cricket team..."
    }
  ]
}
```

---

## 🧪 Testing in Postman

1. Open **Postman**
2. Set method to **GET**
3. Enter URL (e.g., `http://localhost:5000/api/weather/Islamabad`)
4. Click **Send**
5. View the JSON response in the **Body** tab

---

## 🛑 Error Handling

Both APIs handle these errors gracefully:

| Scenario | HTTP Status | Message |
|----------|-------------|---------|
| Invalid city / country | 404 | Not found message |
| Missing API key | 500 | Instructions to add key |
| Wrong API key | 401 | Invalid key message |
| Rate limit exceeded | 429 | Retry later message |
| No internet | 500 | Connection error |

---


