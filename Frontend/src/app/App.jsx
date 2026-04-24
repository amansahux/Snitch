import React, { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import { routes } from "./app.routes";
import  useAuth  from "../features/Auth/hooks/useAuth.js";
import useCart from "../features/cart/hooks/useCart.js";

import { Toaster } from "react-hot-toast";

const App = () => {
  const { handleGetProfile , user} = useAuth();
  const { handleGetCart } = useCart();
  useEffect(() => {
    handleGetProfile();
  }, []);
  useEffect(() => {
    if (!user) return;

    handleGetCart().catch(() => {});
  }, [user]);
  // console.log(user)
  return (
    <>
      <Toaster 
        position="bottom-center"
        toastOptions={{
          duration: 5000,
          style: {
            background: "rgba(27, 28, 26, 0.95)", // Deep charcoal glass
            backdropFilter: "blur(10px)",
            color: "#fbf9f6",
            borderRadius: "0.5rem",
            padding: "20px 32px",
            fontSize: "13px",
            fontWeight: "500",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            fontFamily: "Inter, sans-serif",
            border: "1px solid rgba(201, 169, 110, 0.4)", // Signature Gold edge
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
            maxWidth: "500px",
          },
          success: {
            iconTheme: {
              primary: "#C9A96E",
              secondary: "#1b1c1a",
            },
          },
          error: {
            iconTheme: {
              primary: "#ba1a1a",
              secondary: "#fbf9f6",
            },
            style: {
              border: "1px solid rgba(186, 26, 26, 0.3)",
            }
          },
        }}
      />
      <RouterProvider router={routes}></RouterProvider>
    </>
  );
};

export default App;
