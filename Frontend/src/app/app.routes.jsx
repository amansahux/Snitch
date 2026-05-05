import { createBrowserRouter, Navigate } from "react-router-dom";
import Login from "../features/Auth/pages/Login.jsx";
import Register from "../features/Auth/pages/Register.jsx";
import CreateProduct from "../features/Product/pages/CreateProduct.jsx";
import Dashboard from "../features/Product/pages/Dashboard.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import GuestRoute from "./components/GuestRoute.jsx";
import { HomeRedirect } from "./components/HomeRedirect.jsx";
import Home from "../features/Product/pages/Home.jsx";
import SpecificProduct from "../features/Product/components/home/SpecificProduct.jsx";
import Shop from "../features/Product/components/home/Shop.jsx";
import Inventory from "../features/Product/pages/Inventory.jsx";
import SellerProductDetail from "../features/Product/pages/SellerProductDetail.jsx";
import NotFound from "../features/Product/pages/NotFound.jsx";
import Cart from "../features/cart/pages/CartPage.jsx";
import OrderSuccess from "../features/orders/pages/OrderSuccess.jsx";

// Profile imports
import ProfileLayout from "../features/profile/pages/ProfileLayout.jsx";
import OrdersSection from "../features/profile/components/OrdersSection.jsx";
import AccountInfo from "../features/profile/components/AccountInfo.jsx";
import AddressSection from "../features/profile/components/AddressSection.jsx";
import WishlistSection from "../features/profile/components/WishlistSection.jsx";
import OrderDetail from "../features/profile/pages/OrderDetail.jsx";

export const routes = createBrowserRouter([
  {
    path: "/",
    children: [
      {
        index: true,
        element: (
          <HomeRedirect>
            <Home />
          </HomeRedirect>
        ),
      },
      {
        path: "/shop",
        element: <Shop />,
      },
      {
        path: "/shop/product/:id",
        element: <SpecificProduct />,
      },
      {
        path: "/cart",
        element: (
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        ),
      },
      {
        path: "/order-success/:orderId",
        element: (
          <ProtectedRoute>
            <OrderSuccess />
          </ProtectedRoute>
        ),
      },
      {
        path: "/profile",
        element: (
          <ProtectedRoute>
            <ProfileLayout />
          </ProtectedRoute>
        ),
        children: [
          {
            index: true,
            element: <Navigate to="orders" replace />,
          },
          {
            path: "orders",
            element: <OrdersSection />,
          },
          // Moved OrderDetail out of here
          {
            path: "account",
            children: [
              {
                index: true,
                element: <Navigate to="profile" replace />,
              },
              {
                path: "profile",
                element: <AccountInfo />,
              },
              {
                path: "address",
                element: <AddressSection />,
              },
            ],
          },
          {
            path: "wishlist",
            element: <WishlistSection />,
          },
        ],
      },
      // STANDALONE Order Detail (No Sidebar)
      {
        path: "/profile/orders/:id",
        element: (
          <ProtectedRoute>
            <OrderDetail />
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: "/login",
    element: (
      <GuestRoute>
        <Login />
      </GuestRoute>
    ),
  },
  {
    path: "/register",
    element: (
      <GuestRoute>
        <Register />
      </GuestRoute>
    ),
  },

  {
    path: "/seller",
    children: [
      {
        path: "dashboard",
        element: (
          <ProtectedRoute role="seller">
            <Dashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: "create-product",
        element: (
          <ProtectedRoute role="seller">
            <CreateProduct />
          </ProtectedRoute>
        ),
      },
      {
        path: "products",
        element: (
          <ProtectedRoute role="seller">
            <Inventory />
          </ProtectedRoute>
        ),
      },
      {
        path: "products/:id",
        element: (
          <ProtectedRoute role="seller">
            <SellerProductDetail />
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
