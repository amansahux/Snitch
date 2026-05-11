import React from 'react';
import { Inbox } from 'lucide-react';

const EmptyState = ({ title, description, actionLabel, onAction }) => {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center bg-white rounded-2xl border border-dashed border-slate-200">
      <div className="p-4 bg-slate-50 rounded-full mb-4">
        <Inbox className="w-8 h-8 text-slate-300" />
      </div>
      <h3 className="text-lg font-bold text-slate-900 mb-2">{title}</h3>
      <p className="text-sm text-slate-500 max-w-xs mb-6">{description}</p>
      {actionLabel && (
        <button
          onClick={onAction}
          className="px-6 py-2.5 bg-slate-900 text-white rounded-xl text-sm font-bold hover:bg-slate-800 transition-colors"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
};

export default EmptyState;
