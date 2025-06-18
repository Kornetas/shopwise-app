import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // Start login/register
    authStart(state) {
      state.loading = true;
      state.error = null;
    },
    // Success login/register
    authSuccess(state, action) {
      state.loading = false;
      state.user = action.payload.user;
      state.token = action.payload.token || null;
      state.error = null;
    },
    // Fail login/register
    authFail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    // Logout
    logout(state) {
      state.user = null;
      state.token = null;
      state.loading = false;
      state.error = null;
    },
  },
});

export const { authStart, authSuccess, authFail, logout } = userSlice.actions;
export default userSlice.reducer;
