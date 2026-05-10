import React from "react";

const Skeleton = () => {
  return (
    <div className="min-h-screen bg-white font-sans animate-pulse">
      <main className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12">
          {Array(8)
            .fill(0)
            .map((_, i) => (
              <div key={i} className="space-y-5">
                <div className="aspect-[3/4] w-full bg-gray-200 rounded-2xl"></div>

                <div className="space-y-3">
                  <div className="h-4 w-4/5 bg-gray-200 rounded"></div>
                  <div className="h-4 w-2/3 bg-gray-100 rounded"></div>
                </div>
              </div>
            ))}
        </div>
      </main>
    </div>
  );
};

export default Skeleton;
