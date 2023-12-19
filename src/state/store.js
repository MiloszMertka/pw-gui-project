import { configureStore } from "@reduxjs/toolkit";
import opinionsReducer from "./slices/opinionsSlice";

export const store = configureStore({
  reducer: {
    opinions: opinionsReducer,
  },
});
