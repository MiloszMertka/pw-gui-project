import { createSlice } from "@reduxjs/toolkit";

const user = localStorage.getItem("user");

const initialState = {
  user: user ? JSON.parse(user) : null,
  error: false,
  activeAccount: user ? JSON.parse(user).accounts[0] : null,
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
          accounts: [
            { id: 1, internalName: "firstAccount", name: "First Account" },
            { id: 2, internalName: "secondAccount", name: "Second Account" },
          ],
        };
        localStorage.setItem("user", JSON.stringify(user));
        state.user = user;
        state.activeAccount = user.accounts[0];
      } else {
        state.error = true;
      }
    },
    logout: (state) => {
      localStorage.removeItem("user");
      state.user = null;
      state.activeAccount = null;
      state.error = false;
    },
    changeActiveAccount: (state, action) => {
      const { account } = action.payload;
      state.activeAccount = account;
    },
  },
});

export const { login, logout, changeActiveAccount } = authSlice.actions;

export default authSlice.reducer;
