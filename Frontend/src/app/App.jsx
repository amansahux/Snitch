import React, { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import { routes } from "./app.routes";
import useAuth from "../features/Auth/hooks/useAuth.js";
import useCart from "../features/cart/hooks/useCart.js";

import useProduct from "../features/Product/hooks/useProduct.js";
import useWishlist from "../features/wishlist/hooks/useWishlist.js";
import { PremiumToaster } from "./toast/toast.system.jsx";

const App = () => {
  const { handleGetProfile, user } = useAuth();
  const { handleGetCart } = useCart();
  const { handleGetAllProducts } = useProduct();
  const { fetchWishlist } = useWishlist();

  useEffect(() => {
    handleGetAllProducts();
    handleGetProfile();
  }, []);

  useEffect(() => {
    if (!user) return;

    handleGetCart().catch(() => {});
    fetchWishlist().catch(() => {});
  }, [user]);

  return (
    <>
      <PremiumToaster />
      <RouterProvider router={routes} />
    </>
  );
};

export default App;
