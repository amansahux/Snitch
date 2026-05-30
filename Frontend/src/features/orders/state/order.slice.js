import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
  name: "order",
  initialState: {
    orders: [],
    isLoading: false,
    isCheckoutLoading: false,
    error: null,
    orderCache: {}, // cache individual orders by id
  },
  reducers: {
    setOrders: (state, action) => {
      state.orders = action.payload;
    },
    setOrderLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setCheckoutLoading: (state, action) => {
      state.isCheckoutLoading = action.payload;
    },
    setOrderError: (state, action) => {
      state.error = action.payload;
    },
    setOrderCache: (state, action) => {
      const { id, data } = action.payload;
      state.orderCache[id] = data;
    },
  },
});

export const { setOrders, setOrderLoading, setCheckoutLoading, setOrderError, setOrderCache } = orderSlice.actions;

export default orderSlice.reducer;