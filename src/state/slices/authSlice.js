import { createSlice } from "@reduxjs/toolkit";

const user = localStorage.getItem("user");

const initialState = {
  user: user ? JSON.parse(user) : null,
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
        const user = {
          name: "John Doe",
          email: "john@doe@example.com",
        };
        localStorage.setItem("user", JSON.stringify(user));
        state.user = user;
      } else {
        state.error = true;
      }
    },
    logout: (state) => {
      localStorage.removeItem("user");
      state.user = null;
      state.error = false;
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
