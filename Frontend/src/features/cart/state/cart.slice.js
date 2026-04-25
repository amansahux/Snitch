import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartId: null,
    userId: null,
    items: [],
    totalSelling: 0,
    totalMrp: 0,
    totalDiscount: 0,
    isLoading: false,
    error: null,
  },
  reducers: {
    setCart: (state, action) => {
      const cart = action.payload || {};
      state.cartId = cart._id || null;
      state.userId = cart.userId || null;
      state.items = Array.isArray(cart.items) ? cart.items : [];
      state.totalSelling = cart.totalSelling || 0;
      state.totalMrp = cart.totalMrp || 0;
      state.totalDiscount = cart.totalDiscount || 0;
      state.error = null;
    },
    addToCart: (state, action) => {
      const cart = action.payload || {};
      if (cart.items) {
        state.cartId = cart._id || state.cartId;
        state.userId = cart.userId || state.userId;
        state.items = cart.items;
        state.totalSelling = cart.totalSelling || 0;
        state.totalMrp = cart.totalMrp || 0;
        state.totalDiscount = cart.totalDiscount || 0;
        return;
      }
      state.items.push(action.payload);
    },
    updateCart: (state, action) => {
      const cart = action.payload || {};
      if (cart.items) {
        state.cartId = cart._id || state.cartId;
        state.userId = cart.userId || state.userId;
        state.items = cart.items;
        state.totalSelling = cart.totalSelling || 0;
        state.totalMrp = cart.totalMrp || 0;
        state.totalDiscount = cart.totalDiscount || 0;
        return;
      }
      state.items = state.items.map((item) =>
        item._id === action.payload._id ? action.payload : item,
      );
    },
    removeFromCart: (state, action) => {
      const cart = action.payload || {};
      if (cart.items) {
        state.cartId = cart._id || state.cartId;
        state.userId = cart.userId || state.userId;
        state.items = cart.items;
        state.totalSelling = cart.totalSelling || 0;
        state.totalMrp = cart.totalMrp || 0;
        state.totalDiscount = cart.totalDiscount || 0;
        return;
      }
      state.items = state.items.filter(
        (item) => item._id !== action.payload._id,
      );
    },
    clearCart: (state) => {
      state.cartId = null;
      state.userId = null;
      state.items = [];
      state.error = null;
    },
    setCartLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setCartError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  setCart,
  addToCart,
  updateCart,
  removeFromCart,
  clearCart,
  setCartLoading,
  setCartError,
} = cartSlice.actions;
export default cartSlice.reducer;
