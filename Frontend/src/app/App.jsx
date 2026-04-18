import React, { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import { routes } from "./app.routes";
import  useAuth  from "../features/Auth/hooks/useAuth.js";

const App = () => {
  const { handleGetProfile , user} = useAuth();
  useEffect(() => {
    handleGetProfile();
  }, []);
  // console.log(user)
  return (
    <>
      <RouterProvider router={routes}></RouterProvider>
    </>
  );
};

export default App;
