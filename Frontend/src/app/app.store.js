import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/Auth/state/auth.slice.js" 
import productReducer from "../features/Product/state/product.slice.js" 

const store = configureStore({
  reducer: {
    auth: authReducer,
    product:productReducer
  },
});

export default store