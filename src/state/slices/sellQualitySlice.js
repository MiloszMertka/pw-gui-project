import { createSlice } from "@reduxjs/toolkit";
import { fakeSellQuality } from "../providers/fakeSellQualityProvider";

const initialState = fakeSellQuality.firstAccount;

export const sellQualitySlice = createSlice({
  name: "sellQuality",
  initialState,
  reducers: {
    loadQuality: (state, action) => {
      const { account } = action.payload;
      return fakeSellQuality[account];
    },
  },
});

export const { loadQuality } = sellQualitySlice.actions;

export default sellQualitySlice.reducer;
