import React from 'react';
import { ArrowUpRight, CheckCircle2, ShieldCheck, Compass } from 'lucide-react';

interface HeroBannerProps {
  onExploreClick: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({ onExploreClick }) => {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-navy-900 border border-navy-700/70 p-6 md:p-8">
      {/* Subtle Restrained Red Accent line on top */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-emirates-red" />

      <div className="relative z-10 max-w-4xl space-y-4">
        {/* Top Eyebrow Tag */}
        <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-navy-850 border border-navy-700 text-xs font-medium text-slate-300 font-mono">
          <span className="w-1.5 h-1.5 rounded-full bg-emirates-red" />
          <span>Fleet Modernization & Retrofit Analytics</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-2xl sm:text-4xl font-extrabold font-display tracking-tight text-white leading-tight">
          Fleet transformation, visualized.
        </h1>

        {/* Subtitle */}
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans max-w-3xl">
          An independent data prototype inspired by Emirates' publicly documented aircraft retrofit programme.
          Monitoring the nose-to-tail overhaul of <span className="text-white font-semibold font-mono">191 widebody aircraft</span> across A380, Boeing 777, and next-generation 4-class cabin rollouts.
        </p>

        {/* Strategic Quick Pills */}
        <div className="pt-1 flex flex-wrap gap-2 text-xs text-slate-300">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-navy-950 border border-navy-750 font-mono text-[11px]">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>191 Target Aircraft</span>
          </div>
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-navy-950 border border-navy-750 font-mono text-[11px]">
            <span className="w-1.5 h-1.5 rounded-full bg-emirates-gold"></span>
            <span>4-Class Architecture</span>
          </div>
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-navy-950 border border-navy-750 font-mono text-[11px]">
            <span className="w-1.5 h-1.5 rounded-full bg-sky-400"></span>
            <span>4 Dedicated DXB Bays</span>
          </div>
        </div>

        {/* CTA & Disclaimer */}
        <div className="pt-3 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-navy-800">
          <div className="flex items-center gap-3">
            <button
              onClick={onExploreClick}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emirates-red text-white text-xs font-semibold hover:bg-emirates-crimson transition-colors group"
            >
              <Compass className="w-3.5 h-3.5" />
              <span>Explore Tail-by-Tail Database</span>
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </div>

          <div className="flex items-center gap-1.5 text-[11px] text-slate-400 font-sans">
            <ShieldCheck className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span>Prototype using publicly available and simulated data. Not affiliated with Emirates.</span>
          </div>
        </div>
      </div>
    </div>
  );
};
