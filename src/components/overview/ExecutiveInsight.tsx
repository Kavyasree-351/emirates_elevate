import React from 'react';
import { Gauge, TrendingUp, Sparkles, Lightbulb, ArrowUpRight } from 'lucide-react';

export const ExecutiveInsight: React.FC = () => {
  const insights = [
    {
      id: 'insight-1',
      title: 'Hangar Learning Curve: 53% Velocity Gain',
      badge: 'Operational Efficiency',
      badgeColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
      icon: Gauge,
      description:
        'Turnaround time per A380 reduced from 45 days on pilot airframe (A6-EVM) to a stable 21-day cadence. The dual-shift parallel teardown approach unlocked 2.1x monthly hangar throughput at DXB Engineering.',
      metric: '45d → 21.2d',
      metricLabel: 'Average Turnaround'
    },
    {
      id: 'insight-2',
      title: 'Yield Maximization via Premium Economy',
      badge: 'Commercial Strategy',
      badgeColor: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
      icon: TrendingUp,
      description:
        'The addition of 56 Premium Economy seats on A380s and 24 on B777s captures high-yield leisure and SME corporate demand without cannibalizing Business Class load factors, delivering higher revenue density per square foot.',
      metric: '3,280+',
      metricLabel: 'PE Seats Added to Date'
    },
    {
      id: 'insight-3',
      title: 'Boeing 777 All-Aisle 1-2-1 Homogeneity',
      badge: 'Product Parity',
      badgeColor: 'text-sky-400 bg-sky-500/10 border-sky-500/20',
      icon: Sparkles,
      description:
        'Eliminating the 2-3-2 middle seat in Boeing 777-300ER Business Class closes the experience variance between the A380 and Boeing fleet, guaranteeing consistent luxury product parity across global long-haul routes.',
      metric: '1-2-1 Config',
      metricLabel: 'Direct Aisle Standard'
    }
  ];

  return (
    <div className="glass-panel p-5 md:p-6 rounded-2xl border border-navy-700/60">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-emirates-red/10 text-emirates-red border border-emirates-red/20">
            <Lightbulb className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-base font-bold font-display text-white">
              Strategic & Technology Insights
            </h2>
            <p className="text-xs text-slate-400">
              Key business drivers identified through retrofit programme data modeling
            </p>
          </div>
        </div>

        <span className="hidden sm:inline-flex px-2.5 py-1 rounded text-xs font-mono bg-navy-900 border border-navy-700 text-slate-300">
          Elevate Portfolio Synthesis
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        {insights.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.id}
              className="p-4 rounded-xl bg-navy-900/80 border border-navy-700/70 hover:border-navy-600 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-medium border ${item.badgeColor}`}>
                    {item.badge}
                  </span>
                  <Icon className="w-4 h-4 text-slate-400 group-hover:text-white transition-colors" />
                </div>

                <h3 className="text-sm font-bold text-white font-display mb-2 group-hover:text-slate-100">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed font-sans">
                  {item.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-navy-800 flex items-baseline justify-between">
                <div>
                  <span className="text-base font-bold font-mono text-white">
                    {item.metric}
                  </span>
                  <span className="block text-[10px] text-slate-400">
                    {item.metricLabel}
                  </span>
                </div>
                <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-emirates-red transition-colors" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
