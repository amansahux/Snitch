import React from "react";

const Skeleton = () => {
  return (
    <>
 

      <div className="grid gap-12 lg:grid-cols-2 animate-pulse">
        {/* Left Card */}
        <div className="space-y-8 bg-white border border-[#e6dfd5] rounded-[3rem] p-10 shadow-[0_18px_40px_rgba(27,28,26,0.02)]">
          
          {/* Profile Section */}
          <div className="flex items-center gap-6 pb-8 border-b border-[#f3eee8]">
            <div className="w-24 h-24 rounded-full bg-[#f3eee8]" />

            <div className="space-y-3">
              <div className="h-3 w-24 rounded-full bg-[#f3eee8]" />
              <div className="h-6 w-32 rounded-full bg-[#f3eee8]" />
            </div>
          </div>

          {/* User Details */}
          <div className="space-y-6">
            {[1, 2, 3].map((item) => (
              <div key={item} className="space-y-2">
                <div className="h-3 w-24 rounded-full bg-[#f3eee8]" />
                <div className="h-5 w-52 rounded-full bg-[#ece5dc]" />
              </div>
            ))}
          </div>

          {/* Button */}
          <div className="h-14 w-full rounded-full bg-[#f3eee8]" />
        </div>

        {/* Right Side */}
        <div className="space-y-6">
          
          {/* Security Card */}
          <div className="rounded-[3rem] p-10 space-y-4 bg-[#f3eee8]/50">
            <div className="h-8 w-40 rounded-full bg-[#e7ddd1]" />
            <div className="space-y-2">
              <div className="h-4 w-full rounded-full bg-[#e7ddd1]" />
              <div className="h-4 w-3/4 rounded-full bg-[#e7ddd1]" />
            </div>
            <div className="h-4 w-40 rounded-full bg-[#d9cbb9]" />
          </div>

          {/* Preferences Card */}
          <div className="rounded-[3rem] p-10 space-y-4 bg-[#1b1c1a]">
            <div className="h-8 w-44 rounded-full bg-[#2f312e]" />

            <div className="space-y-2">
              <div className="h-4 w-full rounded-full bg-[#2f312e]" />
              <div className="h-4 w-3/4 rounded-full bg-[#2f312e]" />
            </div>

            <div className="h-4 w-48 rounded-full bg-[#4a4338]" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Skeleton;