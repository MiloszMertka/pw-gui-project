import { createSlice } from "@reduxjs/toolkit";
import { fakeOrders } from "../providers/fakeOrdersProvider";

const initialState = fakeOrders.firstAccount;

export const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    loadOrders: (state, action) => {
      const { account } = action.payload;
      return fakeOrders[account];
    },
  },
});

export const { loadOrders } = ordersSlice.actions;

export default ordersSlice.reducer;
