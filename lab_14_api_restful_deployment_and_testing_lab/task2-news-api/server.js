require("dotenv").config();
const app = require("./app");

const PORT = process.env.PORT || 5002;

app.listen(PORT, () => {
  console.log(`📰 News Headlines API running on http://localhost:${PORT}`);
  console.log(`📡 Try: http://localhost:${PORT}/api/news/pk`);
  console.log(`📡 Try: http://localhost:${PORT}/api/news/us`);
});
