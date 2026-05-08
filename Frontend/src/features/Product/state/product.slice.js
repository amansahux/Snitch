import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "product",
  initialState: {
    sellerProducts: [],
    products: [],
    loading: false,
    error: null,
    similarProducts:[],
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
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    setSimilarProducts: (state, action) => {
      state.similarProducts = action.payload;
    }
  },
});

export const { setSellerProducts,setLoading,setError,setProducts , setSimilarProducts } = productSlice.actions;
export default productSlice.reducer;
