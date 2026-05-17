# 🪵 Rustik Plank — MERN Stack eCommerce App
**Lab 12 | Full Stack Programming | BSSE-VI | Air University Islamabad**

A full-stack dynamic eCommerce application built with **Next.js + Node.js + Express.js + MongoDB + Tailwind CSS**, based on the Rustik Plank furniture design template.

---

## 📁 Project Structure

```
rustik-plank/
├── backend/          # Node.js + Express.js + MongoDB API
│   ├── models/       # Mongoose schemas (Product, Category, User, Order, Blog)
│   ├── routes/       # REST API routes
│   ├── middleware/   # JWT auth middleware
│   ├── server.js     # Express server entry point
│   ├── seed.js       # Database seeder
│   └── .env          # Environment variables
└── frontend/         # Next.js 15 + Tailwind CSS
    ├── app/          # App Router pages
    │   ├── page.tsx         # Home
    │   ├── products/        # Products listing & detail
    │   ├── cart/            # Shopping cart
    │   ├── checkout/        # Checkout
    │   ├── orders/          # My orders + order detail
    │   ├── auth/            # Login & register
    │   ├── blog/            # Blog listing & detail
    │   ├── about/           # About us
    │   ├── contact/         # Contact
    │   └── admin/           # Admin panel (dashboard, products, orders, categories)
    ├── components/   # Reusable components
    ├── context/      # AuthContext + CartContext
    └── lib/          # API utility functions
```

---

## 🚀 How to Run (Step by Step)

### Prerequisites
- Node.js v18+ (LTS)
- MongoDB Compass (or MongoDB running locally)
- VS Code

---

### Step 1: Start MongoDB
Open MongoDB Compass and connect to: `mongodb://localhost:27017`
Make sure MongoDB service is running on your system.

---

### Step 2: Setup & Run Backend

```bash
# Open terminal in VS Code
cd backend

# Install dependencies
npm install

# Seed the database (run ONCE to populate sample data)
node seed.js

# Start the backend server
npm run dev
# OR: node server.js
```
Backend runs at: **http://localhost:5000**
Test: http://localhost:5000/api/health

---

### Step 3: Setup & Run Frontend

```bash
# Open a NEW terminal tab
cd frontend

# Install dependencies
npm install

# Start the Next.js dev server
npm run dev
```
Frontend runs at: **http://localhost:3000**

---

## 🔐 Default Admin Credentials
| Field    | Value                    |
|----------|--------------------------|
| Email    | admin@rustikplank.com    |
| Password | admin123                 |

---

## 🌐 Pages & Features

| Page            | URL                          | Description                          |
|-----------------|------------------------------|--------------------------------------|
| Home            | /                            | Hero, categories, hot deals, products|
| Shop            | /products                    | All products with filters & search   |
| Product Detail  | /products/[slug]             | Full detail, images, reviews         |
| Cart            | /cart                        | Shopping cart management             |
| Checkout        | /checkout                    | Shipping + payment + order placement |
| My Orders       | /orders                      | Order history                        |
| Order Detail    | /orders/[id]                 | Order tracking with progress steps   |
| Login           | /auth/login                  | User authentication                  |
| Register        | /auth/register               | New user registration                |
| Blog            | /blog                        | Blog listing                         |
| Blog Post       | /blog/[slug]                 | Full blog article                    |
| About Us        | /about                       | Company info, values, policies       |
| Contact         | /contact                     | Contact form                         |
| Admin Dashboard | /admin                       | Stats + recent orders (admin only)   |
| Admin Products  | /admin/products              | Full CRUD for products               |
| Admin Orders    | /admin/orders                | View + update all orders             |
| Admin Categories| /admin/categories            | Full CRUD for categories             |

---

## 🛠️ Tech Stack

**Backend:** Node.js · Express.js · MongoDB · Mongoose · JWT · bcryptjs
**Frontend:** Next.js 15 · React · TypeScript · Tailwind CSS · Axios
**State:** React Context API (Auth + Cart)
**Design:** Based on Rustik Plank PSD/JPG template — orange accent (#f97316)

---

