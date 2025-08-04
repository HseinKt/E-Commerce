# 🥦 Rooted — Full-Stack E-Commerce Platform for Healthy Food

Rooted is a modern full-stack e-commerce platform built with **Node.js + Express + MongoDB** (backend) and **React** (frontend).  
It supports **role-based access**, secure JWT authentication, and admin-only product/category management.

---

## 🚀 Features

- 🔐 Secure login/register with JWT auth
- 🧑‍💼 Admin dashboard (stats, product/category management)
- 🛍 Public product listing + details
- 🧾 REST API (Node.js + MongoDB)
- 🎨 Responsive front-end using React & CSS
- ✅ Role-based permissions: `admin`, `user`

---

## 🛠 Setup Instructions

### Backend Setup

1. `cd backend`
2. `npm install`
3. Create a `.env` file and add:
  PORT=8000
  MONGO_URI=your-mongodb-uri
  JWT_SECRET=your-secret-key  
4. `npm run dev`

### Frontend Setup

1. `cd frontend`
2. `npm install`
3. `npm run dev`

Frontend runs at: http://localhost:5173  
Backend runs at: http://localhost:8000/api

---

## 🔑 Demo Credentials

If authentication is implemented, use these for testing:

Admin:
- Email: `admin@gmail.com`
- Password: `Admin@123`

User:
- Email: `bob@gmail.com`
- Password: `Bob@123`

---

## 🧠 API Overview

### Auth Routes

- `POST api/auth/register` — Register a new user
- `POST api/auth/login` — Login user and receive JWT token
- `GET api/auth/me` — Get current authenticated user

### Product Routes

- `GET api/products` — List all products
- `GET api/products/:id` — Get a single product by ID
- `POST api/products` — Create a new product (admin only)
- `PUT api/products/:id` — Update product (admin only)
- `DELETE api/products/:id` — Delete product (admin only)

### Category Routes

- `GET api/category` — List all categories
- `POST api/category` — Create new category (admin only)
- `PUT api/category/:id` — Update category (admin only)
- `DELETE api/category/:id` — Delete category (admin only)

### Admin Stats

- `GET api/stats` — Dashboard metrics (admin only)

---

## 📌 Assumptions & Tradeoffs

- Authentication uses JWT stored in localStorage
- All protected endpoints use `protect` and `authorize('admin')`
- No shopping cart or checkout implemented
- Axios is used globally with token auto-attached via interceptor

---

## 👤 Author

Developed by **Hussein Kteish**  
GitHub: [https://github.com/yourusername](https://github.com/HseinKt)


