// src/features/auth/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    isAuthenticated: false,
  },
  reducers: {
    login(state, action) {
      // Placeholder for login reducer
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    logout(state) {
      // Placeholder for logout reducer
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;