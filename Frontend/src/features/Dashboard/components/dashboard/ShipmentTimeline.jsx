import React from 'react';
import { CheckCircle2, Circle } from 'lucide-react';

const ShipmentTimeline = ({ events }) => {
  const defaultEvents = [
    { status: 'Order Placed', date: 'May 10, 2024 - 10:30 AM', completed: true },
    { status: 'Processing', date: 'May 10, 2024 - 02:45 PM', completed: true },
    { status: 'Shipped', date: 'May 11, 2024 - 09:15 AM', completed: true },
    { status: 'Out for Delivery', date: 'In Progress', completed: false },
    { status: 'Delivered', date: 'Pending', completed: false },
  ];

  const timelineEvents = events || defaultEvents;

  return (
    <div className="space-y-6 relative before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-slate-100">
      {timelineEvents.map((event, idx) => (
        <div key={idx} className="relative flex items-start pl-8">
          <div className={`absolute left-0 top-1 p-1 rounded-full z-10 ${
            event.completed ? 'bg-emerald-500' : 'bg-white border-2 border-slate-200'
          }`}>
            {event.completed ? (
              <CheckCircle2 className="w-3 h-3 text-white" />
            ) : (
              <div className="w-2 h-2" />
            )}
          </div>
          <div>
            <p className={`text-sm font-bold ${event.completed ? 'text-slate-900' : 'text-slate-400'}`}>
              {event.status}
            </p>
            <p className="text-xs text-slate-500 mt-0.5">{event.date}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ShipmentTimeline;
