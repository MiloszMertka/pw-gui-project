import { createSlice } from "@reduxjs/toolkit";
import { fakeOpinions } from "../providers/fakeOpinionsProvider";

const initialState = fakeOpinions.firstAccount;

export const opinionsSlice = createSlice({
  name: "opinions",
  initialState,
  reducers: {
    loadOpinions: (state, action) => {
      const { account } = action.payload;
      return fakeOpinions[account];
    },
  },
});

export const { loadOpinions } = opinionsSlice.actions;

export default opinionsSlice.reducer;
