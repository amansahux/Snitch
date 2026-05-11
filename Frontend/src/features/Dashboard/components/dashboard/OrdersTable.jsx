import React from 'react';
import { MoreHorizontal, Eye, Download, Trash2 } from 'lucide-react';
import StatusBadge from './StatusBadge';

const OrdersTable = ({ orders, onViewDetails, isDark = false }) => {
  return (
    <div className={`rounded-3xl border transition-all duration-500 overflow-hidden ${
      isDark 
        ? 'bg-slate-900/40 backdrop-blur-xl border-white/5 shadow-2xl' 
        : 'bg-white border-amber-100 shadow-luxury'
    }`}>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className={`${isDark ? 'bg-white/5 border-white/5' : 'bg-amber-50/50 border-amber-100'} border-b`}>
              <th className={`px-8 py-5 text-[10px] font-bold uppercase tracking-[0.2em] ${isDark ? 'text-white/40' : 'text-slate-400'}`}>Order ID</th>
              <th className={`px-8 py-5 text-[10px] font-bold uppercase tracking-[0.2em] ${isDark ? 'text-white/40' : 'text-slate-400'}`}>Customer</th>
              <th className={`px-8 py-5 text-[10px] font-bold uppercase tracking-[0.2em] ${isDark ? 'text-white/40' : 'text-slate-400'}`}>Date</th>
              <th className={`px-8 py-5 text-[10px] font-bold uppercase tracking-[0.2em] ${isDark ? 'text-white/40' : 'text-slate-400'}`}>Status</th>
              <th className={`px-8 py-5 text-[10px] font-bold uppercase tracking-[0.2em] ${isDark ? 'text-white/40' : 'text-slate-400'}`}>Payment</th>
              <th className={`px-8 py-5 text-[10px] font-bold uppercase tracking-[0.2em] ${isDark ? 'text-white/40' : 'text-slate-400'}`}>Total</th>
              <th className={`px-8 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-right ${isDark ? 'text-white/40' : 'text-slate-400'}`}>Actions</th>
            </tr>
          </thead>
          <tbody className={`divide-y ${isDark ? 'divide-white/5' : 'divide-amber-50'}`}>
            {orders.map((order) => (
              <tr key={order.id} className="group hover:bg-gold/5 transition-colors duration-300">
                <td className="px-8 py-5">
                  <span className={`text-sm font-serif ${isDark ? 'text-gold' : 'text-slate-900'}`}>{order.id}</span>
                </td>
                <td className="px-8 py-5">
                  <div className="flex flex-col">
                    <span className={`text-sm font-bold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>{order.customerName}</span>
                    <span className={`text-[10px] uppercase tracking-widest ${isDark ? 'text-white/40' : 'text-slate-400'}`}>{order.customerEmail}</span>
                  </div>
                </td>
                <td className="px-8 py-5">
                  <span className={`text-xs font-medium tracking-wide ${isDark ? 'text-white/60' : 'text-slate-500'}`}>{order.date}</span>
                </td>
                <td className="px-8 py-5">
                  <StatusBadge status={order.status} isDark={isDark} />
                </td>
                <td className="px-8 py-5">
                  <StatusBadge status={order.paymentStatus || 'Paid'} isDark={isDark} />
                </td>
                <td className="px-8 py-5">
                  <span className={`text-sm font-bold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>₹{order.total.toLocaleString()}</span>
                </td>
                <td className="px-8 py-5 text-right">
                  <div className="flex items-center justify-end space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button 
                      onClick={() => onViewDetails(order)}
                      className={`p-2 rounded-xl transition-all ${isDark ? 'hover:bg-white/10 text-white/40 hover:text-gold' : 'hover:bg-amber-50 text-slate-400 hover:text-gold'}`}
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className={`p-2 rounded-xl transition-all ${isDark ? 'hover:bg-white/10 text-white/40 hover:text-gold' : 'hover:bg-amber-50 text-slate-400 hover:text-gold'}`}>
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrdersTable;
