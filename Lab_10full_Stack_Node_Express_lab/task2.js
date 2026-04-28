// ─────────────────────────────────────────────
//  TASK 2 – Simple Message Routes System
//  Run:   node task2.js
//  Open:  http://localhost:3000/home
//         http://localhost:3000/about
//         http://localhost:3000/contact
// ─────────────────────────────────────────────

const express = require('express');
const app = express();

// Reusable helper to build a consistent HTML page
function buildPage(title, emoji, heading, message, color) {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <title>${title}</title>
      <style>
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body {
          font-family: 'Segoe UI', Arial, sans-serif;
          background: linear-gradient(135deg, ${color}22, #f5f7fa);
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .card {
          background: #fff;
          border-radius: 16px;
          box-shadow: 0 4px 20px rgba(0,0,0,.12);
          padding: 50px 60px;
          text-align: center;
          max-width: 520px;
          width: 90%;
        }
        .emoji  { font-size: 64px; }
        h1      { color: ${color}; margin: 16px 0 8px; font-size: 2rem; }
        p       { color: #555; font-size: 1.1rem; line-height: 1.6; margin-bottom: 28px; }
        nav a   {
          display: inline-block; margin: 4px;
          padding: 8px 18px; border-radius: 6px;
          background: ${color}; color: #fff;
          text-decoration: none; font-size: 14px;
        }
        nav a:hover { opacity: .85; }
      </style>
    </head>
    <body>
      <div class="card">
        <div class="emoji">${emoji}</div>
        <h1>${heading}</h1>
        <p>${message}</p>
        <nav>
          <a href="/home">🏠 Home</a>
          <a href="/about">ℹ️ About</a>
          <a href="/contact">📬 Contact</a>
        </nav>
      </div>
    </body>
    </html>
  `;
}

// ── Routes ──────────────────────────────────────────────────────────────────

app.get('/', (req, res) => res.redirect('/home'));

app.get('/home', (req, res) => {
  res.send(
    buildPage(
      'Home',
      '🏠',
      'Welcome Home',
      'This is the home page of our Express application. Navigate through the links below to explore more pages.',
      '#3498db'
    )
  );
});

app.get('/about', (req, res) => {
  res.send(
    buildPage(
      'About',
      'ℹ️',
      'About Us',
      'We are BSSE-VI students at Air University Islamabad learning Full Stack Development with Node.js and Express.',
      '#27ae60'
    )
  );
});

app.get('/contact', (req, res) => {
  res.send(
    buildPage(
      'Contact',
      '📬',
      'Contact Us',
      'Reach us at: <strong>lab10@airuni.edu.pk</strong><br/>Air University, Islamabad, Pakistan.',
      '#8e44ad'
    )
  );
});

// 404 fallback
app.use((req, res) => {
  res.status(404).send(
    buildPage('404', '❓', 'Page Not Found', 'The route you requested does not exist.', '#e74c3c')
  );
});

app.listen(3000, () => {
  console.log('✅ Task 2 running →');
  console.log('   http://localhost:3000/home');
  console.log('   http://localhost:3000/about');
  console.log('   http://localhost:3000/contact');
});
