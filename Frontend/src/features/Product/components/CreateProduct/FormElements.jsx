import React, { useState, useRef, useEffect } from "react";
import { Loader2, ChevronDown, Check } from "lucide-react";

export const FormWrapper = ({ children, onSubmit, className = "" }) => (
  <form onSubmit={onSubmit} className={`space-y-10 ${className}`}>
    {children}
  </form>
);

export const SectionCard = ({ title, description, children, className = "" }) => (
  <div className={`bg-white rounded-2xl p-8 sm:p-10 shadow-luxury border border-charcoal/5 group transition-all duration-500 hover:shadow-[0_30px_60px_rgba(27,28,26,0.08)] ${className}`}>
    <div className="mb-8 pl-1">
      <h2 className="text-2xl font-serif text-charcoal tracking-tight group-hover:text-gold transition-colors duration-500">{title}</h2>
      {description && <p className="text-charcoal-light text-sm mt-2 font-light">{description}</p>}
    </div>
    <div className="space-y-8">
      {children}
    </div>
  </div>
);

export const FormLabel = ({ htmlFor, children, required, className = "" }) => (
  <label 
    htmlFor={htmlFor} 
    className={`block text-[10px] uppercase tracking-[0.2em] font-bold text-charcoal-light mb-3 ml-1 ${className}`}
  >
    {children} {required && <span className="text-gold ml-0.5">*</span>}
  </label>
);

export const ErrorMessage = ({ message }) => {
  if (!message) return null;
  return <p className="text-red-500 text-[10px] italic mt-2 ml-1 animate-in fade-in slide-in-from-top-1">{message}</p>;
};

export const InputField = React.forwardRef(
  ({ id, label, error, required, className = "", ...props }, ref) => {
    return (
      <div className="w-full">
        {label && <FormLabel htmlFor={id} required={required}>{label}</FormLabel>}
        <div className="relative">
          <input
            id={id}
            ref={ref}
            onWheel={(e) => e.target.type === "number" && e.target.blur()}
            className={`w-full bg-cream-dark/30 rounded-xl border transition-all duration-300 px-6 py-4 outline-none text-charcoal placeholder:text-charcoal/20 ${
              error 
              ? "border-red-200 focus:ring-1 focus:ring-red-400" 
              : "border-transparent focus:border-gold focus:bg-white focus:ring-4 focus:ring-gold/5"
            } ${className}`}
            {...props}
          />
        </div>
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
        <div className="relative">
          <textarea
            id={id}
            ref={ref}
            className={`w-full bg-cream-dark/30 rounded-xl border transition-all duration-300 px-6 py-4 outline-none text-charcoal placeholder:text-charcoal/20 resize-none min-h-[160px] ${
              error 
              ? "border-red-200 focus:ring-1 focus:ring-red-400" 
              : "border-transparent focus:border-gold focus:bg-white focus:ring-4 focus:ring-gold/5"
            } ${className}`}
            {...props}
          />
        </div>
        <ErrorMessage message={error} />
      </div>
    );
  }
);
TextAreaField.displayName = "TextAreaField";

// Custom Premium Select Field
export const SelectField = React.forwardRef(
  ({ id, label, options, error, required, value, onChange, className = "", ...props }, ref) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Get selected option label
    const selectedOption = options.find((opt) => opt.value === value);

    // Close on click outside
    useEffect(() => {
      const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
          setIsOpen(false);
        }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSelect = (optionValue) => {
      onChange(optionValue);
      setIsOpen(false);
    };

    return (
      <div className="w-full relative" ref={dropdownRef}>
        {label && <FormLabel htmlFor={id} required={required}>{label}</FormLabel>}
        
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={`w-full flex items-center justify-between bg-cream-dark/30 rounded-xl border transition-all duration-300 px-6 py-4 outline-none text-charcoal text-left ${
            isOpen ? "border-gold bg-white ring-4 ring-gold/5" : "border-transparent"
          } ${error ? "border-red-200" : ""} ${className}`}
        >
          <span className={selectedOption ? "text-charcoal font-medium" : "text-charcoal/20"}>
            {selectedOption ? selectedOption.label : `Select ${label}`}
          </span>
          <ChevronDown className={`w-4 h-4 text-charcoal/30 transition-transform duration-500 ${isOpen ? "rotate-180 text-gold" : ""}`} />
        </button>

        {/* Custom Dropdown Menu */}
        {isOpen && (
          <div className="absolute z-50 w-full mt-2 bg-white border border-charcoal/10 rounded-xl shadow-[0_20px_40px_rgba(27,28,26,0.1)] backdrop-blur-xl animate-in fade-in zoom-in-95 duration-200 py-2">
            <div className="max-h-60 overflow-y-auto no-scrollbar">
              {options.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => handleSelect(option.value)}
                  className={`w-full flex items-center justify-between px-6 py-3.5 text-sm transition-colors duration-200 hover:bg-gold/5 ${
                    value === option.value ? "text-gold bg-gold/5 font-bold" : "text-charcoal-light"
                  }`}
                >
                  <span>{option.label}</span>
                  {value === option.value && <Check className="w-3.5 h-3.5" />}
                </button>
              ))}
            </div>
          </div>
        )}

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
      className={`relative overflow-hidden inline-flex items-center justify-center bg-charcoal text-white font-medium tracking-[0.2em] uppercase text-[10px] px-10 py-4.5 rounded-xl transition-all duration-500 group shadow-luxury ${
        isDisabled 
        ? "opacity-50 cursor-not-allowed" 
        : "hover:bg-gold hover:shadow-[0_20px_40px_rgba(201,169,110,0.3)] hover:-translate-y-1 cursor-pointer"
      } ${className}`}
      {...props}
    >
      <span className="relative z-10 flex items-center gap-3">
        {isLoading ? (
          <Loader2 className="w-3 h-3 animate-spin" />
        ) : (
          null
        )}
        <span className={isLoading ? "opacity-70" : ""}>{children}</span>
      </span>
      <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white/10 opacity-40 group-hover:animate-shine" />
    </button>
  );
};
