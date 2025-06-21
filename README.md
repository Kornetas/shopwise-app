# Shopwise – Modern Fullstack E-commerce

Shopwise is a modern, example e-commerce application designed for learning and demonstrating practical fullstack development.
This project was created for portfolio building and honing real-world skills in **React, Next.js, Node.js, Express, MongoDB**, and related tools.

## 🛠️ Tech Stack

**Frontend:**

_(details in a separate repo/README)_
- Javascript
- React 19
- Next.js
- Redux Toolkit (state management)
- CSS Modules (modular styling)
- React Testing Library + Jest (unit tests)
- Cypress (E2E tests)

**Backend:**
_(details in a separate repo/README)_

- Node.js + Express
- MongoDB (Mongoose)
- JWT Auth, Bcrypt
- REST API
- Multer (image uploads)
- CORS, dotenv, etc.

## 🚀 Features

- User registration/login (JWT, session)
- Product listing, product detail view
- Add to cart, cart overview
- Checkout process
- User order history ("My Orders")
- Admin panel: manage products and orders
- Product image uploads (admin)
- Simple roles system (user/admin)
- Modular, readable styling (each view separately)
- Unit tests (Jest + React Testing Library)
- End-to-end tests (Cypress)
- Example multilingual support (i18n, in progress)

---

This project uses a monorepo structure (frontend + backend).
**All commands are run from the root folder** – you do **NOT** need to `cd` into `frontend` or `backend`!

---

## 📦 Scripts in `package.json`

```json
"scripts": {
  "dev": "npm-run-all --parallel dev:frontend dev:backend",
  "dev:frontend": "npm run dev --workspace=frontend",
  "dev:backend": "npm run dev --workspace=backend",
  "seed:test": "npm run seed:test --workspace=backend",
  "e2e": "npm run seed:test && npm run cypress:open --workspace=frontend"
}
```

### What do these scripts do?

**`npm install`**
Installs all dependencies listed in `package.json`.

**Important:** After installing dependencies, you **must** read the instructions in `backend/README.md` before running `npm run dev`.

**`npm run dev`**
Runs both frontend and backend dev servers in parallel (hot reload).
_(Uses `npm-run-all` for parallel execution.)_

**`npm run dev:frontend`**
Runs the frontend dev server only.

**`npm run dev:backend`**
Runs the backend dev server only.

**`npm run seed:test`**
Runs the test database seed script in the backend:

- Clears all products, users, and orders.
- Seeds the DB with demo products and a test admin user.

Use this before E2E tests or when you want to reset the test database.

**`npm run e2e`**
Runs `npm run seed:test` first (to reset and seed the database), then starts Cypress E2E testing UI for the frontend.

_All commands run from the root folder!_

---

## 🚀 E2E Testing Workflow

### Reset and seed the test database:

```bash
npm run seed:test
```

This will clear and re-create all products, users, and orders with demo/test data.

### Start Cypress E2E tests:

```bash
npm run e2e
```

This script first seeds the database as described above.
Then it opens the Cypress test runner (for the frontend).

_No need to manually go into any workspace folder – just run from root._

---

## 👤 Example Admin User for E2E

To make E2E testing and login easy, the database is always seeded with this test admin account:

- **Email:** `d@o2.pl`
- **Password:** `d`

You can use this user to log in and test all admin functionality during E2E tests.

---

## 💡 Notes & Tips

- You can always update the seed script (`/backend/scripts/seedTestDb.js`) to change demo products or test admin data.

- If you want to reset the test data only (without starting Cypress), just run:

```bash
npm run seed:test
```

- If you want to run only one part (frontend/backend) in dev mode:

```bash
npm run dev:frontend
npm run dev:backend
```

- The seed script removes all test products, users, and orders each time for a fresh test state.

---

## 🛠 Author

This project is authored by **Kornetas**.
GitHub: [Kornetas](https://github.com/Kornetas/Kornetas)

License: `MIT`

---

Have fun testing! 🚀
Questions? Open an issue or ping the author.
