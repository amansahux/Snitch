import React from "react";
import { Loader2 } from "lucide-react";

export const FormWrapper = ({ children, onSubmit, className = "" }) => (
  <form onSubmit={onSubmit} className={`space-y-10 ${className}`}>
    {children}
  </form>
);

export const SectionCard = ({ title, description, children }) => (
  <div className="bg-zinc-900 border border-zinc-800 p-6 shadow-2xl">
    <div className="border-b border-zinc-800 pb-4 mb-6">
      <h2 className="text-xl font-semibold text-zinc-100 tracking-wide uppercase">{title}</h2>
      {description && <p className="text-zinc-500 text-sm mt-1">{description}</p>}
    </div>
    <div className="space-y-6">
      {children}
    </div>
  </div>
);

export const FormLabel = ({ htmlFor, children, required }) => (
  <label htmlFor={htmlFor} className="block text-sm font-medium tracking-wide text-zinc-300 mb-2">
    {children} {required && <span className="text-red-500">*</span>}
  </label>
);

export const ErrorMessage = ({ message }) => {
  if (!message) return null;
  return <p className="text-red-500 text-xs mt-1.5 font-medium tracking-wide">{message}</p>;
};

export const InputField = React.forwardRef(
  ({ id, label, error, required, className = "", ...props }, ref) => {
    return (
      <div className="w-full">
        {label && <FormLabel htmlFor={id} required={required}>{label}</FormLabel>}
        <input
          id={id}
          ref={ref}
          className={`w-full bg-zinc-950 border ${
            error ? "border-red-500 focus:border-red-500 focus:ring-red-500" : "border-zinc-700 focus:border-yellow-500 focus:ring-yellow-500"
          } text-zinc-100 placeholder-zinc-600 px-4 py-3 outline-none focus:ring-1 transition-colors duration-200 ${className}`}
          {...props}
        />
        <ErrorMessage message={error} />
      </div>
    );
  }
);
InputField.displayName = "InputField";

export const TextAreaField = React.forwardRef(
  ({ id, label, error, required, className = "", ...props }, ref) => {
    return (
      <div className="w-full">
        {label && <FormLabel htmlFor={id} required={required}>{label}</FormLabel>}
        <textarea
          id={id}
          ref={ref}
          className={`w-full bg-zinc-950 border ${
            error ? "border-red-500 focus:border-red-500 focus:ring-red-500" : "border-zinc-700 focus:border-yellow-500 focus:ring-yellow-500"
          } text-zinc-100 placeholder-zinc-600 px-4 py-3 outline-none focus:ring-1 transition-colors duration-200 resize-y min-h-[120px] ${className}`}
          {...props}
        />
        <ErrorMessage message={error} />
      </div>
    );
  }
);
TextAreaField.displayName = "TextAreaField";

export const SelectField = React.forwardRef(
  ({ id, label, options, error, required, className = "", ...props }, ref) => {
    return (
      <div className="w-full">
        {label && <FormLabel htmlFor={id} required={required}>{label}</FormLabel>}
        <div className="relative">
          <select
            id={id}
            ref={ref}
            className={`w-full bg-zinc-950 border appearance-none ${
              error ? "border-red-500 focus:border-red-500 focus:ring-red-500" : "border-zinc-700 focus:border-yellow-500 focus:ring-yellow-500"
            } text-zinc-100 px-4 py-3 outline-none focus:ring-1 transition-colors duration-200 cursor-pointer ${className}`}
            {...props}
          >
            <option value="" disabled className="text-zinc-500">Select {label}</option>
            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-zinc-400">
            <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
              <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" fillRule="evenodd"></path>
            </svg>
          </div>
        </div>
        <ErrorMessage message={error} />
      </div>
    );
  }
);
SelectField.displayName = "SelectField";

export const SubmitButton = ({ children, isLoading, disabled, className = "", ...props }) => {
  const isDisabled = isLoading || disabled;
  return (
    <button
      disabled={isDisabled}
      className={`w-full md:w-auto relative inline-flex items-center justify-center bg-black border border-yellow-500 text-yellow-500 font-bold uppercase tracking-widest px-8 py-3.5 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 focus:ring-offset-zinc-900 group ${
        isDisabled ? "opacity-50 cursor-not-allowed" : "hover:bg-yellow-500 hover:text-black cursor-pointer shadow-[0_0_15px_rgba(234,179,8,0.2)] hover:shadow-[0_0_25px_rgba(234,179,8,0.4)]"
      } ${className}`}
      {...props}
    >
      {isLoading ? (
        <span className="flex items-center gap-2">
          <Loader2 className="w-5 h-5 animate-spin" /> Processing...
        </span>
      ) : (
        children
      )}
    </button>
  );
};
