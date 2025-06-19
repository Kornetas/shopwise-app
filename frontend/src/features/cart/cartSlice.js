import { createSlice } from "@reduxjs/toolkit";

// Initial cart status in the store
const initialState = {
  items: [], // Start with empty cart
};

// Create cart slice - all logic for shopping cart in one place
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // Add item to the cart (if already exists, increase quantity)
    addToCart(state, action) {
      const prod = action.payload;
      // Check if item already in cart
      const found = state.items.find((item) => item.id === prod.id);
      if (found) {
        // If yes, just increase quantity
        found.quantity += 1;
      } else {
        // If not, add as new item with quantity 1
        state.items.push({ ...prod, quantity: 1 });
      }
    },
    // Remove item from cart by id
    removeFromCart(state, action) {
      // Filter out item with this id (remove it)
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    // Increase quantity of item by id
    incrementQty(state, action) {
      const item = state.items.find((i) => i.id === action.payload);
      if (item) item.quantity += 1;
    },
    // Decrease quantity of item by id (not less than 1)
    decrementQty(state, action) {
      const item = state.items.find((i) => i.id === action.payload);
      if (item && item.quantity > 1) item.quantity -= 1;
    },
    // Remove all items from cart
    clearCart(state) {
      state.items = [];
    },
  },
});

// Export all actions for cart
export const {
  addToCart,
  removeFromCart,
  incrementQty,
  decrementQty,
  clearCart,
} = cartSlice.actions;

// Export the reducer for Redux store
export default cartSlice.reducer;
