import React from "react";

const STATUS_CONFIG = {
  active: {
    label: "Active",
    classes: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30",
    dot: "bg-emerald-400",
  },
  inactive: {
    label: "Inactive",
    classes: "bg-zinc-500/10 text-zinc-400 border border-zinc-500/30",
    dot: "bg-zinc-400",
  },
  out_of_stock: {
    label: "Out of Stock",
    classes: "bg-red-500/10 text-red-400 border border-red-500/30",
    dot: "bg-red-400",
  },
  low_stock: {
    label: "Low Stock",
    classes: "bg-yellow-500/10 text-yellow-400 border border-yellow-500/30",
    dot: "bg-yellow-400",
  },
};

const StatusBadge = ({ status = "active" }) => {
  const config = STATUS_CONFIG[status] || STATUS_CONFIG.active;

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold tracking-wide ${config.classes}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${config.dot} animate-pulse`} />
      {config.label}
    </span>
  );
};

export default StatusBadge;
