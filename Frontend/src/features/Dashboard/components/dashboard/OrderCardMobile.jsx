import React from 'react';
import StatusBadge from './StatusBadge';
import { ChevronRight } from 'lucide-react';

const OrderCardMobile = ({ order, onClick, isDark = false }) => {
  return (
    <div 
      onClick={onClick}
      className={`p-5 rounded-3xl border transition-all duration-300 active:scale-[0.98] ${
        isDark 
          ? 'bg-slate-900/40 backdrop-blur-xl border-white/5 shadow-2xl' 
          : 'bg-white border-amber-100 shadow-luxury'
      }`}
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <p className={`text-[10px] font-bold uppercase tracking-[0.2em] mb-1 ${isDark ? 'text-gold' : 'text-slate-400'}`}>{order.id}</p>
          <h4 className={`text-base font-serif ${isDark ? 'text-white' : 'text-slate-900'}`}>{order.customerName}</h4>
        </div>
        <StatusBadge status={order.status} isDark={isDark} />
      </div>
      
      <div className="flex justify-between items-end">
        <div>
          <p className={`text-[10px] uppercase tracking-widest font-bold ${isDark ? 'text-white/40' : 'text-slate-400'}`}>{order.date}</p>
          <p className={`text-lg font-bold tracking-tight mt-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>₹{order.total.toLocaleString()}</p>
        </div>
        <div className={`flex items-center text-[10px] font-bold uppercase tracking-widest ${isDark ? 'text-gold' : 'text-gold'}`}>
          Details <ChevronRight className="w-4 h-4 ml-1" />
        </div>
      </div>
    </div>
  );
};

export default OrderCardMobile;
