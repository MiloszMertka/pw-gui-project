import { createSlice } from "@reduxjs/toolkit";
import { fakeSellStatistics } from "../providers/fakeSellStatisticsProvider";

const initialState = fakeSellStatistics.earnings.today;

export const sellStatisticsSlice = createSlice({
  name: "sellStatistics",
  initialState,
  reducers: {
    loadStatistics: (state, action) => {
      const { measure, timespan } = action.payload;
      return fakeSellStatistics[measure][timespan];
    },
  },
});

export const { loadStatistics } = sellStatisticsSlice.actions;

export default sellStatisticsSlice.reducer;
