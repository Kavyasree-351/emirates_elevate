import React, { useState } from 'react';
import { RETROFIT_MILESTONES } from '../../data/milestonesData';
import { Sparkles, CheckCircle2 } from 'lucide-react';

export const MilestoneTimeline: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredMilestones = selectedCategory === 'all'
    ? RETROFIT_MILESTONES
    : RETROFIT_MILESTONES.filter(m => m.category === selectedCategory);

  return (
    <div className="glass-panel p-5 md:p-6 rounded-2xl border border-navy-700/60">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-base font-bold font-display text-white">
              Programme Milestones & Chronology
            </h2>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-emirates-gold/10 text-emirates-gold border border-emirates-gold/30">
              $3B+ Commitment
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Key operational markers in Emirates' widebody modernization lifecycle
          </p>
        </div>

        {/* Filter tags */}
        <div className="flex flex-wrap gap-1 bg-navy-900 p-1 rounded-lg border border-navy-700 text-xs">
          {['all', 'milestone', 'fleet', 'network'].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-2.5 py-1 rounded text-xs capitalize transition-all ${
                selectedCategory === cat
                  ? 'bg-emirates-red text-white font-medium'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {cat === 'all' ? 'All Milestones' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Timeline Stream */}
      <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-gradient-to-b before:from-emirates-red before:via-navy-700 before:to-navy-850">
        {filteredMilestones.map((m) => (
          <div key={m.id} className="relative group">
            {/* Timeline node icon */}
            <div className={`absolute -left-6 mt-1 w-5 h-5 rounded-full flex items-center justify-center border-2 transition-transform group-hover:scale-110 ${
              m.highlight 
                ? 'bg-emirates-red border-white shadow-glow-red/50 shadow-sm' 
                : 'bg-navy-900 border-navy-600 text-slate-400'
            }`}>
              {m.highlight ? (
                <Sparkles className="w-2.5 h-2.5 text-white" />
              ) : (
                <div className="w-1.5 h-1.5 rounded-full bg-slate-400" />
              )}
            </div>

            {/* Content card */}
            <div className={`p-4 rounded-xl border transition-all ${
              m.highlight
                ? 'bg-navy-850/90 border-emirates-red/30 shadow-subtle'
                : 'bg-navy-900/60 border-navy-700/50 hover:border-navy-600'
            }`}>
              <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-semibold text-emirates-gold">
                    {m.date}
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-navy-800 text-slate-300 border border-navy-700">
                    {m.tag}
                  </span>
                </div>

                {m.aircraftCountReached && (
                  <span className="text-[11px] font-mono text-emerald-400 font-medium flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    {m.aircraftCountReached} Modernized Widebodies
                  </span>
                )}
              </div>

              <h3 className="text-sm font-bold text-white font-display">
                {m.title}
              </h3>
              <p className="mt-1 text-xs text-slate-300 leading-relaxed font-sans">
                {m.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
