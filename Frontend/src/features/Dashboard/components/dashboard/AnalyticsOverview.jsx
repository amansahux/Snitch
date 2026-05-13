import React from 'react';
import AnalyticsCard from './AnalyticsCard';
import { DollarSign, ShoppingBag, Users, TrendingUp, X, AlertTriangle } from 'lucide-react';

const AnalyticsOverview = ({ stats, isDark = false }) => {
  const icons = {
    revenue: DollarSign,
    orders: ShoppingBag,
    customers: Users,
    conversion: TrendingUp,
    X: X,
    exclamation: AlertTriangle
  };
return(
    <div className="flex flex-wrap justify-center gap-6 mb-8">
      {stats.map((stat, idx) => (
        <div 
          key={idx} 
          className="w-full md:w-[calc(50%-1.5rem)] lg:w-[calc(30%-1.5rem)] min-w-[240px]"
        >
          <AnalyticsCard
            title={stat.title}
            value={stat.value}
            change={stat.change}
            trend={stat.trend}
            icon={icons[stat.iconType] || DollarSign}
            description={stat.description}
            isDark={isDark}
          />
        </div>
      ))}
    </div>
  );
};

export default AnalyticsOverview;
