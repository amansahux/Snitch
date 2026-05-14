import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/Auth/state/auth.slice.js";
import productReducer from "../features/Product/state/product.slice.js";
import dashboardReducer from "../features/Dashboard/state/dashboard.slice.js";
import cartReducer from "../features/cart/state/cart.slice.js";
import addressReducer from "../features/address/state/address.slice.js";
import orderReducer from "../features/orders/state/order.slice.js";
import wishlistReducer from "../features/wishlist/state/wishlist.slice.js";
import profileReducer from "../features/profile/state/profile.slice.js";

const store = configureStore({
  reducer: {
    auth: authReducer,
    product: productReducer,
    dashboard: dashboardReducer,
    cart: cartReducer,
    address: addressReducer,
    order: orderReducer,
    wishlist: wishlistReducer,
    profile: profileReducer,
  },
});

export default store;
