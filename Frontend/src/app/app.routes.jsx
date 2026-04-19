import { createBrowserRouter } from "react-router-dom";
import Login from "../features/Auth/pages/Login.jsx";
import Register from "../features/Auth/pages/Register.jsx";
import CreateProduct from "../features/Product/pages/CreateProduct.jsx";
import Dashboard from "../features/Product/pages/Dashboard.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import GuestRoute from "./components/GuestRoute.jsx";
import { HomeRedirect } from "./components/HomeRedirect.jsx";
import Home from "../features/Product/pages/Home.jsx";
import SpecificProduct from "../features/Product/components/SpecificProduct.jsx";

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
        element: <h1>AMan</h1>,
      },
      {
        path: "/shop/product/:id",
        element: <SpecificProduct />,
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
    ],
  },
]);
