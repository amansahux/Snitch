import React from 'react';
import { AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';


const LowStockAlert = ({ products }) => {
  const navigate = useNavigate()
  return (
    <div className="bg-white rounded-3xl border border-amber-100 shadow-luxury overflow-hidden">
      <div className="p-5 border-b border-amber-50 flex items-center bg-amber-50/30">
        <AlertCircle className="w-4 h-4 text-gold mr-3" />
        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gold">Stock Intelligence</span>
      </div>
      <div className="divide-y divide-amber-50">
        {products.map((product) => {
          const name = product.title || product.name;
          const id = product._id || product.id;
          return (
            <div key={id} className="p-5 flex items-center justify-between hover:bg-amber-50/50 transition-colors">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-[#FBF9F6] rounded-xl mr-4 flex items-center justify-center border border-amber-50 overflow-hidden">
                  <img src={product.image} alt={name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900 tracking-tight">{name}</p>
                </div>
              </div>
              <div className="text-right">
                <p className={`text-sm font-serif ${product.stock === 0 ? 'text-rose-600' : 'text-amber-600'}`}>{product.stock} units</p>
              </div>
            </div>
          );
        })}
        {products.length === 0 && (
          <div className="p-10 text-center text-xs text-slate-400">
            All inventory levels are optimal.
          </div>
        )}
      </div>
    </div>
  );
};

export default LowStockAlert;
