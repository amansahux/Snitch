import React from 'react';
import { CheckCircle2, Circle } from 'lucide-react';

const ShipmentTimeline = ({ events, currentStatus = 'pending' }) => {
  const statusOrder = ['placed', 'shipped', 'out_for_delivery', 'delivered'];
  
  const getMilestoneStatus = (milestone) => {
    const currentIndex = statusOrder.indexOf(currentStatus.toLowerCase());
    const milestoneIndex = statusOrder.indexOf(milestone.toLowerCase());
    
    if (milestoneIndex === -1) return false;
    return milestoneIndex <= currentIndex;
  };

  const milestones = [
    { 
      id: 'placed', 
      status: 'Order Placed', 
      description: 'The order has been confirmed.',
      completed: getMilestoneStatus('placed') 
    },
    { 
      id: 'shipped', 
      status: 'Shipped', 
      description: 'Parcel is with our courier partner.',
      completed: getMilestoneStatus('shipped') 
    },
    { 
      id: 'out_for_delivery', 
      status: 'Out for Delivery', 
      description: 'Courier is on the way to the destination.',
      completed: getMilestoneStatus('out_for_delivery') 
    },
    { 
      id: 'delivered', 
      status: 'Delivered', 
      description: 'Successfully received by the client.',
      completed: getMilestoneStatus('delivered') 
    },
  ];

  const timelineEvents = milestones;

  return (
    <div className="space-y-10 relative before:absolute before:left-[9px] before:top-2 before:bottom-2 before:w-[1px] before:bg-amber-100">
      {timelineEvents.map((event, idx) => (
        <div key={idx} className="relative flex items-start pl-10 group">
          <div className={`absolute left-0 top-1 w-[19px] h-[19px] rounded-full z-10 flex items-center justify-center transition-all duration-500 ${
            event.completed 
              ? 'bg-gold shadow-[0_0_10px_rgba(201,169,110,0.4)]' 
              : 'bg-white border border-amber-100'
          }`}>
            {event.completed ? (
              <CheckCircle2 className="w-3 h-3 text-white" />
            ) : (
              <div className="w-1.5 h-1.5 rounded-full bg-amber-50" />
            )}
          </div>
          <div className="transform group-hover:translate-x-1 transition-transform duration-300">
            <p className={`text-[10px] font-bold uppercase tracking-[0.2em] ${event.completed ? 'text-slate-900' : 'text-slate-400'}`}>
              {event.status}
            </p>
            <p className={`text-xs mt-1 ${event.completed ? 'text-slate-500 font-medium' : 'text-slate-300'}`}>
              {event.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ShipmentTimeline;
