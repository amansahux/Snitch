import { createSlice } from "@reduxjs/toolkit";

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState: {
    sellerOrders: [],
    loading: false,
    error: null,
    stats: null,
    topProducts: [],
    stockIntelligence: []
  },
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setStats: (state, action) => {
      state.stats = action.payload;
    },
    setSellerOrders: (state, action) => {
      state.sellerOrders = action.payload;
    },
    setTopProducts: (state, action) => {
      state.topProducts = action.payload;
    },
    setStockIntelligence: (state, action) => {
      state.stockIntelligence = action.payload;
    }
  },
});

export const {
  setLoading,
  setError,
  setStats,
  setSellerOrders,
  setTopProducts,
  setStockIntelligence
} = dashboardSlice.actions;

export default dashboardSlice.reducer;
