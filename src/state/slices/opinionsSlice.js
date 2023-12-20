import { createSlice } from "@reduxjs/toolkit";
import { fakeOpinions } from "../providers/fakeOpinionsProvider";

const initialState = fakeOpinions;

export const opinionsSlice = createSlice({
  name: "opinions",
  initialState,
  reducers: {},
});

export default opinionsSlice.reducer;
