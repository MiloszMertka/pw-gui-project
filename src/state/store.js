import { configureStore } from "@reduxjs/toolkit";
import opinionsReducer from "./slices/opinionsSlice";
import authReducer from "./slices/authSlice";
import sellStatisticsReducer from "./slices/sellStatisticsSlice";
import sellQualityReducer from "./slices/sellQualitySlice";
import ordersReducer from "./slices/ordersSlice";
import offersRankReducer from "./slices/offersRankSlice";

export const store = configureStore({
  reducer: {
    opinions: opinionsReducer,
    auth: authReducer,
    sellStatistics: sellStatisticsReducer,
    sellQuality: sellQualityReducer,
    orders: ordersReducer,
    offersRank : offersRankReducer,
  },
});
