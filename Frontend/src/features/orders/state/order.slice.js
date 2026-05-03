import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
  name: "order",
  initialState: {
    orders: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    setOrders: (state, action) => {
      state.orders = action.payload;
    },
    setOrderLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setOrderError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setOrders, setOrderLoading, setOrderError } = orderSlice.actions;

export default orderSlice.reducer;