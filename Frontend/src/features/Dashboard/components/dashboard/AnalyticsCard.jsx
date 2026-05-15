import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

const AnalyticsCard = ({ title, value, change, trend, icon: Icon, isDark = false }) => {
  const isPositive = trend === 'up';

  return (
    <div className={`relative overflow-hidden p-6 rounded-3xl border transition-all duration-500 group hover:scale-[1.02] ${
      isDark 
        ? 'bg-slate-900/40 backdrop-blur-xl border-white/5 shadow-2xl' 
        : 'bg-gradient-to-br from-white to-amber-50/30 border-amber-100/50 shadow-luxury'
    }`}>
      {/* Subtle Texture Overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
      
      <div className="relative z-10 flex items-start justify-between">
        <div>
          <p className={`text-xs font-bold uppercase tracking-[0.2em] mb-2 ${isDark ? 'text-gold/60' : 'text-slate-400'}`}>
            {title}
          </p>
          <h3 className={`text-3xl font-serif leading-none ${isDark ? 'text-white' : 'text-slate-900'}`}>
            {value}
          </h3>
          
          <div className="flex items-center mt-4">
            <span className={`flex items-center text-[10px] font-bold px-2 py-0.5 rounded-full tracking-wider uppercase ${
              isPositive 
                ? (isDark ? 'text-emerald-400 bg-emerald-400/10' : 'text-emerald-700 bg-emerald-50') 
                : (isDark ? 'text-rose-400 bg-rose-400/10' : 'text-rose-700 bg-rose-50')
            }`}>
              {isPositive ? <ArrowUpRight className="w-3 h-3 mr-1" /> : <ArrowDownRight className="w-3 h-3 mr-1" />}
              {change}
            </span>
            <span className={`text-[10px] font-medium ml-2 uppercase tracking-widest ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
              vs period
            </span>
          </div>
        </div>
        
        {Icon && (
          <div className={`p-3 rounded-2xl transition-colors duration-300 ${
            isDark ? 'bg-gold/10 text-gold' : 'bg-amber-50 text-gold'
          }`}>
            <Icon className="w-5 h-5" />
          </div>
        )}
      </div>
    </div>
  );
};

export default AnalyticsCard;
