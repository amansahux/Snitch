import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "product",
  initialState: {
    sellerProducts: [],
    products: [],
    loading: false,
    error: null,
    similarProducts: [],
    // caches for individual product details and variant lists
    productCache: {}, // { [productId]: productData }
    variantCache: {}, // { [productId]: variantsArray }
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
    },
    // cache reducers
    setProductCache: (state, action) => {
      const { id, data } = action.payload;
      state.productCache[id] = data;
    },
    setVariantCache: (state, action) => {
      const { id, variants } = action.payload;
      state.variantCache[id] = variants;
    },
  },
});

export const {
  setSellerProducts,
  setLoading,
  setError,
  setProducts,
  setSimilarProducts,
  setProductCache,
  setVariantCache,
} = productSlice.actions;
export default productSlice.reducer;
