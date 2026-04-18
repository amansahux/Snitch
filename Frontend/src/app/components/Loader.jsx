import React from "react";

const Loader = () => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#FBF9F6]">
      {/* Spinner */}
      <div className="relative h-28 w-28 animate-spin">
        <div className="absolute inset-0 rounded-full border-[10px] border-yellow-500/20"></div>

        <div className="absolute inset-0 rounded-full border-[10px] border-transparent border-t-[#C9A96E] border-r-[#C9A96E]"></div>
      </div>

      {/* Text */}
      <h1 className="mt-8 text-4xl font-bold tracking-wide text-[#C9A96E] animate-pulse">
        Loading...
      </h1>
    </div>
  );
};

export default Loader;