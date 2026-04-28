// ─────────────────────────────────────────────
//  TASK 1 – Student List Display (GET Only)
//  Run:   node task1.js
//  Open:  http://localhost:3000/students
// ─────────────────────────────────────────────

const express = require('express');
const app = express();

// Data stored in an array (no database)
const students = [
  { id: 1, name: 'Hassan Ali',   age: 21, department: 'Software Engineering' },
  { id: 2, name: 'Musab Ejaz',   age: 22, department: 'Software Engineering' },
  { id: 3, name: 'Tayyab Ahmed', age: 21, department: 'Software Engineering' },
  { id: 4, name: 'Sara Khan',    age: 20, department: 'Computer Science'     },
  { id: 5, name: 'Bilal Raza',   age: 23, department: 'Information Technology' },
];

// GET /students – render the list as an HTML page
app.get('/students', (req, res) => {
  const listItems = students
    .map(
      (s) =>
        `<li style="margin:8px 0;">
           <strong>${s.name}</strong> 
           &nbsp;|&nbsp; Age: ${s.age} 
           &nbsp;|&nbsp; Dept: ${s.department}
         </li>`
    )
    .join('');

  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <title>Task 1 – Student List</title>
      <style>
        body { font-family: Arial, sans-serif; max-width: 700px; margin: 60px auto; background: #f5f7fa; color: #333; }
        h1   { color: #2c3e50; border-bottom: 3px solid #3498db; padding-bottom: 10px; }
        ul   { background: #fff; border-radius: 8px; padding: 20px 40px; box-shadow: 0 2px 8px rgba(0,0,0,.1); list-style: disc; }
        li   { font-size: 16px; }
        .badge { display:inline-block; background:#3498db; color:#fff; border-radius:4px; padding:2px 8px; font-size:12px; }
      </style>
    </head>
    <body>
      <h1>📚 Student List</h1>
      <p>Total students: <span class="badge">${students.length}</span></p>
      <ul>
        ${listItems}
      </ul>
    </body>
    </html>
  `);
});

// Root redirect for convenience
app.get('/', (req, res) => res.redirect('/students'));

app.listen(3000, () => {
  console.log('✅ Task 1 running → http://localhost:3000/students');
});
