import { createSlice } from "@reduxjs/toolkit";

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState: {
    sellerProducts: [],
    loading: false,
    error: null,
    stats: {
      totalProducts: 0,
      totalOrders: 0,
      totalRevenue: 0,
    }
  },
  reducers: {
    setSellerProducts: (state, action) => {
      state.sellerProducts = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setStats: (state, action) => {
      state.stats = action.payload;
    }
  },
});

export const {
  setSellerProducts,
  setLoading,
  setError,
  setStats,
} = dashboardSlice.actions;

export default dashboardSlice.reducer;
