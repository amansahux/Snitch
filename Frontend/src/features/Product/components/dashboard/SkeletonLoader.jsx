import React from "react";

const SkeletonRow = () => (
  <tr className="border-b border-charcoal/5">
    {/* Image */}
    <td className="px-8 py-5">
      <div className="w-14 h-14 rounded-2xl bg-cream animate-pulse shadow-sm" />
    </td>
    {/* Name + subtitle */}
    <td className="px-8 py-5">
      <div className="space-y-2">
        <div className="h-4 w-40 bg-cream rounded-lg animate-pulse" />
        <div className="h-3 w-28 bg-cream/60 rounded-lg animate-pulse" />
      </div>
    </td>
    {/* Category */}
    <td className="px-8 py-5">
      <div className="h-6 w-24 bg-cream rounded-lg animate-pulse" />
    </td>
    {/* Price */}
    <td className="px-8 py-5">
      <div className="h-4 w-20 bg-cream rounded animate-pulse" />
    </td>
    {/* Stock */}
    <td className="px-8 py-5">
      <div className="h-4 w-12 bg-cream rounded animate-pulse" />
    </td>
    {/* Status */}
    <td className="px-8 py-5">
      <div className="h-7 w-24 bg-cream rounded-lg animate-pulse" />
    </td>
    {/* Date */}
    <td className="px-8 py-5">
      <div className="h-4 w-28 bg-cream rounded animate-pulse" />
    </td>
    {/* Actions */}
    <td className="px-8 py-5">
      <div className="h-10 w-10 bg-cream rounded-xl animate-pulse ml-auto" />
    </td>
  </tr>
);

const SkeletonCard = () => (
  <div className="bg-white border border-charcoal/5 rounded-[2rem] p-6 space-y-6 shadow-luxury animate-pulse">
    <div className="flex items-center gap-5">
      <div className="w-20 h-20 rounded-2xl bg-cream shadow-sm" />
      <div className="flex-1 space-y-3">
        <div className="h-4 w-3/4 bg-cream rounded-lg" />
        <div className="h-3 w-1/2 bg-cream/70 rounded-lg" />
        <div className="h-3 w-1/4 bg-cream/40 rounded-lg" />
      </div>
    </div>
    <div className="flex items-center justify-between pt-4 border-t border-charcoal/5">
      <div className="h-7 w-24 bg-cream rounded-lg" />
      <div className="h-5 w-20 bg-cream rounded-lg" />
    </div>
  </div>
);

const SkeletonLoader = ({ count = 5, view = "table" }) => {
  if (view === "grid") {
    return (
        <>
            {Array.from({ length: count }).map((_, i) => (
            <SkeletonCard key={i} />
            ))}
        </>
    );
  }

  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonRow key={i} />
      ))}
    </>
  );
};

export default SkeletonLoader;
