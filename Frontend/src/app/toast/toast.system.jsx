/* eslint-disable react-refresh/only-export-components */
import React from "react";
import toast, { Toaster } from "react-hot-toast";
import { AlertCircle, CheckCircle2, Info, Loader2 } from "lucide-react";

const VARIANTS = {
  success: {
    Icon: CheckCircle2,
    title: "Success",
    accent: "text-[#C9A96E]",
    chip: "bg-[#C9A96E]/10 text-[#C9A96E] border-[#C9A96E]/20",
    border: "border-[#C9A96E]/30",
    glow: "shadow-[0_20px_50px_rgba(201,169,110,0.15)]",
    line: "bg-[#C9A96E]",
  },
  error: {
    Icon: AlertCircle,
    title: "Error",
    accent: "text-rose-400",
    chip: "bg-rose-400/10 text-rose-400 border-rose-400/20",
    border: "border-rose-400/30",
    glow: "shadow-[0_20px_50px_rgba(225,29,72,0.15)]",
    line: "bg-rose-500",
  },
  loading: {
    Icon: Loader2,
    title: "Processing",
    accent: "text-[#C9A96E]",
    chip: "bg-[#C9A96E]/10 text-[#C9A96E] border-[#C9A96E]/20",
    border: "border-[#C9A96E]/20",
    glow: "shadow-[0_20px_50px_rgba(201,169,110,0.1)]",
    line: "bg-[#C9A96E]",
  },
  info: {
    Icon: Info,
    title: "Notice",
    accent: "text-stone-300",
    chip: "bg-stone-300/10 text-stone-300 border-stone-300/20",
    border: "border-stone-300/20",
    glow: "shadow-[0_20px_50px_rgba(255,255,255,0.05)]",
    line: "bg-stone-400",
  },
};

const DURATIONS = {
  success: 3600,
  error: 4600,
  loading: Infinity,
  info: 4000,
};

const resolveMessage = (input, value) => {
  if (typeof input === "function") return input(value);
  return input;
};

const PremiumToast = ({ t, message, type = "info" }) => {
  const variant = VARIANTS[type] || VARIANTS.info;
  const Icon = variant.Icon;
  const isLoading = type === "loading";

  return (
    <div
      className={`pointer-events-auto w-[min(92vw,420px)] transform transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] ${
        t.visible
          ? "translate-y-0 scale-100 opacity-100"
          : "translate-y-4 scale-[0.95] opacity-0"
      }`}
    >
      <div
        className={`relative overflow-hidden rounded-xl border bg-[#111210]/95 px-5 py-4 backdrop-blur-2xl ${variant.border} ${variant.glow}`}
      >
        {/* Luxury Top Line Accent */}
        <div className={`absolute top-0 left-0 h-[2px] w-full opacity-50 ${variant.line}`} />
        
        <div className="flex items-center gap-4">
          <div
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition-transform duration-500 ${variant.chip} ${t.visible ? 'scale-100 rotate-0' : 'scale-0 rotate-180'}`}
          >
            <Icon className={`h-5 w-5 ${variant.accent} ${isLoading ? "animate-spin" : ""}`} strokeWidth={1.5} />
          </div>
          
          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between">
              <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#C9A96E]/80">
                {variant.title}
              </p>
              {t.type !== 'loading' && (
                <button 
                  onClick={() => toast.dismiss(t.id)}
                  className="text-[#C9A96E]/30 hover:text-[#C9A96E] transition-colors"
                >
                  <span className="text-[10px] uppercase tracking-widest font-medium">Close</span>
                </button>
              )}
            </div>
            <p className="mt-1.5 break-words text-[14px] font-medium leading-relaxed text-[#FBF9F6]/90">
              {message}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const show = (type, message, options = {}) =>
  toast.custom((t) => <PremiumToast t={t} type={type} message={message} />, {
    id: options.id,
    duration: options.duration ?? DURATIONS[type] ?? DURATIONS.info,
    position: options.position ?? "bottom-center",
  });

export const notify = {
  success: (message, options) => show("success", message, options),
  error: (message, options) => show("error", message, options),
  info: (message, options) => show("info", message, options),
  loading: (message, options) => show("loading", message, options),
  dismiss: (id) => toast.dismiss(id),
  promise: async (promiseOrFn, messages, options = {}) => {
    const loadingMessage = resolveMessage(messages?.loading, undefined) || "Processing...";
    const toastId = show("loading", loadingMessage, {
      id: options.id,
      position: options.position,
    });

    try {
      const promise =
        typeof promiseOrFn === "function" ? promiseOrFn() : promiseOrFn;
      const result = await promise;
      show("success", resolveMessage(messages?.success, result) || "Done.", {
        id: toastId,
        duration: options.successDuration,
        position: options.position,
      });
      return result;
    } catch (error) {
      show(
        "error",
        resolveMessage(messages?.error, error) || "Something went wrong.",
        {
          id: toastId,
          duration: options.errorDuration,
          position: options.position,
        },
      );
      throw error;
    }
  },
};

export const PremiumToaster = () => (
  <Toaster
    position="bottom-center"
    gutter={16}
    containerStyle={{ bottom: 40 }}
    toastOptions={{
      className: "!bg-transparent !shadow-none !p-0",
    }}
  />
);
