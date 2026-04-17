import { createBrowserRouter } from "react-router-dom";
import Login from "../features/Auth/pages/Login.jsx";
import Register from "../features/Auth/pages/Register.jsx";
import CreateProduct from "../features/Product/pages/CreateProduct.jsx";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <h1>Home</h1>,
  },
  {
    path:"/login",
    element:<Login/>
  },
  {
    path:"/register",
    element:<Register/>
  },
  {
    path: "/seller/create-product",
    element:<CreateProduct/>
  }
]);

