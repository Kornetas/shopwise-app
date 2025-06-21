# Shopwise Frontend 🛍️

Frontend of the **Shopwise** e-commerce application built using **Next.js, React, Redux Toolkit, CSS Modules, Jest, React Testing Library, and Cypress**.

## 🚀 Main Features

- Responsive and interactive UI with React 19
- State management with Redux Toolkit
- Modular styling with CSS Modules
- Robust routing with Next.js App Router
- Unit testing with Jest and React Testing Library
- End-to-end testing with Cypress

## 🏁 How to Run the Frontend

Clone the repository and navigate to the frontend folder:

```bash
cd frontend
npm install
npm run dev      # starts the dev server (http://localhost:3000)
```

**Note:** Backend must run separately on port `5000`. If you don't have it, clone and follow its README.

---

## 🧪 Unit Tests (Jest + React Testing Library)

```bash
npm test              # run all unit tests
npm run test:watch    # watch mode for tests
```

### Tests include:

- Navbar, AddToCartButton
- Cart View
- Login/Register Forms
- Products List

### Testing tools used:

- `@testing-library/react`
- `@testing-library/jest-dom`
- Mocked Redux store (`renderWithStore`)

---

## 🚦 E2E Tests (Cypress)

Cypress is pre-installed and configured.

### Available tests:

- Authentication: Registration, Login
- Cart: Adding items, Checkout
- Admin panel: Products, Orders

### Running Cypress:

```bash
npx cypress open
# or
npx cypress run
```

### Note:

- Recommended to reset and seed the database (`npm run seed:test` in backend) before E2E tests.
- Tests assume fresh admin/user accounts and empty carts.

---

## 💡 Useful Commands

```bash
npm run dev        # Start Next.js on localhost:3000
npm run build      # Build for production
npm start          # Run the built version
npm test           # Run unit tests
npx cypress open   # Run E2E tests (GUI)
```

Happy coding! 🚀✨
