import { createSlice } from "@reduxjs/toolkit";

// Initial cart status in the store
const initialState = {
  items: [],
};

// Slice the entire module of shopping cart logic in the store
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // Add item to the cart
    addToCart(state, action) {
      const prod = action.payload;
      const found = state.items.find((item) => item.id === prod.id);
      if (found) {
        found.quantity += 1;
      } else {
        state.items.push({ ...prod, quantity: 1 });
      }
    },
    // Removes item by id
    removeFromCart(state, action) {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    incrementQty(state, action) {
      const item = state.items.find((i) => i.id === action.payload);
      if (item) item.quantity += 1;
    },
    decrementQty(state, action) {
      const item = state.items.find((i) => i.id === action.payload);
      if (item && item.quantity > 1) item.quantity -= 1;
    },
    clearCart(state) {
      state.items = [];
    },
  },
});
export const {
  addToCart,
  removeFromCart,
  incrementQty,
  decrementQty,
  clearCart,
} = cartSlice.actions;
export default cartSlice.reducer;
