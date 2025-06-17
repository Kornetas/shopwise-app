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
    addToCart(state, action) {
      // Add item to the cart
      state.items.push(action.payload);
    },
    removeFromCart(state, action) {
      // Removes item by id
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    clearCart(state) {
      // Empties the cart
      state.items = [];
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
