import React, { useState } from 'react';
import { CABIN_SPECS } from '../../data/cabinSpecs';
import { ROUTE_DEPLOYMENTS } from '../../data/analyticsData';
import { 
  Layers, 
  Sparkles, 
  MapPin, 
  Check, 
  Tv, 
  Maximize2, 
  Plane
} from 'lucide-react';

export const ProductCabinView: React.FC = () => {
  const [selectedClass, setSelectedClass] = useState<string>('W'); // Default to Premium Economy
  const [selectedRegion, setSelectedRegion] = useState<string>('all');

  const activeSpec = CABIN_SPECS.find(s => s.code === selectedClass) || CABIN_SPECS[2];

  const filteredRoutes = selectedRegion === 'all'
    ? ROUTE_DEPLOYMENTS
    : ROUTE_DEPLOYMENTS.filter(r => r.region === selectedRegion);

  return (
    <div className="space-y-6 md:space-y-8">
      {/* Top Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl md:text-2xl font-bold font-display text-white flex items-center gap-2.5">
            <Layers className="w-6 h-6 text-emirates-red" />
            Product Architecture & Cabin Specifications
          </h2>
          <p className="text-xs text-slate-400 mt-1 font-sans">
            4-Class fleet standard, ergonomic material specifications, and global route deployment
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono bg-navy-900 px-3 py-1.5 rounded-xl border border-navy-750 self-start sm:self-auto">
          <Sparkles className="w-4 h-4 text-emirates-gold" />
          <span className="text-slate-400">Signature Standard:</span>
          <span className="font-bold text-white">4-Class Widebody</span>
        </div>
      </div>

      {/* Cabin Class Selector Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {CABIN_SPECS.map((spec) => {
          const isSelected = spec.code === selectedClass;
          return (
            <button
              key={spec.code}
              onClick={() => setSelectedClass(spec.code)}
              className={`p-4 rounded-xl text-left border transition-all ${
                isSelected
                  ? 'bg-navy-850 border-emirates-red shadow-sm'
                  : 'bg-navy-900/80 border-navy-750 hover:bg-navy-850 hover:border-navy-700'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="w-7 h-7 rounded-lg flex items-center justify-center font-mono font-bold text-xs" style={{ backgroundColor: `${spec.accentColor}20`, color: spec.accentColor, border: `1px solid ${spec.accentColor}40` }}>
                  {spec.code}
                </span>
                {isSelected && (
                  <span className="w-2 h-2 rounded-full bg-emirates-red" />
                )}
              </div>
              <div className="text-sm font-bold text-white font-display">{spec.classTier} Class</div>
              <p className="text-[11px] text-slate-400 truncate mt-0.5 font-sans">{spec.productName}</p>
            </button>
          );
        })}
      </div>

      {/* Active Spec Sheet Detail */}
      <div className="glass-panel p-6 rounded-2xl border border-navy-700/60 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-navy-800">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded text-xs font-mono font-semibold" style={{ backgroundColor: `${activeSpec.accentColor}25`, color: activeSpec.accentColor }}>
                {activeSpec.classTier} Cabin Spec
              </span>
              <h3 className="text-lg font-bold font-display text-white">{activeSpec.productName}</h3>
            </div>
            <p className="text-xs text-slate-400 mt-1 font-sans">{activeSpec.keyInnovation}</p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-slate-400">Class Identifier:</span>
            <span className="px-2.5 py-1 rounded-lg bg-navy-900 border border-navy-750 font-mono font-bold text-sm text-white">
              Tier {activeSpec.code}
            </span>
          </div>
        </div>

        {/* Dimension & Feature Metrics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-3.5 rounded-xl bg-navy-900 border border-navy-750">
            <div className="flex items-center gap-1.5 text-slate-400 text-xs font-mono mb-1">
              <Maximize2 className="w-3.5 h-3.5" />
              Seat Pitch
            </div>
            <div className="text-base font-bold font-mono text-white">{activeSpec.seatPitch}</div>
          </div>

          <div className="p-3.5 rounded-xl bg-navy-900 border border-navy-750">
            <div className="flex items-center gap-1.5 text-slate-400 text-xs font-mono mb-1">
              <Maximize2 className="w-3.5 h-3.5" />
              Seat Width
            </div>
            <div className="text-base font-bold font-mono text-white">{activeSpec.seatWidth}</div>
          </div>

          <div className="p-3.5 rounded-xl bg-navy-900 border border-navy-750">
            <div className="flex items-center gap-1.5 text-slate-400 text-xs font-mono mb-1">
              <Tv className="w-3.5 h-3.5" />
              ICE Inflight Display
            </div>
            <div className="text-base font-bold font-mono text-white">{activeSpec.screenSize}</div>
          </div>

          <div className="p-3.5 rounded-xl bg-navy-900 border border-navy-750">
            <div className="flex items-center gap-1.5 text-slate-400 text-xs font-mono mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              Recline Style
            </div>
            <div className="text-xs font-mono font-bold text-slate-200 mt-1">{activeSpec.recline}</div>
          </div>
        </div>

        {/* Materials & Features List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          {/* Materials */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold font-mono text-slate-300 uppercase tracking-wider">
              Luxury Materials & Finishes
            </h4>
            <div className="space-y-2">
              {activeSpec.materials.map((m, idx) => (
                <div key={idx} className="flex items-center gap-2 p-2.5 rounded-lg bg-navy-900 border border-navy-750 text-xs text-slate-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-emirates-gold" />
                  <span>{m}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Key Product Features */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold font-mono text-slate-300 uppercase tracking-wider">
              Product & Amenity Features
            </h4>
            <div className="space-y-2">
              {activeSpec.features.map((f, idx) => (
                <div key={idx} className="flex items-center gap-2 p-2.5 rounded-lg bg-navy-900 border border-navy-750 text-xs text-slate-300">
                  <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>{f}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Global Route Network Rollout */}
      <div className="glass-panel p-6 rounded-2xl border border-navy-700/60 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-navy-800">
          <div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-emirates-red" />
              <h3 className="text-base font-bold font-display text-white">
                Global Premium Economy Route Network
              </h3>
            </div>
            <p className="text-xs text-slate-400 mt-0.5 font-sans">
              Primary international gateways served by retrofitted 4-class widebodies
            </p>
          </div>

          {/* Region filter */}
          <div className="flex flex-wrap gap-1 bg-navy-900 p-1 rounded-lg border border-navy-750 text-xs">
            {['all', 'Europe', 'North America', 'Asia Pacific', 'Australasia'].map((r) => (
              <button
                key={r}
                onClick={() => setSelectedRegion(r)}
                className={`px-2.5 py-1 rounded text-xs transition-all ${
                  selectedRegion === r
                    ? 'bg-emirates-red text-white font-medium'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {r === 'all' ? 'All Regions' : r}
              </button>
            ))}
          </div>
        </div>

        {/* Route Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {filteredRoutes.map((route) => (
            <div
              key={route.iata}
              className="p-3.5 rounded-xl bg-navy-900/80 border border-navy-750 hover:border-navy-700 transition-all flex flex-col justify-between group"
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-base font-bold font-mono text-white">{route.iata}</span>
                    <span className="text-xs font-medium text-slate-300">{route.destination}</span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-0.5">{route.country} • {route.region}</p>
                </div>

                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  4-Class Active
                </span>
              </div>

              <div className="mt-3 pt-2.5 border-t border-navy-800 flex items-center justify-between text-[11px] text-slate-400 font-mono">
                <span className="flex items-center gap-1">
                  <Plane className="w-3 h-3 text-slate-400" />
                  {route.dailyFrequencies}x Daily
                </span>
                <span>{route.aircraftTypes.join(' / ')}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
