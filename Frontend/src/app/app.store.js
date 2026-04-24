import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/Auth/state/auth.slice.js" 
import productReducer from "../features/Product/state/product.slice.js" 
import cartReducer from "../features/cart/state/cart.slice.js";

const store = configureStore({
  reducer: {
    auth: authReducer,
    product: productReducer,
    cart: cartReducer,
  },
});

export default store
