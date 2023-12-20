import { configureStore } from "@reduxjs/toolkit";
import opinionsReducer from "./slices/opinionsSlice";
import authReducer from "./slices/authSlice";
import sellStatisticsReducer from "./slices/sellStatisticsSlice";

export const store = configureStore({
  reducer: {
    opinions: opinionsReducer,
    auth: authReducer,
    sellStatistics: sellStatisticsReducer,
  },
});
