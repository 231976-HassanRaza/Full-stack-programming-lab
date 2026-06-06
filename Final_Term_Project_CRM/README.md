# CRM System — Full Stack Programming Lab (Final Term Project)

**Air University | Department of Creative Technologies | Spring 2026**
**Student:** Hassan Raza | **Class:** BSSE VI-B | **Instructor:** Mr. Sharif Hussain

---

## 📋 Project Overview

A complete **Customer Relationship Management (CRM) System** built with the **MERN + Next.js** stack.

### ✅ Features Implemented
| Module | Status |
|--------|--------|
| I. Authentication System (JWT) | ✅ Complete |
| II. Customer Management (CRUD) | ✅ Complete |
| III. Search & Filter System | ✅ Complete |
| IV. Next.js Frontend | ✅ Complete |
| V. Invoice Generation + PDF Download | ✅ Complete |
| VI. Notification System (Toast) | ✅ Complete |
| VII. Chatbot (Rule-based) | ✅ Complete |
| VIII. UI / Code Quality | ✅ Complete |

---

## 🗂️ Project Structure

```
Final_Term_Project_CRM/
├── backend/                   # Node.js + Express API
│   ├── controllers/           # Business logic
│   ├── middleware/            # Auth middleware
│   ├── models/               # Mongoose schemas
│   ├── routes/               # Express routes
│   ├── server.js             # Entry point
│   ├── seed.js               # 15 demo customers
│   └── .env.example
├── frontend/                  # Next.js 15 App
│   └── src/
│       ├── app/              # App Router pages
│       ├── components/       # Reusable components
│       ├── context/          # Auth context
│       ├── lib/              # API helpers
│       └── styles/           # Global CSS
└── README.md
```

---

## 🚀 How to Run

### Prerequisites
- Node.js v18+
- MongoDB (local) or MongoDB Atlas URI
- Git

---

### Step 1 — Clone & Setup

```bash
git clone https://github.com/HASSANRAZA111/Full-Stack-Programming-Lab.git
cd Full-Stack-Programming-Lab/Final_Term_Project_CRM
```

---

### Step 2 — Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Create environment file
.env
# Edit .env and set your MONGO_URI if using Atlas

# Seed 15 demo customers (creates admin@crm.com / admin123)
npm run seed

# Start backend server
npm run dev
# Server runs on http://localhost:5000
```

**Default .env values:**
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/crm_db
JWT_SECRET=crm_super_secret_key_2026
```

---

### Step 3 — Frontend Setup

```bash
# Open a NEW terminal
cd frontend

# Install dependencies
npm install

# Start frontend
npm run dev
# Frontend runs on http://localhost:3000
```

---

### Step 4 — Open in Browser

Visit **http://localhost:3000**

**Demo Login Credentials:**
- Email: `admin@crm.com`
- Password: `admin123`

---

## 📦 API Endpoints

### Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/auth/register | Register new user |
| POST | /api/auth/login | Login, get JWT |
| GET | /api/auth/me | Get current user |

### Customers
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/customers | Get all (with ?search=&status=) |
| GET | /api/customers/stats | Dashboard stats |
| GET | /api/customers/:id | Get by ID |
| POST | /api/customers | Create |
| PUT | /api/customers/:id | Update |
| DELETE | /api/customers/:id | Delete |

### Invoices
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/invoices | Get all |
| GET | /api/invoices/:id | Get by ID |
| POST | /api/invoices | Create |
| DELETE | /api/invoices/:id | Delete |

---

## 🤖 Chatbot Commands

The rule-based chatbot (no external AI) supports:
- `help` — Show all commands
- `list customers` — Show customer list
- `add customer` — Navigate to add form
- `invoice` — Open invoice module
- `dashboard` — Go to home
- `stats` — Show system statistics

---

## 🛠️ Tech Stack

**Backend:** Node.js, Express.js, MongoDB, Mongoose, JWT, bcryptjs
**Frontend:** Next.js 15, React 18, Axios, react-hot-toast, jsPDF

---

