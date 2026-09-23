import React from 'react';
import { ShieldCheck, Database, FileText } from 'lucide-react';

export const DataMethodologyCard: React.FC = () => {
  return (
    <div className="glass-panel p-5 md:p-6 rounded-2xl border border-navy-700/60 space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-navy-800">
        <div className="flex items-center gap-2">
          <FileText className="w-4 h-4 text-emirates-gold" />
          <h3 className="text-base font-bold font-display text-white">
            Data Architecture & Provenance Model
          </h3>
        </div>
        <span className="text-[11px] font-mono text-slate-400">
          Independent Integrity Framework
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
        {/* Public Column */}
        <div className="p-4 rounded-xl bg-navy-900 border border-emerald-500/25 space-y-2">
          <div className="flex items-center gap-2 text-emerald-400 font-bold font-display">
            <ShieldCheck className="w-4 h-4" />
            <span>Public Emirates Documentation (Factual)</span>
          </div>
          <p className="text-slate-300 leading-relaxed">
            All high-level strategic parameters are sourced from official Emirates public releases, including:
          </p>
          <ul className="space-y-1.5 text-slate-400 font-mono text-[11px]">
            <li className="flex items-center gap-1.5">
              <span className="w-1 h-1 rounded-full bg-emerald-400" />
              191 total widebody retrofit programme scope (110 A380s + 81 B777s).
            </li>
            <li className="flex items-center gap-1.5">
              <span className="w-1 h-1 rounded-full bg-emerald-400" />
              Pilot conversions: A380 (A6-EVM) and Boeing 777-300ER (A6-EQH).
            </li>
            <li className="flex items-center gap-1.5">
              <span className="w-1 h-1 rounded-full bg-emerald-400" />
              Cabin densities: 56 PE seats on A380 / 24 PE seats on B777.
            </li>
            <li className="flex items-center gap-1.5">
              <span className="w-1 h-1 rounded-full bg-emerald-400" />
              New 1-2-1 Business Class layout replacing 2-3-2 on Boeing 777s.
            </li>
          </ul>
        </div>

        {/* Synthetic Column */}
        <div className="p-4 rounded-xl bg-navy-900 border border-amber-500/25 space-y-2">
          <div className="flex items-center gap-2 text-amber-300 font-bold font-display">
            <Database className="w-4 h-4" />
            <span>Synthetic Demonstration Data (Modeled)</span>
          </div>
          <p className="text-slate-300 leading-relaxed">
            To deliver an interactive tail-by-tail exploration without accessing proprietary systems:
          </p>
          <ul className="space-y-1.5 text-slate-400 font-mono text-[11px]">
            <li className="flex items-center gap-1.5">
              <span className="w-1 h-1 rounded-full bg-amber-400" />
              Individual aircraft tail statuses and days in hangar are calibrated demo data.
            </li>
            <li className="flex items-center gap-1.5">
              <span className="w-1 h-1 rounded-full bg-amber-400" />
              Interactive Runway Simulator uses an S-curve throughput algorithm.
            </li>
            <li className="flex items-center gap-1.5">
              <span className="w-1 h-1 rounded-full bg-amber-400" />
              Hangar bay live progress indicators represent operational simulation.
            </li>
            <li className="flex items-center gap-1.5">
              <span className="w-1 h-1 rounded-full bg-amber-400" />
              Every synthetic item is explicitly marked with a <span className="text-amber-300">"Demo"</span> badge.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
