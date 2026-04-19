import React from "react";

const Skeleton = () => {
  return (
    <div className="min-h-screen bg-white font-sans animate-pulse">
      {/* Header Skeleton */}
      {/* <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-sm border-b border-black/[0.03]">
        <div className="max-w-7xl mx-auto px-6 h-28 flex flex-col items-center justify-center gap-3">
          <div className="h-10 w-48 bg-gray-200 rounded-md"></div>
          <div className="h-3 w-36 bg-gray-100 rounded"></div>
        </div>
      </header> */}

      {/* Main Content Skeleton */}
      <main className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12">
          {Array(8)
            .fill(0)
            .map((_, i) => (
              <div key={i} className="space-y-5">
                {/* Product Image */}
                <div className="aspect-[3/4] w-full bg-gray-200 rounded-2xl"></div>

                {/* Product Title */}
                <div className="space-y-3">
                  <div className="h-4 w-4/5 bg-gray-200 rounded"></div>
                  <div className="h-4 w-2/3 bg-gray-100 rounded"></div>
                </div>

                {/* Price */}
                <div className="h-4 w-20 bg-gray-200 rounded"></div>

                {/* Button */}
                <div className="h-11 w-full bg-black/10 rounded-xl"></div>
              </div>
            ))}
        </div>
      </main>

      {/* Footer Skeleton */}
      <footer className="py-20 border-t border-black/[0.03]">
        <div className="flex flex-col items-center justify-center gap-6">
          <div className="flex gap-8">
            <div className="h-3 w-20 bg-gray-200 rounded"></div>
            <div className="h-3 w-16 bg-gray-200 rounded"></div>
            <div className="h-3 w-14 bg-gray-200 rounded"></div>
          </div>

          <div className="h-3 w-40 bg-gray-100 rounded"></div>
        </div>
      </footer>
    </div>
  );
};

export default Skeleton;