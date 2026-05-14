import React from 'react';
import { TrendingUp } from 'lucide-react';

const TopProductCard = ({ product }) => {
  return (
    <div className="bg-white p-6 rounded-3xl border border-amber-100 shadow-luxury flex items-center group hover:border-gold/30 hover:scale-[1.02] transition-all duration-500">
      <div className="w-28 h-28 bg-[#FBF9F6] rounded-2xl overflow-hidden mr-5 border border-amber-50 flex items-center justify-center relative">
      <img src={product.image} alt="" className='w-full h-full object-cover' />
        <div className="absolute inset-0 bg-gradient-to-tr from-gold/5 to-transparent"></div>
      </div>
      <div className="flex-1">
        <h4 className="text-sm font-bold text-slate-900 tracking-tight group-hover:text-gold transition-colors">{product.name}</h4>
        <div className="flex items-center mt-2">
          <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">{product.sales} units</span>
          <span className="mx-3 text-gold/30">•</span>
          <span className="text-sm font-serif text-gold">₹{product.revenue.toLocaleString()}</span>
        </div>
      </div>
      <div className="w-10 h-10 rounded-full border border-amber-100 flex items-center justify-center text-[10px] font-bold text-gold group-hover:bg-slate-900 group-hover:text-white group-hover:border-slate-900 transition-all duration-500 shadow-sm">
        #{product.rank}
      </div>
    </div>
  );
};

export default TopProductCard;
