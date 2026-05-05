# 🛒 ShopKaro — MERN Stack Ecommerce App
### Lab 11 — Full Stack Programming (BSSE-VI)
### Air University, Islamabad

---

## 📦 Tech Stack

| Layer     | Technology                          |
|-----------|-------------------------------------|
| Frontend  | Next.js 15, React 18, Tailwind CSS  |
| Backend   | Node.js, Express.js                 |
| Database  | MongoDB + Mongoose ODM              |

---

## 🗂️ Project Structure

```
ecommerce-app/
├── backend/
│   ├── models/
│   │   ├── Product.js        ← Mongoose Product schema
│   │   └── Order.js          ← Mongoose Order schema
│   ├── routes/
│   │   ├── products.js       ← GET/POST/PUT/DELETE /api/products
│   │   └── orders.js         ← GET/POST /api/orders
│   ├── server.js             ← Express server entry point
│   ├── seed.js               ← Seeds 10 sample products
│   ├── .env                  ← PORT and MONGO_URI
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── app/
    │   │   ├── page.jsx              ← Home page
    │   │   ├── products/page.jsx     ← Products listing with filter
    │   │   ├── products/[id]/page.jsx← Product detail page
    │   │   ├── cart/page.jsx         ← Cart page
    │   │   ├── checkout/page.jsx     ← Checkout + order placement
    │   │   ├── layout.jsx            ← Root layout with Navbar/Footer
    │   │   └── globals.css
    │   ├── components/
    │   │   ├── Navbar.jsx
    │   │   ├── Footer.jsx
    │   │   └── ProductCard.jsx
    │   ├── context/
    │   │   └── CartContext.jsx       ← Global cart state (React Context)
    │   └── lib/
    │       └── api.js                ← API utility functions
    ├── .env.local
    └── package.json
```

---

## ⚙️ Prerequisites

You need these installed before running anything:

### 1. Node.js (you already have this ✅)
```bash
node -v    # should show v18+ or v20+
npm -v     # should show v9+
```

### 2. MongoDB Community Server
Download from: https://www.mongodb.com/try/download/community

- Select: **Windows** → **MSI** → Download & install
- During install, tick ✅ "Install MongoDB as a Service"
- After install, verify:
```bash
mongod --version
```

### 3. MongoDB Compass (GUI — optional but recommended)
Download from: https://www.mongodb.com/try/download/compass
- Open Compass → Connect to: `mongodb://localhost:27017`
- You'll see `ecommerce_db` database appear after seeding

---

## 🚀 How to Run

### Step 1 — Start MongoDB
MongoDB should auto-start as a Windows service after installation.
If not, run in a terminal:
```bash
mongod
```

### Step 2 — Setup & run the Backend
Open a terminal in the `backend/` folder:

```bash
cd ecommerce-app/backend

# Install dependencies
npm install

# Seed the database with 10 sample products
npm run seed

# Start the backend server
npm start
```

You should see:
```
✅ MongoDB Connected to: mongodb://127.0.0.1:27017/ecommerce_db
🚀 Server running on http://localhost:5000
```

### Step 3 — Setup & run the Frontend
Open a **new terminal** in the `frontend/` folder:

```bash
cd ecommerce-app/frontend

# Install dependencies
npm install

# Start the Next.js dev server
npm run dev
```

You should see:
```
▲ Next.js 15.1.0
- Local: http://localhost:3000
```

### Step 4 — Open in Browser
- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:5000

---

## 🔌 API Endpoints

| Method | Endpoint                  | Description              |
|--------|---------------------------|--------------------------|
| GET    | `/api/products`           | Fetch all products       |
| GET    | `/api/products?category=Electronics` | Filter by category |
| GET    | `/api/products?search=phone`         | Search products    |
| GET    | `/api/products/:id`       | Get single product       |
| POST   | `/api/products`           | Create a product         |
| PUT    | `/api/products/:id`       | Update a product         |
| DELETE | `/api/products/:id`       | Delete a product         |
| GET    | `/api/orders`             | Get all orders           |
| POST   | `/api/orders`             | Place a new order        |

---

## 🌟 Features Implemented

- ✅ Product listing with category filtering and search
- ✅ Product detail page with star ratings
- ✅ Add to cart with quantity management
- ✅ Checkout form with order placement
- ✅ Orders saved to MongoDB (stock deducted automatically)
- ✅ Responsive design with Tailwind CSS
- ✅ REST API with Express + Mongoose
- ✅ Database seeder with 10 realistic products

---

## 📸 Screenshots Required for Submission

1. `node server.js` terminal output showing MongoDB Connected
2. `http://localhost:3000` — Home page
3. `http://localhost:3000/products` — Products listing
4. Product detail page
5. Cart page with items
6. Checkout with order placed
7. MongoDB Compass showing `ecommerce_db` → `products` collection

---

## 👨‍💻 Submitted by
- **Student:** Hassan
- **Batch:** BSSE-VI-A/B
- **Lab:** Lab_11_MERN_Stack_Node_MongoDB_Lab
- **Instructor:** Mr. Sharif Hussain
