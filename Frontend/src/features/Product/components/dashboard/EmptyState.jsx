import React from "react";
import { PackageSearch, Plus, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

const EmptyState = ({ hasFilters = false, onReset }) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center py-32 px-10 text-center animate-in fade-in duration-1000">
      {/* Icon Section */}
      <div className="relative mb-10">
        <div className="absolute inset-0 bg-gold/5 rounded-full blur-[80px] scale-150" />
        <div className="relative w-28 h-28 rounded-[2.5rem] bg-cream border border-charcoal/5 flex items-center justify-center shadow-luxury">
           <PackageSearch className="w-10 h-10 text-gold stroke-[1.5]" />
           <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-white shadow-luxury flex items-center justify-center border border-charcoal/5">
                <Sparkles className="w-3.5 h-3.5 text-gold animate-pulse" />
           </div>
        </div>
      </div>

      {/* Text Content */}
      <div className="space-y-4 mb-10">
          <div className="inline-flex items-center gap-3">
            <span className="w-6 h-[1px] bg-gold"></span>
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-gold">Status: Idle</span>
          </div>
          <h3 className="text-3xl lg:text-4xl font-serif text-charcoal tracking-tight">
            {hasFilters ? "The Archive is Silent" : "No Fragments Found"}
          </h3>
          <p className="text-charcoal-light font-light text-sm lg:text-base max-w-sm mx-auto leading-relaxed">
            {hasFilters
              ? "Your current parameters did not reveal any matching archive pieces. Try adjusting your search."
              : "Your personal atelier is awaiting its first piece of history. Start your collection now."}
          </p>
      </div>

      {/* Luxury CTA */}
      {hasFilters ? (
        <button
          onClick={onReset}
          className="group inline-flex items-center gap-3 px-8 py-4 border border-charcoal/10 text-charcoal-light rounded-xl text-[10px] font-bold uppercase tracking-[0.2em] hover:text-gold hover:border-gold hover:shadow-luxury transition-all duration-500 cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5 group-hover:rotate-[-180deg] transition-transform duration-700" />
          Reset Parameters
        </button>
      ) : (
        <button
          onClick={() => navigate("/seller/create-product")}
          className="inline-flex items-center gap-3 px-10 py-5 bg-charcoal text-white text-[10px] font-bold uppercase tracking-[0.25em] rounded-2xl hover:bg-gold hover:translate-y-[-2px] hover:shadow-luxury transition-all duration-500 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          Add Your First Piece
        </button>
      )}
    </div>
  );
};

// Helper for the local Rotate icon if needed
const RotateCcw = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>
)

export default EmptyState;
