import { createSlice } from "@reduxjs/toolkit";
import { fakeOffersRank } from "../providers/fakeOffersRankProvider";

const initialState = fakeOffersRank;

export const offersRankSlice = createSlice({
  name: "offersRank",
  initialState,
  reducers: {
    loadOffersRank: (state, action) => {
      return fakeOffersRank;
    },
  },
});

export const { loadOffersRank } = offersRankSlice.actions;

export default offersRankSlice.reducer;
