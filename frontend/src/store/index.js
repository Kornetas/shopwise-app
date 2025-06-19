import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../features/cart/cartSlice";
import userReducer from "../features/user/userSlice";

// Create Redux store with two slices: cart and user
export const store = configureStore({
  reducer: {
    cart: cartReducer, // Handles all cart state and actions
    user: userReducer, // Handles all user state and actions
  },
});
