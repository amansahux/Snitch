import React, { useEffect, useRef, useState } from "react";
import { MoreVertical, Eye, Pencil, Trash2 } from "lucide-react";

const ActionDropdown = ({ onView, onEdit, onDelete }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  // Close on outside click
  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const actions = [
    {
      label: "View",
      icon: Eye,
      handler: onView,
      className: "text-zinc-300 hover:text-white hover:bg-zinc-700",
    },
    {
      label: "Edit",
      icon: Pencil,
      handler: onEdit,
      className: "text-zinc-300 hover:text-white hover:bg-zinc-700",
    },
    {
      label: "Delete",
      icon: Trash2,
      handler: onDelete,
      className: "text-red-400 hover:text-red-300 hover:bg-red-500/10",
      divider: true,
    },
  ];

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center justify-center w-8 h-8 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-700 transition-all duration-200 cursor-pointer"
        aria-label="Product actions"
      >
        <MoreVertical className="w-4 h-4" />
      </button>

      {open && (
        <div className="absolute right-0 top-10 z-50 w-40 bg-zinc-900 border border-zinc-700 rounded-xl shadow-2xl shadow-black/50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-150">
          {actions.map(({ label, icon: Icon, handler, className, divider }) => (
            <React.Fragment key={label}>
              {divider && <div className="border-t border-zinc-800 my-1" />}
              <button
                onClick={() => {
                  handler?.();
                  setOpen(false);
                }}
                className={`w-full flex items-center gap-2.5 px-3 py-2.5 text-sm font-medium transition-colors duration-150 cursor-pointer ${className}`}
              >
                <Icon className="w-4 h-4 flex-shrink-0" />
                {label}
              </button>
            </React.Fragment>
          ))}
        </div>
      )}
    </div>
  );
};

export default ActionDropdown;
