import React from "react";

const STATUS_CONFIG = {
  active: {
    label: "ARCHIVED",
    classes: "bg-emerald-50 text-emerald-600 border-emerald-100",
    dot: "bg-emerald-400",
  },
  inactive: {
    label: "HIDDEN",
    classes: "bg-charcoal/5 text-charcoal/40 border-charcoal/10",
    dot: "bg-charcoal/20",
  },
  out_of_stock: {
    label: "EXHAUSTED",
    classes: "bg-red-50 text-red-600 border-red-100",
    dot: "bg-red-400",
  },
  low_stock: {
    label: "LIMITED",
    classes: "bg-gold/5 text-gold border-gold/10",
    dot: "bg-gold",
  },
};

const StatusBadge = ({ status = "active" }) => {
  const config = STATUS_CONFIG[status] || STATUS_CONFIG.active;

  return (
    <span
      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-[9px] font-black tracking-[0.2em] uppercase border transition-all duration-300 ${config.classes}`}
    >
      <span className={`w-1 h-1 rounded-full ${config.dot} shadow-sm translate-y-[0.5px]`} />
      {config.label}
    </span>
  );
};

export default StatusBadge;
