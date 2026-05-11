import React from 'react';
import RevenueChart from '../components/dashboard/RevenueChart';
import SalesTrendChart from '../components/dashboard/SalesTrendChart';
import CategoryChart from '../components/dashboard/CategoryChart';
import DashboardSection from '../components/dashboard/DashboardSection';
import AnalyticsOverview from '../components/dashboard/AnalyticsOverview';
import { Calendar } from 'lucide-react';

const Analytics = () => {
  // Hardcoded Data
  const revenueData = [
    { name: 'Mon', revenue: 45000 },
    { name: 'Tue', revenue: 52000 },
    { name: 'Wed', revenue: 48000 },
    { name: 'Thu', revenue: 61000 },
    { name: 'Fri', revenue: 55000 },
    { name: 'Sat', revenue: 72000 },
    { name: 'Sun', revenue: 68000 },
  ];

  const salesTrendData = [
    { name: '01 May', orders: 12 },
    { name: '02 May', orders: 18 },
    { name: '03 May', orders: 15 },
    { name: '04 May', orders: 22 },
    { name: '05 May', orders: 19 },
    { name: '06 May', orders: 28 },
    { name: '07 May', orders: 24 },
  ];

  const categoryData = [
    { name: 'Shirts', value: 400 },
    { name: 'T-Shirts', value: 300 },
    { name: 'Denim', value: 200 },
    { name: 'Jackets', value: 150 },
    { name: 'Accessories', value: 100 },
  ];

  const performanceStats = [
    { title: 'Avg. Order Value', value: '₹2,840', change: '+5.2%', trend: 'up', iconType: 'revenue' },
    { title: 'Repeat Customer Rate', value: '24.8%', change: '+2.1%', trend: 'up', iconType: 'customers' },
    { title: 'Return Rate', value: '4.2%', change: '-0.8%', trend: 'down', iconType: 'conversion' },
    { title: 'Net Profit Margin', value: '18.5%', change: '+1.4%', trend: 'up', iconType: 'revenue' },
  ];

  return (
    <div className="min-h-screen bg-[#0A0E1A] p-4 md:p-12 max-w-[1600px] mx-auto animate-in fade-in slide-in-from-bottom-4 duration-1000">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-gold mb-2">Intelligence</p>
          <h1 className="text-5xl font-serif text-white leading-tight">Fashion <br /> Analytics</h1>
        </div>
        <div className="flex items-center bg-white/5 border border-white/10 rounded-2xl px-6 py-3 shadow-2xl pb-2">
          <Calendar className="w-4 h-4 text-gold mr-3" />
          <span className="text-[10px] font-bold uppercase tracking-widest text-white/60">May 01 — May 07, 2024</span>
        </div>
      </div>

      {/* Main Charts Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-10 mb-10">
        <RevenueChart data={revenueData} isDark={true} />
        <SalesTrendChart data={salesTrendData} isDark={true} />
      </div>

      {/* Performance Stats */}
      <DashboardSection title="Performance Overview" isDark={true}>
        <AnalyticsOverview stats={performanceStats} isDark={true} />
      </DashboardSection>

      {/* Distribution & Product Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mt-10">
        <div className="lg:col-span-1">
          <CategoryChart data={categoryData} isDark={true} />
        </div>
        <div className="lg:col-span-2">
          <div className="bg-slate-900/40 backdrop-blur-xl p-8 rounded-3xl border border-white/5 shadow-2xl h-full relative overflow-hidden">
             {/* Texture */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
            
            <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-gold/80 mb-8">Regional Sales Velocity</h3>
            <div className="space-y-8 relative z-10">
              {[
                { region: 'Maharashtra', sales: '₹42,500', percentage: 35 },
                { region: 'Delhi NCR', sales: '₹31,200', percentage: 25 },
                { region: 'Karnataka', sales: '₹24,800', percentage: 20 },
                { region: 'Tamil Nadu', sales: '₹18,600', percentage: 15 },
                { region: 'Others', sales: '₹6,200', percentage: 5 },
              ].map((item, idx) => (
                <div key={idx}>
                  <div className="flex justify-between text-xs mb-3">
                    <span className="font-bold uppercase tracking-widest text-white/40">{item.region}</span>
                    <span className="font-serif text-lg text-white">{item.sales}</span>
                  </div>
                  <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gold rounded-full shadow-[0_0_10px_rgba(201,169,110,0.5)] transition-all duration-1000" 
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;