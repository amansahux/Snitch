import React from 'react';

const StatusBadge = ({ status, isDark = false }) => {
  const getStatusStyles = (status) => {
    const s = status?.toLowerCase();
    
    if (isDark) {
      switch (s) {
        case 'delivered': case 'paid': case 'completed': return 'bg-gold/10 text-gold border-gold/20';
        case 'pending': case 'processing': return 'bg-white/5 text-white/60 border-white/10';
        case 'shipped': return 'bg-blue-400/10 text-blue-400 border-blue-400/20';
        case 'cancelled': case 'failed': return 'bg-rose-400/10 text-rose-400 border-rose-400/20';
        default: return 'bg-white/5 text-white/40 border-white/5';
      }
    }

    switch (s) {
      case 'delivered': case 'paid': case 'completed': return 'bg-gold text-white border-gold';
      case 'pending': case 'processing': return 'bg-amber-50 text-gold border-gold/20';
      case 'shipped': return 'bg-slate-900 text-white border-slate-900';
      case 'cancelled': case 'failed': return 'bg-rose-50 text-rose-700 border-rose-100';
      default: return 'bg-slate-50 text-slate-500 border-slate-200';
    }
  };

  return (
    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border transition-all duration-300 ${getStatusStyles(status)}`}>
      {status}
    </span>
  );
};

export default StatusBadge;
