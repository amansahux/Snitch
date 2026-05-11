import React from 'react';
import AnalyticsCard from './AnalyticsCard';
import { DollarSign, ShoppingBag, Users, TrendingUp } from 'lucide-react';

const AnalyticsOverview = ({ stats, isDark = false }) => {
  const icons = {
    revenue: DollarSign,
    orders: ShoppingBag,
    customers: Users,
    conversion: TrendingUp
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, idx) => (
        <AnalyticsCard
          key={idx}
          title={stat.title}
          value={stat.value}
          change={stat.change}
          trend={stat.trend}
          icon={icons[stat.iconType] || DollarSign}
          description={stat.description}
          isDark={isDark}
        />
      ))}
    </div>
  );
};

export default AnalyticsOverview;
