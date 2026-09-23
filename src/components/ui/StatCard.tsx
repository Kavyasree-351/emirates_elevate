import React, { useState } from 'react';
import type { LucideIcon } from 'lucide-react';
import { Info, ShieldCheck, Database } from 'lucide-react';
import type { MetricSourceMeta } from '../../types';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: {
    value: string;
    isPositive: boolean;
    label: string;
  };
  accentColor?: 'red' | 'gold' | 'emerald' | 'blue';
  onClick?: () => void;
  sourceMeta?: MetricSourceMeta;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  accentColor = 'red',
  onClick,
  sourceMeta
}) => {
  const [showTooltip, setShowTooltip] = useState(false);

  const accentBorder = {
    red: 'hover:border-emirates-red/50 group-hover:text-emirates-red',
    gold: 'hover:border-emirates-gold/50 group-hover:text-emirates-gold',
    emerald: 'hover:border-emerald-500/50 group-hover:text-emerald-400',
    blue: 'hover:border-sky-500/50 group-hover:text-sky-400',
  }[accentColor];

  const iconBg = {
    red: 'bg-emirates-red/10 text-emirates-red border border-emirates-red/20',
    gold: 'bg-amber-500/10 text-amber-400 border border-amber-500/20',
    emerald: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20',
    blue: 'bg-sky-500/10 text-sky-400 border border-sky-500/20',
  }[accentColor];

  const isPublic = sourceMeta?.sourceType === 'Public Emirates information';

  return (
    <div
      onClick={onClick}
      className={`glass-panel p-5 rounded-xl border border-navy-700/60 transition-all duration-200 relative group flex flex-col justify-between ${
        onClick ? 'cursor-pointer hover:bg-navy-850/80 hover:-translate-y-0.5' : ''
      } ${accentBorder}`}
    >
      <div>
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-1.5 flex-1">
            <p className="text-xs font-medium text-slate-400 tracking-wider uppercase font-mono">{title}</p>
            {sourceMeta && (
              <div className="relative">
                <button
                  type="button"
                  onMouseEnter={() => setShowTooltip(true)}
                  onMouseLeave={() => setShowTooltip(false)}
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowTooltip(!showTooltip);
                  }}
                  className="p-1 rounded text-slate-500 hover:text-slate-300 transition-colors"
                  aria-label="View Source Provenance"
                >
                  <Info className="w-3.5 h-3.5" />
                </button>

                {/* Tooltip */}
                {showTooltip && (
                  <div className="absolute left-0 top-6 z-50 w-64 p-3 bg-navy-950 border border-navy-700 rounded-xl shadow-2xl text-[11px] text-slate-200 pointer-events-none transition-all">
                    <div className="flex items-center gap-1.5 font-bold mb-1">
                      {isPublic ? (
                        <span className="text-emerald-400 flex items-center gap-1 font-mono">
                          <ShieldCheck className="w-3.5 h-3.5" /> Public Emirates Info
                        </span>
                      ) : (
                        <span className="text-amber-400 flex items-center gap-1 font-mono">
                          <Database className="w-3.5 h-3.5" /> Synthetic Demo Data
                        </span>
                      )}
                    </div>
                    <p className="text-slate-300 leading-snug font-sans">
                      {sourceMeta.sourceReference}
                    </p>
                    {sourceMeta.notes && (
                      <p className="mt-1 text-[10px] text-slate-400 italic">
                        {sourceMeta.notes}
                      </p>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>

          <div className={`p-2.5 rounded-lg ${iconBg} transition-transform group-hover:scale-105 shrink-0`}>
            <Icon className="w-5 h-5" />
          </div>
        </div>

        <div className="mt-2 flex items-baseline gap-2">
          <span className="text-2xl lg:text-3xl font-bold font-display text-white tracking-tight">
            {value}
          </span>
          {sourceMeta?.isSimulated && (
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20">
              Demo
            </span>
          )}
        </div>

        {subtitle && (
          <p className="mt-1 text-xs text-slate-400">{subtitle}</p>
        )}
      </div>

      {trend && (
        <div className="mt-4 pt-3 border-t border-navy-800/80 flex items-center justify-between text-xs">
          <span className={`font-medium inline-flex items-center gap-1 ${
            trend.isPositive ? 'text-emerald-400' : 'text-slate-400'
          }`}>
            {trend.value}
          </span>
          <span className="text-slate-400">{trend.label}</span>
        </div>
      )}
    </div>
  );
};
