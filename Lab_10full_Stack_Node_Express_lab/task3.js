// ─────────────────────────────────────────────
//  TASK 3 – Dynamic User Page
//  Run:   node task3.js
//  Open:  http://localhost:3000/user/Ali
//         http://localhost:3000/user/Hassan
//         http://localhost:3000/user/<any-name>
// ─────────────────────────────────────────────

const express = require('express');
const app = express();

// A small lookup for extra personalised info (optional extra touch)
const knownUsers = {
  ali:    { emoji: '👨‍💻', role: 'Software Engineer',    city: 'Islamabad' },
  hassan: { emoji: '🚀', role: 'Full Stack Developer',  city: 'Islamabad' },
  ahmed:  { emoji: '🎯', role: 'Data Scientist',        city: 'Karachi'   },
  sara:   { emoji: '🌟', role: 'UX Designer',           city: 'Lahore'    },
};

// GET /user/:name – dynamic route using URL parameter
app.get('/user/:name', (req, res) => {
  // Capture the :name parameter from the URL
  const rawName = req.params.name;
  // Capitalise the first letter for display
  const displayName = rawName.charAt(0).toUpperCase() + rawName.slice(1);
  // Look up extra info if the name is in our map (case-insensitive)
  const info = knownUsers[rawName.toLowerCase()];

  const extraHtml = info
    ? `<div class="info">
         <span>${info.emoji}</span>
         <span><strong>Role:</strong> ${info.role}</span>
         <span><strong>City:</strong> ${info.city}</span>
       </div>`
    : `<div class="info"><span>👤</span><span>Guest user – no extra profile info.</span></div>`;

  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <title>Hello ${displayName}</title>
      <style>
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body {
          font-family: 'Segoe UI', Arial, sans-serif;
          min-height: 100vh;
          background: linear-gradient(135deg, #667eea, #764ba2);
          display: flex; align-items: center; justify-content: center;
        }
        .card {
          background: #fff;
          border-radius: 20px;
          padding: 50px 60px;
          text-align: center;
          box-shadow: 0 8px 32px rgba(0,0,0,.25);
          max-width: 480px; width: 90%;
        }
        .avatar {
          width: 90px; height: 90px;
          border-radius: 50%;
          background: linear-gradient(135deg, #667eea, #764ba2);
          display: flex; align-items: center; justify-content: center;
          font-size: 36px; margin: 0 auto 20px;
          color: #fff;
        }
        h1   { font-size: 2.2rem; color: #2c3e50; margin-bottom: 8px; }
        .sub { color: #888; margin-bottom: 28px; font-size: .95rem; }
        .info {
          background: #f8f9fa;
          border-radius: 10px;
          padding: 16px 20px;
          display: flex; flex-direction: column; gap: 8px;
          text-align: left; font-size: 14px; color: #555;
          margin-bottom: 28px;
        }
        .info span { display: flex; gap: 8px; align-items: center; }
        .url-hint {
          background: #eef2ff;
          border-radius: 8px;
          padding: 10px 16px;
          font-size: 13px; color: #555;
        }
        .url-hint code { color: #667eea; font-weight: bold; }
      </style>
    </head>
    <body>
      <div class="card">
        <div class="avatar">👋</div>
        <h1>Hello, ${displayName}!</h1>
        <p class="sub">Welcome to your dynamic profile page.</p>
        ${extraHtml}
        <div class="url-hint">
          Try: <code>/user/Sara</code> &nbsp;|&nbsp; <code>/user/Ahmed</code>
        </div>
      </div>
    </body>
    </html>
  `);
});

// Root – instructions page
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8"/><title>Task 3</title>
      <style>
        body { font-family: Arial, sans-serif; text-align: center; padding: 80px 20px; }
        h1 { color: #667eea; }
        p  { color: #555; font-size: 1.1rem; }
        a  { color: #764ba2; }
      </style>
    </head>
    <body>
      <h1>Task 3 – Dynamic User Page</h1>
      <p>Visit <a href="/user/Ali">/user/Ali</a> or replace <em>Ali</em> with any name!</p>
    </body>
    </html>
  `);
});

app.listen(3000, () => {
  console.log('✅ Task 3 running →');
  console.log('   http://localhost:3000/user/Ali');
  console.log('   http://localhost:3000/user/Hassan');
  console.log('   http://localhost:3000/user/<any-name>');
});
