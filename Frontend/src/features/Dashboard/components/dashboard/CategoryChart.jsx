import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const CategoryChart = ({ data, isDark = false }) => {
  const COLORS = isDark 
    ? ['#C9A96E', '#A88B53', '#876D38', '#664F1D', '#453102']
    : ['#1B1C1A', '#C9A96E', '#7A6E63', '#A88B53', '#F1F5F9'];

  return (
    <div className={`h-[400px] w-full p-8 rounded-3xl border transition-all duration-500 ${
      isDark 
        ? 'bg-slate-900/40 backdrop-blur-xl border-white/5 shadow-2xl' 
        : 'bg-white border-amber-100 shadow-luxury'
    }`}>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className={`text-sm font-bold uppercase tracking-[0.2em] ${isDark ? 'text-gold/80' : 'text-slate-400'}`}>Category Sales</h3>
          <p className={`text-2xl font-serif mt-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>Distribution</p>
        </div>
      </div>
      
      <ResponsiveContainer width="100%" height="60%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={70}
            outerRadius={90}
            paddingAngle={8}
            dataKey="value"
            stroke="none"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip 
             contentStyle={{ 
              backgroundColor: isDark ? '#0f172a' : '#fff', 
              borderRadius: '16px', 
              border: isDark ? '1px solid rgba(255,255,255,0.1)' : '1px solid #f1f5f9',
              boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
              color: isDark ? '#fff' : '#000',
            }}
          />
          <Legend 
            verticalAlign="bottom" 
            height={36} 
            iconType="circle"
            formatter={(value) => <span className={`text-[10px] font-bold uppercase tracking-widest ${isDark ? 'text-white/60' : 'text-slate-500'}`}>{value}</span>}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CategoryChart;
