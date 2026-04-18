import React from "react";

const SkeletonRow = () => (
  <tr className="border-b border-zinc-800/50">
    {/* Image */}
    <td className="px-6 py-4">
      <div className="w-12 h-12 rounded-lg bg-zinc-800 animate-pulse" />
    </td>
    {/* Name + subtitle */}
    <td className="px-6 py-4">
      <div className="space-y-2">
        <div className="h-4 w-36 bg-zinc-800 rounded animate-pulse" />
        <div className="h-3 w-24 bg-zinc-800/70 rounded animate-pulse" />
      </div>
    </td>
    {/* Category */}
    <td className="px-6 py-4">
      <div className="h-4 w-20 bg-zinc-800 rounded animate-pulse" />
    </td>
    {/* Price */}
    <td className="px-6 py-4">
      <div className="h-4 w-16 bg-zinc-800 rounded animate-pulse" />
    </td>
    {/* Stock */}
    <td className="px-6 py-4">
      <div className="h-4 w-10 bg-zinc-800 rounded animate-pulse" />
    </td>
    {/* Status */}
    <td className="px-6 py-4">
      <div className="h-6 w-20 bg-zinc-800 rounded-full animate-pulse" />
    </td>
    {/* Date */}
    <td className="px-6 py-4">
      <div className="h-4 w-24 bg-zinc-800 rounded animate-pulse" />
    </td>
    {/* Actions */}
    <td className="px-6 py-4">
      <div className="h-8 w-8 bg-zinc-800 rounded animate-pulse ml-auto" />
    </td>
  </tr>
);

const SkeletonCard = () => (
  <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 space-y-4 animate-pulse">
    <div className="flex items-center gap-4">
      <div className="w-16 h-16 rounded-lg bg-zinc-800 flex-shrink-0" />
      <div className="flex-1 space-y-2">
        <div className="h-4 w-3/4 bg-zinc-800 rounded" />
        <div className="h-3 w-1/2 bg-zinc-800/70 rounded" />
      </div>
    </div>
    <div className="flex items-center justify-between">
      <div className="h-6 w-20 bg-zinc-800 rounded-full" />
      <div className="h-4 w-16 bg-zinc-800 rounded" />
    </div>
  </div>
);

const SkeletonLoader = ({ count = 5, view = "table" }) => {
  if (view === "grid") {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4">
        {Array.from({ length: count }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  // Table view (desktop) - render rows directly
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonRow key={i} />
      ))}
    </>
  );
};

export default SkeletonLoader;
