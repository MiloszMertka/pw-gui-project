import { configureStore } from "@reduxjs/toolkit";
import opinionsReducer from "./slices/opinionsSlice";
import authReducer from "./slices/authSlice";

export const store = configureStore({
  reducer: {
    opinions: opinionsReducer,
    auth: authReducer,
  },
});
