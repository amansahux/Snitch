import React, { useEffect, useState } from "react";
import useDashboard from "../hooks/useDashboard";
import Overview from "./Overview";

const Dashboard = () => {
  return (
    <main className="flex-1 p-4 lg:p-6 xl:p-8 space-y-6 overflow-x-hidden bg-[#FBF9F6]">
      <Overview />
    </main>
  );
};

export default Dashboard;
