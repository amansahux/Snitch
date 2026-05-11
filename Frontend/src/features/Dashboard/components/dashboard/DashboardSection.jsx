import React from 'react';

const DashboardSection = ({ title, action, children, className = "", isDark = false }) => {
  return (
    <section className={`mb-10 ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <h2 className={`text-2xl font-serif tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>{title}</h2>
        {action && (
          <div className="flex items-center">
            {action}
          </div>
        )}
      </div>
      {children}
    </section>
  );
};

export default DashboardSection;
