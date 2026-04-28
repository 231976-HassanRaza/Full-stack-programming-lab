// ─────────────────────────────────────────────
//  TASK 4 – Simple HTML Page Renderer
//  Run:   node task4.js
//  Open:  http://localhost:3000/
// ─────────────────────────────────────────────

const express = require('express');
const app = express();

// GET / – returns a full, well-structured HTML page
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Lab 10 – Full Stack Node + Express</title>
      <style>
        /* ── Reset & Base ── */
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body {
          font-family: 'Segoe UI', Arial, sans-serif;
          background: #f0f4f8;
          color: #333;
          line-height: 1.7;
        }

        /* ── Header ── */
        header {
          background: linear-gradient(135deg, #1a1a2e, #16213e, #0f3460);
          color: #fff;
          text-align: center;
          padding: 60px 20px 50px;
        }
        header h1 { font-size: 2.8rem; letter-spacing: 1px; }
        header p  { font-size: 1.15rem; opacity: .8; margin-top: 10px; }
        .badge {
          display: inline-block;
          background: #e94560;
          color: #fff;
          border-radius: 20px;
          padding: 4px 16px;
          font-size: .85rem;
          margin-top: 14px;
          letter-spacing: .5px;
        }

        /* ── Main Content ── */
        main { max-width: 820px; margin: 40px auto; padding: 0 20px 60px; }

        /* ── Intro paragraph ── */
        .intro {
          background: #fff;
          border-left: 5px solid #0f3460;
          border-radius: 0 12px 12px 0;
          padding: 24px 28px;
          margin-bottom: 32px;
          box-shadow: 0 2px 10px rgba(0,0,0,.07);
          font-size: 1.05rem;
        }

        /* ── Section cards ── */
        .section {
          background: #fff;
          border-radius: 14px;
          padding: 30px 32px;
          margin-bottom: 26px;
          box-shadow: 0 3px 12px rgba(0,0,0,.08);
        }
        .section h2 {
          color: #0f3460;
          font-size: 1.35rem;
          margin-bottom: 14px;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        /* ── Lists ── */
        ul, ol {
          padding-left: 22px;
          font-size: 1rem;
        }
        li { margin: 6px 0; }
        ul li::marker { color: #e94560; }
        ol li::marker { color: #0f3460; font-weight: bold; }

        /* ── Tech grid ── */
        .tech-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
          gap: 12px;
          margin-top: 12px;
        }
        .tech-item {
          background: linear-gradient(135deg, #0f3460, #16213e);
          color: #fff;
          border-radius: 10px;
          padding: 14px 16px;
          text-align: center;
          font-size: .9rem;
          font-weight: 600;
        }

        /* ── Footer ── */
        footer {
          background: #1a1a2e;
          color: #aaa;
          text-align: center;
          padding: 24px;
          font-size: .9rem;
        }
        footer strong { color: #e94560; }
      </style>
    </head>

    <body>

      <!-- ── HEADER ── -->
      <header>
        <h1>⚡ Lab 10 – Full Stack Development</h1>
        <p>Node.js + Express.js Server-Side Rendering</p>
        <span class="badge">BSSE-VI · Air University Islamabad</span>
      </header>

      <!-- ── MAIN ── -->
      <main>

        <!-- Intro Paragraph -->
        <div class="intro">
          <p>
            This lab introduces <strong>Node.js</strong> and <strong>Express.js</strong> for building
            lightweight, fast web servers entirely in JavaScript. We explore routing, dynamic URLs,
            middleware, and HTML rendering — all without a database.
          </p>
        </div>

        <!-- What We Learned -->
        <div class="section">
          <h2>📖 What We Learned</h2>
          <ul>
            <li>Setting up a Node.js project with <code>npm init</code></li>
            <li>Installing and using the <strong>Express</strong> framework</li>
            <li>Defining GET routes for static and dynamic paths</li>
            <li>Using route parameters (<code>:name</code>) for dynamic pages</li>
            <li>Rendering full HTML responses directly from the server</li>
            <li>Working with arrays as an in-memory data source</li>
            <li>Understanding the request–response cycle in HTTP</li>
          </ul>
        </div>

        <!-- Lab Tasks Overview -->
        <div class="section">
          <h2>✅ Lab Tasks Completed</h2>
          <ol>
            <li><strong>Task 1</strong> – Student List Display via <code>GET /students</code></li>
            <li><strong>Task 2</strong> – Message Routes: <code>/home</code>, <code>/about</code>, <code>/contact</code></li>
            <li><strong>Task 3</strong> – Dynamic User Page at <code>/user/:name</code></li>
            <li><strong>Task 4</strong> – This Full HTML Page Renderer at <code>/</code></li>
          </ol>
        </div>

        <!-- Technologies Used -->
        <div class="section">
          <h2>🛠️ Technologies Used</h2>
          <div class="tech-grid">
            <div class="tech-item">Node.js</div>
            <div class="tech-item">Express.js</div>
            <div class="tech-item">JavaScript ES6</div>
            <div class="tech-item">HTML5</div>
            <div class="tech-item">CSS3</div>
            <div class="tech-item">npm</div>
          </div>
        </div>

        <!-- Key Concepts -->
        <div class="section">
          <h2>💡 Key Concepts</h2>
          <ul>
            <li><strong>Routing:</strong> Map HTTP methods + URL paths to handler functions</li>
            <li><strong>Route Parameters:</strong> <code>:name</code> captures dynamic URL segments</li>
            <li><strong>Middleware:</strong> <code>app.use()</code> runs before route handlers</li>
            <li><strong>res.send():</strong> Sends HTML string to the client browser</li>
            <li><strong>app.listen():</strong> Starts the server on a specified port</li>
          </ul>
        </div>

      </main>

      <!-- ── FOOTER ── -->
      <footer>
        <p>Lab 10 · Full Stack Programming · Instructor: <strong>Mr. Sharif Hussain</strong></p>
        <p style="margin-top:6px;">Air University, Islamabad · BSSE-VI</p>
      </footer>

    </body>
    </html>
  `);
});

app.listen(3000, () => {
  console.log('✅ Task 4 running → http://localhost:3000/');
});
