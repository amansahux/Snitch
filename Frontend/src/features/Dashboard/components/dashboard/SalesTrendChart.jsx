import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const SalesTrendChart = ({ data, isDark = false }) => {
  return (
    <div className={`h-[400px] w-full p-8 rounded-3xl border transition-all duration-500 ${
      isDark 
        ? 'bg-slate-900/40 backdrop-blur-xl border-white/5 shadow-2xl' 
        : 'bg-white border-amber-100 shadow-luxury'
    }`}>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className={`text-sm font-bold uppercase tracking-[0.2em] ${isDark ? 'text-gold/80' : 'text-slate-400'}`}>Sales Trend</h3>
          <p className={`text-2xl font-serif mt-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>Market Velocity</p>
        </div>
      </div>
      
      <ResponsiveContainer width="100%" height="70%">
        <BarChart data={data}>
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
          />
          <Tooltip 
            cursor={{ fill: isDark ? 'rgba(255,255,255,0.05)' : '#f8fafc' }}
            contentStyle={{ 
              backgroundColor: isDark ? '#0f172a' : '#fff', 
              borderRadius: '16px', 
              border: isDark ? '1px solid rgba(255,255,255,0.1)' : '1px solid #f1f5f9',
              boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
              color: isDark ? '#fff' : '#000',
            }}
          />
          <Bar 
            dataKey="orders" 
            fill={isDark ? '#C9A96E' : '#C9A96E'} 
            radius={[6, 6, 0, 0]}
            barSize={24}
            animationDuration={1500}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={index === data.length - 1 ? '#C9A96E' : (isDark ? 'rgba(255,255,255,0.1)' : '#f1f5f9')} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SalesTrendChart;
