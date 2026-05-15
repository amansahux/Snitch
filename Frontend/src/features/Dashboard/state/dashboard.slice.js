import { createSlice } from "@reduxjs/toolkit";

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState: {
    sellerOrders: [],
    loading: false,
    error: null,
    stats: null,
    topProducts: [],
    stockIntelligence: [],
    actionLoading: {
      fetchProductById: false,
      fetchVariants: false,
      createProduct: false,
      updateProduct: false,
      deleteProduct: false,
      addVariant: false,
      updateVariant: false,
      deleteVariant: false,
      fetchSellerOrders: false,
      updateOrderStatus: false,
      updatePaymentStatus: false,
      fetchDashboardStats: false,
    },
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
    },
    setActionLoading: (state, action) => {
      const { key, value } = action.payload;
      if (!Object.prototype.hasOwnProperty.call(state.actionLoading, key)) {
        return;
      }
      state.actionLoading[key] = value;
      state.loading = Object.values(state.actionLoading).some(Boolean);
    },
  },
});

export const {
  setLoading,
  setError,
  setStats,
  setSellerOrders,
  setTopProducts,
  setStockIntelligence,
  setActionLoading,
} = dashboardSlice.actions;

export default dashboardSlice.reducer;
