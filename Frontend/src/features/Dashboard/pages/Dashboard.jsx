import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useDashboard from "../hooks/useDashboard";
import Overview from "./Overview";

const Dashboard = () => {
  const navigate = useNavigate();
  const { sellerProducts, handleGetSellerProducts } = useDashboard();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      setIsLoading(true);
      if (!sellerProducts || sellerProducts.length === 0) {
        await handleGetSellerProducts();
      }
      setIsLoading(false);
    };
    fetch();
  }, [handleGetSellerProducts, sellerProducts]);

  return (
    <main className="flex-1 p-4 lg:p-6 xl:p-8 space-y-6 overflow-x-hidden bg-[#FBF9F6]">
      <Overview/>
    </main>
  );
};

export default Dashboard;
