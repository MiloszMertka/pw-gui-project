import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  error: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      const { email, password } = action.payload;
      state.error = false;

      if (email === "john.doe@example.com" && password === "secret") {
        state.user = {
          name: "John Doe",
          email: "john@doe@example.com",
        };
      } else {
        state.error = true;
      }
    },
    logout: (state) => {
      state.user = null;
      state.error = false;
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
