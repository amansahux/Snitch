import React from "react";

const ProductDetailsSkeleton = () => {

    const handleUser = () => {
    if (user) {
      ("Add Card Feature");
    } else {
      navigate(`/login`);
    }
  };
  return (
    <div className="min-h-screen bg-white font-sans animate-pulse">
      {/* Breadcrumb */}
      <nav className="max-w-7xl mx-auto px-6 py-8 flex items-center gap-3">
        <div className="h-3 w-12 bg-gray-200 rounded"></div>
        <div className="h-3 w-2 bg-gray-200 rounded"></div>
        <div className="h-3 w-10 bg-gray-200 rounded"></div>
        <div className="h-3 w-2 bg-gray-200 rounded"></div>
        <div className="h-3 w-28 bg-gray-300 rounded"></div>
      </nav>

      {/* Main Layout */}
      <main className="max-w-7xl mx-auto px-6 pb-24 grid grid-cols-1 lg:grid-cols-12 gap-16">
        {/* Gallery */}
        <div className="lg:col-span-7 flex flex-col md:flex-row-reverse gap-5">
          {/* Main Image */}
          <div className="flex-1 aspect-[3/4] rounded-[28px] bg-gradient-to-br from-gray-100 via-gray-50 to-gray-100 border border-gray-100 shadow-sm"></div>

          {/* Thumbnails */}
          <div className="flex md:flex-col gap-4 w-full md:w-24 overflow-hidden">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="w-20 md:w-full aspect-[3/4] rounded-2xl bg-gray-100 border border-gray-100"
              ></div>
            ))}
          </div>
        </div>

        {/* Details */}
        <div className="lg:col-span-5 flex flex-col gap-10">
          {/* Heading */}
          <div className="space-y-5">
            <div className="flex justify-between items-center">
              <div className="h-3 w-28 bg-gray-200 rounded"></div>

              <div className="flex gap-3">
                <div className="h-8 w-8 rounded-full bg-gray-100"></div>
                <div className="h-8 w-8 rounded-full bg-gray-100"></div>
              </div>
            </div>

            <div className="h-12 w-4/5 bg-gray-300 rounded-xl"></div>

            <div className="flex items-center gap-5">
              <div className="h-8 w-24 bg-gray-300 rounded"></div>
              <div className="h-5 w-px bg-gray-200"></div>
              <div className="h-5 w-36 bg-gray-200 rounded"></div>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-3">
            <div className="h-4 w-full bg-gray-100 rounded"></div>
            <div className="h-4 w-11/12 bg-gray-100 rounded"></div>
            <div className="h-4 w-10/12 bg-gray-100 rounded"></div>
          </div>

          {/* Size Selection */}
          <div className="space-y-6">
            <div className="flex justify-between">
              <div className="h-3 w-24 bg-gray-200 rounded"></div>
              <div className="h-3 w-20 bg-gray-100 rounded"></div>
            </div>

            <div className="flex flex-wrap gap-3">
              {[1, 2, 3, 4, 5].map((item) => (
                <div
                  key={item}
                  className="w-14 h-14 rounded-xl bg-gray-100 border border-gray-100"
                ></div>
              ))}
            </div>
          </div>

          {/* Buttons */}
          <div className="space-y-4 pt-2">
            <div className="h-16 w-full rounded-2xl bg-black/90"></div>
            <div className="h-16 w-full rounded-2xl bg-gray-100 border border-gray-100"></div>
          </div>

          {/* Benefits */}
          <div className="pt-8 border-t border-gray-100 space-y-5">
            {[1, 2, 3].map((item) => (
              <div key={item} className="flex items-center gap-4">
                <div className="h-8 w-8 rounded-full bg-gray-100"></div>
                <div className="h-3 w-52 bg-gray-100 rounded"></div>
              </div>
            ))}
          </div>

          {/* Seller Box */}
          <div className="rounded-[28px] bg-gradient-to-br from-gray-50 to-gray-100 p-6 space-y-3">
            <div className="h-3 w-24 bg-gray-200 rounded mx-auto"></div>
            <div className="h-4 w-44 bg-gray-300 rounded mx-auto"></div>
            <div className="h-3 w-52 bg-gray-200 rounded mx-auto"></div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-20 border-t border-gray-100 flex flex-col items-center gap-3">
        <div className="h-8 w-40 bg-gray-300 rounded"></div>
        <div className="h-3 w-36 bg-gray-200 rounded"></div>
      </footer>
    </div>
  );
};

export default ProductDetailsSkeleton;