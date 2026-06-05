require("dotenv").config();
const app = require("./app");

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`🌤️  Weather Forecast API running on http://localhost:${PORT}`);
  console.log(`📡 Try: http://localhost:${PORT}/api/weather/Islamabad`);
});
