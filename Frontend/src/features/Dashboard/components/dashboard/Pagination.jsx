import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  const getPages = () => {
    const pages = [];
    const delta = 1;
    const left = Math.max(1, currentPage - delta);
    const right = Math.min(totalPages, currentPage + delta);

    if (left > 1) {
      pages.push(1);
      if (left > 2) pages.push("...");
    }

    for (let i = left; i <= right; i++) {
      pages.push(i);
    }

    if (right < totalPages) {
      if (right < totalPages - 1) pages.push("...");
      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <div className="flex items-center justify-between px-8 py-8 border-t border-charcoal/5">
      {/* Info */}
      <div className="hidden sm:flex items-center gap-3">
        <div className="w-1.5 h-1.5 rounded-full bg-gold"></div>
        <p className="text-[10px] font-black uppercase tracking-[0.25em] text-charcoal/30">
            Navigation <span className="text-charcoal-light mx-2">/</span> Sequence {currentPage} of {totalPages}
        </p>
      </div>

      {/* Pages */}
      <div className="flex items-center gap-2">
        {/* Prev */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="flex items-center justify-center w-12 h-12 rounded-xl bg-cream border border-charcoal/5 text-charcoal/40 hover:text-gold hover:border-gold hover:shadow-luxury disabled:opacity-20 disabled:cursor-not-allowed transition-all duration-500 cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {/* Page numbers */}
        <div className="flex items-center gap-1.5 px-1.5 py-1 bg-cream border border-charcoal/5 rounded-2xl">
            {getPages().map((page, idx) =>
            page === "..." ? (
                <span
                key={`dots-${idx}`}
                className="flex items-center justify-center w-8 h-8 text-charcoal/20 text-[10px] font-bold"
                >
                …
                </span>
            ) : (
                <button
                key={page}
                onClick={() => onPageChange(page)}
                className={`flex items-center justify-center w-10 h-10 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all duration-500 cursor-pointer ${
                    page === currentPage
                    ? "bg-white text-gold shadow-luxury border border-charcoal/5 translate-y-[-2px]"
                    : "text-charcoal/30 hover:text-charcoal hover:bg-white/50"
                }`}
                >
                {page}
                </button>
            )
            )}
        </div>

        {/* Next */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="flex items-center justify-center w-12 h-12 rounded-xl bg-cream border border-charcoal/5 text-charcoal/40 hover:text-gold hover:border-gold hover:shadow-luxury disabled:opacity-20 disabled:cursor-not-allowed transition-all duration-500 cursor-pointer"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
