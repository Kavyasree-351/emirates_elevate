import React from 'react';
import type { RetrofitStatus } from '../../types';

interface StatusBadgeProps {
  status: RetrofitStatus;
  size?: 'sm' | 'md';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, size = 'md' }) => {
  const sizeClasses = size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-2.5 py-1 text-xs font-medium';

  switch (status) {
    case 'completed':
      return (
        <span className={`inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 ${sizeClasses}`}>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
          Retrofitted
        </span>
      );
    case 'in_hangar':
      return (
        <span className={`inline-flex items-center gap-1.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/25 ${sizeClasses}`}>
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping"></span>
          In Hangar
        </span>
      );
    case 'scheduled':
      return (
        <span className={`inline-flex items-center gap-1.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 ${sizeClasses}`}>
          <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
          Scheduled
        </span>
      );
    case 'original':
      return (
        <span className={`inline-flex items-center gap-1.5 rounded-full bg-slate-500/10 text-slate-400 border border-slate-700/50 ${sizeClasses}`}>
          <span className="w-1.5 h-1.5 rounded-full bg-slate-500"></span>
          Original Config
        </span>
      );
    default:
      return null;
  }
};

export const ModelBadge: React.FC<{ model: string }> = ({ model }) => {
  const isA380 = model.includes('A380');
  const isB777 = model.includes('777');
  const isA350 = model.includes('A350');

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded text-xs font-mono font-medium border ${
      isA380 
        ? 'bg-purple-950/40 text-purple-300 border-purple-800/40' 
        : isB777 
        ? 'bg-sky-950/40 text-sky-300 border-sky-800/40'
        : isA350
        ? 'bg-emerald-950/40 text-emerald-300 border-emerald-800/40'
        : 'bg-navy-800 text-slate-300 border-navy-700'
    }`}>
      {model}
    </span>
  );
};
