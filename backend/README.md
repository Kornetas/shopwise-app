# Shopwise Backend – E-commerce REST API

A modern, tested Node.js backend for an e-commerce app with user authentication, product management, reviews and orders.

## 🚀 Features

- User registration, login, profile
- Product CRUD (admin), reviews (users)
- Order creation, user/admin order history
- JWT authentication, roles, cookies (httpOnly)
- 100% test coverage for MVP flows

## 📦 Tech stack

**Backend Framework:**

- Node.js, Express

**Database:**

- MongoDB with Mongoose ODM

**Authentication & Security:**

- JSON Web Tokens (JWT)
- bcrypt (password hashing)
- cookie-parser (secure cookie handling)
- dotenv (environment config)

**Testing:**

- Jest (test runner)
- Supertest (HTTP testing)
- mongodb-memory-server (in-memory DB for isolated tests)

**Structure:**

- Modular MVC-style file structure
- Separated routes/controllers for users, products, orders

## 📖 REST API endpoints

| Method | Endpoint                    | Auth       | Description                       |
| ------ | --------------------------- | ---------- | --------------------------------- |
| POST   | `/api/users/register`       | ❌         | Register a new user               |
| POST   | `/api/users/login`          | ❌         | Log in and receive JWT            |
| GET    | `/api/users/me`             | ✅         | Get own user profile              |
| GET    | `/api/products`             | ❌         | Get list of all products          |
| GET    | `/api/products/:id`         | ❌         | Get details for a single product  |
| POST   | `/api/products`             | ✅ (admin) | Create a new product (admin only) |
| POST   | `/api/products/:id/reviews` | ✅         | Add a review to a product         |
| POST   | `/api/orders`               | ✅         | Place a new order                 |
| GET    | `/api/orders/myorders`      | ✅         | Get orders for logged-in user     |
| GET    | `/api/orders`               | ✅ (admin) | Get all orders (admin only)       |

**Legend:**  
✅ – Authentication required  
❌ – Public endpoint  
(admin) – Requires admin privileges

## 🧪 Tested endpoints (Supertest/Jest)

| Method | Endpoint                  | Auth       | Description        | Tested |
| ------ | ------------------------- | ---------- | ------------------ | ------ |
| POST   | /api/users/register       | ❌         | Register user      | ✅     |
| POST   | /api/users/login          | ❌         | Login              | ✅     |
| GET    | /api/users/me             | ✅         | Get own profile    | ✅     |
| GET    | /api/products             | ❌         | Get all products   | ✅     |
| GET    | /api/products/:id         | ❌         | Get single product | ✅     |
| POST   | /api/products             | ✅ (admin) | Create product     | ✅     |
| POST   | /api/products/:id/reviews | ✅         | Add review         | ✅     |
| POST   | /api/orders               | ✅         | Place order        | ✅     |
| GET    | /api/orders/myorders      | ✅         | User order history | ✅     |
| GET    | /api/orders               | ✅ (admin) | All orders (admin) | ✅     |

## ⚙️ Environment variables

Before running the backend, copy `.env.example` to `.env` and fill in your own secrets.

| Variable   | Example Value                                       | Description                 |
| ---------- | --------------------------------------------------- | --------------------------- |
| PORT       | 5000                                                | Backend port (default 5000) |
| MONGO_URI  | mongodb://localhost:27017/shopwise _(or Atlas URL)_ | MongoDB connection string   |
| JWT_SECRET | your_jwt_secret_key_here                            | Secret key for JWT signing  |

> The `.env` file should **not** be committed to the repository – always use `.env.example` as a template.  
> You can use a **local MongoDB** instance or **MongoDB Atlas cloud** – just update the `MONGO_URI` accordingly.

## 🏗️ Running locally

```bash
npm install
npm run dev                        # Start dev server (nodemon)
npm run seed:test                  # Runs a special script that resets DB, adds admin user & products
npm test                           # Run all Jest/Supertest tests
npx jest tests/user/login.test.js  # Run a single test file:
npm run test:watch                 # Run tests in watch mode:
```
