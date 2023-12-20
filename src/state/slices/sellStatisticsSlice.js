import { createSlice } from "@reduxjs/toolkit";
import { fakeSellStatistics } from "../providers/fakeSellStatisticsProvider";

const initialState = fakeSellStatistics.firstAccount.earnings.today;

export const sellStatisticsSlice = createSlice({
  name: "sellStatistics",
  initialState,
  reducers: {
    loadStatistics: (state, action) => {
      const { account, measure, timespan } = action.payload;
      return fakeSellStatistics[account][measure][timespan];
    },
  },
});

export const { loadStatistics } = sellStatisticsSlice.actions;

export default sellStatisticsSlice.reducer;
