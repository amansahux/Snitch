import React from 'react';
import { AlertCircle } from 'lucide-react';

const LowStockAlert = ({ products }) => {
  return (
    <div className="bg-white rounded-3xl border border-amber-100 shadow-luxury overflow-hidden">
      <div className="p-5 border-b border-amber-50 flex items-center bg-amber-50/30">
        <AlertCircle className="w-4 h-4 text-gold mr-3" />
        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gold">Stock Intelligence</span>
      </div>
      <div className="divide-y divide-amber-50">
        {products.map((product) => (
          <div key={product.id} className="p-5 flex items-center justify-between hover:bg-amber-50/50 transition-colors">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-[#FBF9F6] rounded-xl mr-4 flex items-center justify-center border border-amber-50">
                <span className="text-[10px] font-bold text-gold uppercase">{product.name.charAt(0)}</span>
              </div>
              <div>
                <p className="text-sm font-bold text-slate-900 tracking-tight">{product.name}</p>
                <p className="text-[10px] uppercase tracking-widest text-slate-400 font-medium">SKU: {product.sku}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-serif text-rose-600">{product.stock} units</p>
              <button className="text-[10px] font-bold text-gold uppercase tracking-widest mt-1 hover:text-slate-900 transition-colors">Restock</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LowStockAlert;
