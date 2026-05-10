import React from "react";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

const FloatingActionButton = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate("/seller/create-product")}
      className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-yellow-500 hover:bg-yellow-400 text-black flex items-center justify-center shadow-[0_0_25px_rgba(234,179,8,0.5)] hover:shadow-[0_0_35px_rgba(234,179,8,0.7)] transition-all duration-300 hover:scale-110 active:scale-95 lg:hidden cursor-pointer"
      aria-label="Add Product"
    >
      <Plus className="w-6 h-6" strokeWidth={2.5} />
    </button>
  );
};

export default FloatingActionButton;
