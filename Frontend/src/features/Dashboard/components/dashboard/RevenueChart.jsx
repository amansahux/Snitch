import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const RevenueChart = ({ data, isDark = false }) => {
  return (
    <div className={`h-[400px] w-full p-8 rounded-3xl border transition-all duration-500 ${
      isDark 
        ? 'bg-slate-900/40 backdrop-blur-xl border-white/5 shadow-2xl' 
        : 'bg-white border-amber-100 shadow-luxury'
    }`}>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className={`text-sm font-bold uppercase tracking-[0.2em] ${isDark ? 'text-gold/80' : 'text-slate-400'}`}>Revenue Forecast</h3>
          <p className={`text-2xl font-serif mt-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>Financial Growth</p>
        </div>
        <select className={`text-[10px] font-bold uppercase tracking-widest border rounded-xl px-4 py-2 outline-none cursor-pointer transition-all ${
          isDark 
            ? 'bg-white/5 border-white/10 text-white hover:bg-white/10' 
            : 'bg-amber-50 border-amber-100 text-gold hover:bg-amber-100'
        }`}>
          <option>Last 7 days</option>
          <option>Last 30 days</option>
          <option>Last 12 months</option>
        </select>
      </div>
      
      <ResponsiveContainer width="100%" height="70%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={isDark ? '#C9A96E' : '#C9A96E'} stopOpacity={isDark ? 0.3 : 0.2}/>
              <stop offset="95%" stopColor={isDark ? '#C9A96E' : '#C9A96E'} stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDark ? 'rgba(255,255,255,0.03)' : '#f1f5f9'} />
          <XAxis 
            dataKey="name" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: isDark ? 'rgba(255,255,255,0.3)' : '#94a3b8', fontSize: 10, fontWeight: 700 }}
            dy={15}
          />
          <YAxis 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: isDark ? 'rgba(255,255,255,0.3)' : '#94a3b8', fontSize: 10, fontWeight: 700 }}
            tickFormatter={(value) => `₹${value / 1000}k`}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: isDark ? '#0f172a' : '#fff', 
              borderRadius: '16px', 
              border: isDark ? '1px solid rgba(255,255,255,0.1)' : '1px solid #f1f5f9',
              boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
              color: isDark ? '#fff' : '#000',
              fontFamily: 'Inter, sans-serif'
            }}
            itemStyle={{ fontSize: '12px', fontWeight: 700 }}
          />
          <Area 
            type="monotone" 
            dataKey="revenue" 
            stroke={isDark ? '#C9A96E' : '#C9A96E'} 
            strokeWidth={4}
            fillOpacity={1} 
            fill="url(#colorRevenue)" 
            animationDuration={2000}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RevenueChart;
