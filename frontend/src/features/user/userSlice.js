import { createSlice } from "@reduxjs/toolkit";

// Initial state for user (before login)
const initialState = {
  user: null,
  token: null,
  loading: false,
  error: null,
};

// User slice: logic for login, register, logout, etc.
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // Start login/register
    authStart(state) {
      state.loading = true;
      state.error = null;
    },
    // Login/register success: save user data and token
    authSuccess(state, action) {
      state.loading = false;
      state.user = action.payload.user; // Save user data
      state.token = action.payload.token || null; // Save token if exists
      state.error = null;
    },
    // Login/register failed: save error
    authFail(state, action) {
      state.loading = false;
      state.error = action.payload; // Save error message
    },
    // Logout user: clear all user data
    logout(state) {
      state.user = null;
      state.token = null;
      state.loading = false;
      state.error = null;
    },
  },
});

// Export actions (functions to update the state)
export const { authStart, authSuccess, authFail, logout } = userSlice.actions;

// Export reducer (for Redux store)
export default userSlice.reducer;
