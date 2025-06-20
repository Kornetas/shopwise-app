import React from "react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { render } from "@testing-library/react";
import userReducer from "../features/user/userSlice";
import cartReducer from "../features/cart/cartSlice";

// This function helps to render React components with a Redux store for testing
// You can pass custom initial state or a custom store if needed
export function renderWithStore(
  ui,
  {
    preloadedState, // Optional: initial state for the Redux store
    store = configureStore({
      reducer: { user: userReducer, cart: cartReducer },
      preloadedState,
    }),
    ...renderOptions // Other options for React Testing Library's render
  } = {}
) {
  // Wrapper component that provides the Redux store to children
  function Wrapper({ children }) {
    return <Provider store={store}>{children}</Provider>;
  }
  // Render the component with the Redux provider
  // Return both the store and the result of render (for test usage)
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}
