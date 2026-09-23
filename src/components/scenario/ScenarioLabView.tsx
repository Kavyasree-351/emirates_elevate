import React, { useState, useMemo } from 'react';
import { FLEET_SUMMARY } from '../../data/fleetData';
import { 
  Sliders, 
  AlertCircle, 
  Sparkles, 
  RotateCcw,
  Zap,
  BarChart3,
  CheckCircle2
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Legend 
} from 'recharts';

type StrategyFocus = 'balanced' | 'a380_first' | 'b777_first';
type HangarPace = 'standard' | 'accelerated' | 'constrained';

export const ScenarioLabView: React.FC = () => {
  // Scenario Parameters
  const [additionalAircraft, setAdditionalAircraft] = useState<number>(15);
  const [strategyFocus, setStrategyFocus] = useState<StrategyFocus>('balanced');
  const [hangarPace, setHangarPace] = useState<HangarPace>('standard');

  // Baseline figures
  const baselineA380Done = FLEET_SUMMARY.a380Completed; // 48
  const a380Target = FLEET_SUMMARY.a380Target; // 110
  const baselineB777Done = FLEET_SUMMARY.b777Completed; // 26
  const b777Target = FLEET_SUMMARY.b777Target; // 81
  const baselineTotalDone = FLEET_SUMMARY.totalCompletedRetrofits; // 74
  const totalTarget = FLEET_SUMMARY.totalTargetAircraft; // 191
  const maxAdditional = totalTarget - baselineTotalDone; // 117

  // Calculate allocation between A380 and B777 based on strategy
  const { simulatedA380Done, simulatedB777Done } = useMemo(() => {
    let a380Add = 0;
    let b777Add = 0;

    const a380Remaining = a380Target - baselineA380Done;
    const b777Remaining = b777Target - baselineB777Done;

    if (strategyFocus === 'balanced') {
      const totalRemaining = a380Remaining + b777Remaining;
      a380Add = Math.round((additionalAircraft * a380Remaining) / totalRemaining);
      b777Add = additionalAircraft - a380Add;
    } else if (strategyFocus === 'a380_first') {
      a380Add = Math.min(a380Remaining, Math.round(additionalAircraft * 0.75));
      b777Add = additionalAircraft - a380Add;
    } else {
      b777Add = Math.min(b777Remaining, Math.round(additionalAircraft * 0.75));
      a380Add = additionalAircraft - b777Add;
    }

    const finalA380 = Math.min(a380Target, baselineA380Done + a380Add);
    const finalB777 = Math.min(b777Target, baselineB777Done + b777Add);

    return {
      simulatedA380Done: finalA380,
      simulatedB777Done: finalB777
    };
  }, [additionalAircraft, strategyFocus, baselineA380Done, a380Target, baselineB777Done, b777Target]);

  const simulatedTotalDone = simulatedA380Done + simulatedB777Done;
  const simulatedRemaining = totalTarget - simulatedTotalDone;
  const simulatedProgressPct = ((simulatedTotalDone / totalTarget) * 100).toFixed(1);

  // Velocity rates (aircraft per month based on bays and turnaround days)
  const monthlyRunRate = useMemo(() => {
    switch (hangarPace) {
      case 'accelerated': return 6.2; // 6 active bays @ ~20 days
      case 'constrained': return 2.8; // Supply chain bottleneck @ ~35 days
      case 'standard': default: return 4.5; // 4 active bays @ ~22 days
    }
  }, [hangarPace]);

  const monthsRemaining = Math.max(0, Math.ceil(simulatedRemaining / monthlyRunRate));
  const baselineMonthsRemaining = Math.ceil((totalTarget - baselineTotalDone) / 4.5);
  const runwayMonthsSaved = Math.max(0, baselineMonthsRemaining - monthsRemaining);

  // Seat metrics
  const newA380Count = simulatedA380Done - baselineA380Done;
  const newB777Count = simulatedB777Done - baselineB777Done;
  const addedPESeats = (newA380Count * 56) + (newB777Count * 24);
  const simulatedTotalPESeats = FLEET_SUMMARY.totalPremiumEconomySeatsInstalled + addedPESeats;

  // Recharts comparative dataset
  const comparisonData = [
    {
      name: 'Airbus A380',
      Baseline: baselineA380Done,
      Simulated: simulatedA380Done,
      Target: a380Target
    },
    {
      name: 'Boeing 777',
      Baseline: baselineB777Done,
      Simulated: simulatedB777Done,
      Target: b777Target
    },
    {
      name: 'Total Fleet',
      Baseline: baselineTotalDone,
      Simulated: simulatedTotalDone,
      Target: totalTarget
    }
  ];

  const handleReset = () => {
    setAdditionalAircraft(0);
    setStrategyFocus('balanced');
    setHangarPace('standard');
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl md:text-2xl font-bold font-display text-white flex items-center gap-2.5">
              <Sliders className="w-6 h-6 text-emirates-red" />
              Scenario Lab & Sensitivity Modeling
            </h2>
            <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-semibold bg-navy-850 text-slate-300 border border-navy-700">
              Interactive Tool
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1 font-sans max-w-3xl">
            Simulate how varying upgrade throughput, airframe family prioritization, and hangar turnarounds affect completion runways and cabin product rollouts.
          </p>
        </div>

        <button
          onClick={handleReset}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-navy-900 border border-navy-750 text-xs font-mono text-slate-300 hover:text-white hover:bg-navy-850 transition-colors self-start sm:self-auto"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Parameters</span>
        </button>
      </div>

      {/* Prominent Disclaimer */}
      <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
        <div className="space-y-1 text-xs">
          <span className="font-bold text-amber-200 uppercase font-mono tracking-wider">
            Hypothetical Scenario — Not an Emirates Forecast
          </span>
          <p className="text-slate-300 leading-relaxed font-sans">
            This module is an analytical sandbox designed to demonstrate strategic sensitivity testing. All calculations are mathematical extrapolations of publicly documented baseline scopes and do not represent internal operational forecasts.
          </p>
        </div>
      </div>

      {/* Interactive Controls & Live Projections Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Parameter Controls (5 cols) */}
        <div className="lg:col-span-5 glass-panel p-6 rounded-2xl border border-navy-700/60 space-y-6">
          <div className="pb-3 border-b border-navy-800 flex items-center justify-between">
            <h3 className="text-base font-bold font-display text-white flex items-center gap-2">
              <Zap className="w-4 h-4 text-emirates-gold" />
              Scenario Parameters
            </h3>
            <span className="text-[11px] font-mono text-slate-400">Live Adjustment</span>
          </div>

          {/* Control 1: Additional Aircraft Slider */}
          <div className="space-y-3">
            <div className="flex justify-between items-center text-xs">
              <label className="font-bold text-slate-200 font-mono">
                Additional Aircraft Upgrades:
              </label>
              <span className="font-mono font-bold text-sm text-emerald-400 bg-navy-900 px-2.5 py-0.5 rounded border border-navy-750">
                +{additionalAircraft} Aircraft
              </span>
            </div>

            <input
              type="range"
              min="0"
              max={maxAdditional}
              value={additionalAircraft}
              onChange={(e) => setAdditionalAircraft(Number(e.target.value))}
              className="w-full accent-emirates-red cursor-pointer h-2 bg-navy-950 rounded-lg"
            />

            <div className="flex justify-between items-center text-[10px] text-slate-500 font-mono">
              <span>0 (Current Status)</span>
              <span>+50 Aircraft</span>
              <span>+{maxAdditional} (100% Target)</span>
            </div>

            {/* Quick Presets */}
            <div className="grid grid-cols-4 gap-2 pt-1">
              {[0, 10, 25, 50].map((preset) => (
                <button
                  key={preset}
                  onClick={() => setAdditionalAircraft(preset)}
                  className={`py-1.5 rounded-lg text-xs font-mono font-medium transition-colors border ${
                    additionalAircraft === preset
                      ? 'bg-emirates-red text-white border-emirates-red'
                      : 'bg-navy-900 text-slate-400 border-navy-750 hover:text-slate-200 hover:bg-navy-850'
                  }`}
                >
                  {preset === 0 ? 'Baseline' : `+${preset}`}
                </button>
              ))}
            </div>
          </div>

          {/* Control 2: Family Prioritization Strategy */}
          <div className="space-y-3 pt-2">
            <label className="font-bold text-xs text-slate-200 font-mono block">
              Fleet Family Prioritization:
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'balanced', label: 'Balanced', desc: 'Equal Pace' },
                { id: 'a380_first', label: 'A380 Focus', desc: '56 PE Hubs' },
                { id: 'b777_first', label: 'B777 Focus', desc: '1-2-1 J Parity' }
              ].map((strat) => (
                <button
                  key={strat.id}
                  onClick={() => setStrategyFocus(strat.id as StrategyFocus)}
                  className={`p-2.5 rounded-xl border text-left transition-all ${
                    strategyFocus === strat.id
                      ? 'bg-navy-850 border-emirates-red text-white'
                      : 'bg-navy-900 border-navy-750 text-slate-400 hover:text-slate-200 hover:bg-navy-850'
                  }`}
                >
                  <div className="text-xs font-bold font-mono">{strat.label}</div>
                  <div className="text-[10px] opacity-75 font-sans mt-0.5">{strat.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Control 3: Hangar Throughput Pace */}
          <div className="space-y-3 pt-2">
            <label className="font-bold text-xs text-slate-200 font-mono block">
              DXB Hangar Operating Velocity:
            </label>
            <div className="space-y-2">
              {[
                { id: 'accelerated', name: 'Accelerated (6 Bays)', desc: '~6.2 widebodies/month (peak efficiency)' },
                { id: 'standard', name: 'Standard (4 Bays)', desc: '~4.5 widebodies/month (current baseline)' },
                { id: 'constrained', name: 'Constrained (2 Bays)', desc: '~2.8 widebodies/month (supply chain lag)' }
              ].map((pace) => (
                <label
                  key={pace.id}
                  onClick={() => setHangarPace(pace.id as HangarPace)}
                  className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${
                    hangarPace === pace.id
                      ? 'bg-navy-850 border-sky-500/80 text-white'
                      : 'bg-navy-900 border-navy-750 text-slate-400 hover:text-slate-200 hover:bg-navy-850'
                  }`}
                >
                  <div>
                    <div className="text-xs font-bold font-sans text-slate-200">{pace.name}</div>
                    <div className="text-[10px] text-slate-400 font-sans mt-0.5">{pace.desc}</div>
                  </div>
                  <input
                    type="radio"
                    name="hangarPace"
                    checked={hangarPace === pace.id}
                    onChange={() => {}}
                    className="accent-sky-500"
                  />
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Projected Dynamic Outcomes (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Key Output Metrics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-navy-900 border border-navy-700/80 space-y-2">
              <div className="flex items-center justify-between text-slate-400 text-xs font-mono">
                <span>Modernized Fleet</span>
                <span className="text-[10px] text-emerald-400 font-bold">
                  +{additionalAircraft} Simulated
                </span>
              </div>
              <div className="text-3xl font-bold font-mono text-white">
                {simulatedTotalDone}{' '}
                <span className="text-xs font-sans text-slate-400 font-normal">/ {totalTarget} Units</span>
              </div>
              <div className="text-xs text-emerald-400 font-mono flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{simulatedProgressPct}% Programme Target</span>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-navy-900 border border-navy-700/80 space-y-2">
              <div className="flex items-center justify-between text-slate-400 text-xs font-mono">
                <span>Estimated Runway</span>
                <span className="text-[10px] text-sky-400 font-bold">
                  {monthlyRunRate} / mo
                </span>
              </div>
              <div className="text-3xl font-bold font-mono text-sky-400">
                ~{monthsRemaining}{' '}
                <span className="text-xs font-sans text-slate-400 font-normal">Months</span>
              </div>
              <div className="text-xs text-slate-400 font-mono">
                {runwayMonthsSaved > 0 ? `Saved ~${runwayMonthsSaved} months vs baseline` : 'Baseline schedule'}
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-navy-900 border border-navy-700/80 space-y-2">
              <div className="flex items-center justify-between text-slate-400 text-xs font-mono">
                <span>Premium Economy Seats</span>
                <span className="text-[10px] text-amber-400 font-bold">
                  +{addedPESeats} Added
                </span>
              </div>
              <div className="text-3xl font-bold font-mono text-emirates-gold">
                {simulatedTotalPESeats.toLocaleString()}
              </div>
              <div className="text-xs text-slate-400 font-mono">
                A380 (56) & B777 (24) Cradle Seats
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-navy-900 border border-navy-700/80 space-y-2">
              <div className="flex items-center justify-between text-slate-400 text-xs font-mono">
                <span>Remaining In Queue</span>
                <span className="text-[10px] text-slate-400 font-bold">
                  Hangar Allocation
                </span>
              </div>
              <div className="text-3xl font-bold font-mono text-slate-200">
                {simulatedRemaining}{' '}
                <span className="text-xs font-sans text-slate-400 font-normal">Aircraft</span>
              </div>
              <div className="text-xs text-slate-400 font-mono">
                A380: {a380Target - simulatedA380Done} left | B777: {b777Target - simulatedB777Done} left
              </div>
            </div>
          </div>

          {/* Chart: Baseline vs Simulated Fleet Breakdown */}
          <div className="glass-panel p-6 rounded-2xl border border-navy-700/60 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-navy-800">
              <div>
                <h4 className="text-sm font-bold font-display text-white flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-emirates-red" />
                  Baseline vs. Simulated Delivery Comparison
                </h4>
                <p className="text-xs text-slate-400 mt-0.5 font-sans">
                  Visualizing conversion progress across airframe families under active scenario
                </p>
              </div>
            </div>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={comparisonData}
                  margin={{ top: 15, right: 20, left: -10, bottom: 5 }}
                >
                  <XAxis 
                    dataKey="name" 
                    stroke="#64748b" 
                    tick={{ fill: '#94a3b8', fontSize: 11, fontFamily: 'monospace' }}
                  />
                  <YAxis 
                    stroke="#64748b" 
                    tick={{ fill: '#94a3b8', fontSize: 11, fontFamily: 'monospace' }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#0f1422',
                      borderColor: '#1e293b',
                      borderRadius: '8px',
                      color: '#f8fafc',
                      fontSize: '12px',
                      fontFamily: 'monospace'
                    }}
                  />
                  <Legend 
                    wrapperStyle={{ fontSize: '11px', fontFamily: 'monospace', paddingTop: '10px' }}
                  />
                  <Bar dataKey="Baseline" fill="#38bdf8" name="Baseline Completed" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="Simulated" fill="#C8102E" name="Simulated Total" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="Target" fill="#334155" name="Programme Target" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      {/* Strategic Analyst Takeaways */}
      <div className="glass-panel p-6 rounded-2xl border border-navy-700/60 space-y-4">
        <div className="flex items-center gap-2.5 pb-3 border-b border-navy-800">
          <Sparkles className="w-4 h-4 text-emirates-gold" />
          <h4 className="text-sm font-bold font-display text-white">
            Strategic Decision-Support Takeaway
          </h4>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-navy-900 border border-navy-750 space-y-1.5">
            <span className="text-[10px] font-mono text-emerald-400 uppercase font-bold">
              Capacity Acceleration
            </span>
            <p className="text-slate-300 leading-relaxed font-sans">
              Allocating additional hangar bays from 4 to 6 compresses remaining programme delivery by approximately <strong>~{Math.max(1, Math.round(monthsRemaining * 0.28))} months</strong>, enabling earlier route deployment of 4-Class aircraft on secondary long-haul routes.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-navy-900 border border-navy-750 space-y-1.5">
            <span className="text-[10px] font-mono text-sky-400 uppercase font-bold">
              Product Parity Trade-off
            </span>
            <p className="text-slate-300 leading-relaxed font-sans">
              Prioritizing the Boeing 777 conversion line accelerates the elimination of the 2-3-2 Business Class middle seat, maximizing fleet-wide premium cabin consistency across network connections at DXB.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-navy-900 border border-navy-750 space-y-1.5">
            <span className="text-[10px] font-mono text-amber-400 uppercase font-bold">
              Yield Maximization
            </span>
            <p className="text-slate-300 leading-relaxed font-sans">
              Prioritizing the A380 line delivers <strong>56 Premium Economy seats</strong> per airframe (vs. 24 on B777), unlocking rapid high-density premium leisure capacity into constrained slot markets (London Heathrow, Sydney, Tokyo).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
