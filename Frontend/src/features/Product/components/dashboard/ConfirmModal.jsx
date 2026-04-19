import React from "react";
import { AlertCircle, Loader2 } from "lucide-react";

const ConfirmModal = ({
  isOpen,
  title = "Confirm Request",
  message = "Are you sure you want to proceed with this action?",
  confirmLabel = "Proceed",
  cancelLabel = "Return",
  isLoading = false,
  onConfirm,
  onCancel,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center px-6"
      role="dialog"
      aria-modal="true"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-charcoal/30 backdrop-blur-xl animate-in fade-in duration-500"
        onClick={onCancel}
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-lg bg-white border border-charcoal/5 rounded-[3rem] shadow-luxury p-10 lg:p-14 animate-in fade-in zoom-in-95 duration-500 overflow-hidden">
        {/* Decorative corner element */}
        <div className="absolute top-0 right-0 w-24 h-24 bg-gold/5 rounded-full -mr-12 -mt-12"></div>
        
        {/* Icon & Heading */}
        <div className="relative z-10 text-center space-y-8">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-[2rem] bg-cream border border-charcoal/5 text-gold shadow-sm mb-2">
                <AlertCircle className="w-8 h-8 stroke-[1.5]" />
            </div>

            <div className="space-y-4">
                <div className="inline-flex items-center gap-3">
                    <span className="w-6 h-[1px] bg-gold"></span>
                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-gold">Archival Action</span>
                </div>
                <h2 className="text-3xl lg:text-4xl font-serif text-charcoal leading-tight">
                    {title}
                </h2>
                <p className="text-charcoal-light font-light text-sm lg:text-base leading-relaxed max-w-sm mx-auto">
                    {message}
                </p>
            </div>
        </div>

        {/* Actions */}
        <div className="relative z-10 flex flex-col sm:flex-row gap-4 mt-12 pt-6">
          <button
            onClick={onCancel}
            disabled={isLoading}
            className="flex-1 px-8 py-5 rounded-2xl bg-cream border border-charcoal/5 text-charcoal-light font-bold text-[10px] uppercase tracking-[0.2em] hover:text-charcoal hover:border-charcoal/20 transition-all duration-300 disabled:opacity-50 cursor-pointer"
          >
            {cancelLabel}
          </button>
          <button
            onClick={onConfirm}
            disabled={isLoading}
            className="flex-1 px-8 py-5 rounded-2xl bg-charcoal text-white font-bold text-[10px] uppercase tracking-[0.2em] hover:bg-gold hover:shadow-luxury transition-all duration-500 disabled:opacity-50 flex items-center justify-center gap-3 cursor-pointer"
          >
            {isLoading ? (
                <>
                    <Loader2 className="w-3 h-3 animate-spin" />
                    <span className="animate-pulse">Processing...</span>
                </>
            ) : (
                confirmLabel
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
