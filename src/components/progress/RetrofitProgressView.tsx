import React, { useState } from 'react';
import { FLEET_SUMMARY } from '../../data/fleetData';
import { RETROFIT_MILESTONES } from '../../data/milestonesData';
import { 
  TrendingUp, 
  Plane, 
  Layers, 
  Sliders, 
  Lightbulb, 
  Clock, 
  CheckCircle2, 
  Calendar, 
  AlertCircle
} from 'lucide-react';

export const RetrofitProgressView: React.FC = () => {
  // Scenario Tool State: 0 (Baseline), 5, 10, 25 additional aircraft
  const [scenarioAddon, setScenarioAddon] = useState<number>(0);

  // Baseline figures
  const baselineCompleted = FLEET_SUMMARY.totalCompletedRetrofits; // 74
  const totalTarget = FLEET_SUMMARY.totalTargetAircraft; // 191

  // Dynamic Scenario Calculations
  const simulatedCompleted = Math.min(totalTarget, baselineCompleted + scenarioAddon);
  const simulatedRemaining = Math.max(0, totalTarget - simulatedCompleted);
  const simulatedProgressPct = ((simulatedCompleted / totalTarget) * 100).toFixed(1);
  
  // Estimate ~4.5 aircraft / month run rate
  const monthsRemainingBaseline = Math.ceil((totalTarget - baselineCompleted) / 4.5);
  const monthsRemainingSimulated = Math.ceil(simulatedRemaining / 4.5);
  const additionalPESeats = Math.round(scenarioAddon * 45.3); // blended average of 56 (A380) and 24 (B777)
  const simulatedTotalPESeats = FLEET_SUMMARY.totalPremiumEconomySeatsInstalled + additionalPESeats;

  // Family breakdown percentages
  const a380Pct = ((FLEET_SUMMARY.a380Completed / FLEET_SUMMARY.a380Target) * 100).toFixed(1);
  const b777Pct = ((FLEET_SUMMARY.b777Completed / FLEET_SUMMARY.b777Target) * 100).toFixed(1);

  // Product Penetration Specs (% of planned fleet)
  const productPenetration = [
    {
      product: 'Premium Economy Rollout',
      count: `${FLEET_SUMMARY.totalCompletedRetrofits} / ${FLEET_SUMMARY.totalTargetAircraft}`,
      pct: Number(simulatedProgressPct),
      color: '#C8102E',
      note: '56 seats on A380 / 24 seats on B777-300ER'
    },
    {
      product: 'Refreshed 1-2-1 Business Class',
      count: `${FLEET_SUMMARY.b777Completed} / ${FLEET_SUMMARY.b777Target} (B777)`,
      pct: Number(b777Pct),
      color: '#38BDF8',
      note: 'Direct aisle layout replacing legacy 2-3-2 configuration'
    },
    {
      product: 'A380 Shower & Lounge Modernization',
      count: `${FLEET_SUMMARY.a380Completed} / ${FLEET_SUMMARY.a380Target} (A380)`,
      pct: Number(a380Pct),
      color: '#8B5CF6',
      note: 'Upper deck bespoke Ghaf artwork & bronze motif finish'
    },
    {
      product: 'High-Speed Broadband & 4K ICE',
      count: `${FLEET_SUMMARY.totalCompletedRetrofits + FLEET_SUMMARY.a350ActiveNewGen} Units`,
      pct: Math.min(100, Math.round(((FLEET_SUMMARY.totalCompletedRetrofits + 2) / FLEET_SUMMARY.totalTargetAircraft) * 100)),
      color: '#10B981',
      note: 'Ka-band satellite connectivity and ultra-HD touch displays'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl md:text-2xl font-bold font-display text-white flex items-center gap-2.5">
              <TrendingUp className="w-6 h-6 text-emirates-red" />
              Retrofit Progress & Decision Support
            </h2>
            <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-semibold bg-navy-850 text-slate-300 border border-navy-700">
              Strategic Interpretation
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1 font-sans max-w-3xl">
            Monitoring the progress of Emirates' multi-billion dollar fleet transformation across airframe families, product rollouts, and operational milestones.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono bg-navy-900 px-3 py-1.5 rounded-xl border border-navy-750 self-start sm:self-auto">
          <Clock className="w-4 h-4 text-emerald-400" />
          <span className="text-slate-400">Pace:</span>
          <span className="font-bold text-white">~4.5 Widebodies / Mo</span>
        </div>
      </div>

      {/* 1. OVERALL PROGRAMME PROGRESS SUMMARY */}
      <div className="glass-panel p-6 rounded-2xl border border-navy-700/60 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-navy-800">
          <div>
            <h3 className="text-base font-bold font-display text-white">
              Overall Programme Modernization Runway
            </h3>
            <p className="text-xs text-slate-400 mt-0.5 font-sans">
              Cumulative progress toward the publicly documented 191 widebody aircraft overhaul target
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono">
            <span className="text-slate-400">Total Scope:</span>
            <span className="font-bold text-white bg-navy-850 px-2 py-0.5 rounded border border-navy-700">
              191 Aircraft (110 A380 + 81 B777)
            </span>
          </div>
        </div>

        {/* Big Progress Gauge & Metric Bar */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 items-center">
          <div className="p-4 rounded-xl bg-navy-900 border border-navy-750 space-y-1">
            <span className="text-slate-400 text-[11px] font-mono uppercase block">Modernized In Service</span>
            <div className="text-2xl lg:text-3xl font-bold font-mono text-white">
              {simulatedCompleted}{' '}
              <span className="text-xs text-slate-400 font-sans font-normal">/ {totalTarget} Target</span>
            </div>
            <div className="text-[11px] text-emerald-400 flex items-center gap-1 font-mono pt-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{simulatedProgressPct}% Fleet Modernized</span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-navy-900 border border-navy-750 space-y-1">
            <span className="text-slate-400 text-[11px] font-mono uppercase block">Remaining In Queue</span>
            <div className="text-2xl lg:text-3xl font-bold font-mono text-slate-200">
              {simulatedRemaining}{' '}
              <span className="text-xs text-slate-400 font-sans font-normal">Aircraft</span>
            </div>
            <div className="text-[11px] text-slate-400 flex items-center gap-1 font-mono pt-1">
              <span>Hangar Bays 1–4 Active</span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-navy-900 border border-navy-750 space-y-1">
            <span className="text-slate-400 text-[11px] font-mono uppercase block">Premium Economy Added</span>
            <div className="text-2xl lg:text-3xl font-bold font-mono text-emirates-gold">
              {simulatedTotalPESeats.toLocaleString()}+{' '}
              <span className="text-xs text-slate-400 font-sans font-normal">Seats</span>
            </div>
            <div className="text-[11px] text-slate-400 font-mono pt-1">
              2-4-2 Widebody Cradles
            </div>
          </div>

          <div className="p-4 rounded-xl bg-navy-900 border border-navy-750 space-y-1">
            <span className="text-slate-400 text-[11px] font-mono uppercase block">Est. Completion Runway</span>
            <div className="text-2xl lg:text-3xl font-bold font-mono text-sky-400">
              ~{monthsRemainingSimulated}{' '}
              <span className="text-xs text-slate-400 font-sans font-normal">Months</span>
            </div>
            <div className="text-[11px] text-slate-400 font-mono pt-1">
              Target Pace: 2026 Target
            </div>
          </div>
        </div>

        {/* Visual Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between items-center text-xs font-mono">
            <span className="text-slate-300">Modernization Progress:</span>
            <span className="text-white font-bold">{simulatedProgressPct}%</span>
          </div>
          <div className="w-full bg-navy-950 h-3 rounded-full overflow-hidden border border-navy-800 relative">
            <div 
              className="bg-gradient-to-r from-emirates-red to-emirates-crimson h-full rounded-full transition-all duration-500"
              style={{ width: `${simulatedProgressPct}%` }}
            />
          </div>
          <div className="flex justify-between items-center text-[10px] text-slate-500 font-mono">
            <span>0% (Nov 2022 Launch)</span>
            <span>50% Target Benchmark</span>
            <span>100% Target (191 Units)</span>
          </div>
        </div>
      </div>

      {/* 2. PROGRESS BY AIRCRAFT FAMILY & PRODUCT PENETRATION */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Progress by Aircraft Family */}
        <div className="glass-panel p-6 rounded-2xl border border-navy-700/60 flex flex-col justify-between space-y-6">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-navy-800">
              <h3 className="text-base font-bold font-display text-white flex items-center gap-2">
                <Plane className="w-4 h-4 text-emirates-red" />
                Progress by Aircraft Family
              </h3>
              <span className="text-xs font-mono text-slate-400">Airframe Breakdown</span>
            </div>
            <p className="text-xs text-slate-400 mt-2 font-sans">
              Comparative overhaul progression between the Airbus A380 and Boeing 777 widebody conversion lines
            </p>
          </div>

          <div className="space-y-5">
            {/* A380 */}
            <div className="p-4 rounded-xl bg-navy-900/80 border border-navy-750 space-y-2.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-purple-500" />
                  <span className="font-display font-bold text-sm text-white">Airbus A380 Fleet</span>
                </div>
                <span className="font-mono text-xs font-bold text-purple-300">
                  {FLEET_SUMMARY.a380Completed} / {FLEET_SUMMARY.a380Target} ({a380Pct}%)
                </span>
              </div>
              <div className="w-full bg-navy-950 h-2 rounded-full overflow-hidden border border-navy-800">
                <div 
                  className="bg-purple-500 h-full rounded-full transition-all duration-700" 
                  style={{ width: `${a380Pct}%` }}
                />
              </div>
              <div className="flex justify-between items-center text-[10px] text-slate-400 font-mono">
                <span>Wave 1–3 Complete</span>
                <span>Avg Turnaround: 21.2 Days</span>
                <span>Remaining: {FLEET_SUMMARY.a380Target - FLEET_SUMMARY.a380Completed}</span>
              </div>
            </div>

            {/* Boeing 777 */}
            <div className="p-4 rounded-xl bg-navy-900/80 border border-navy-750 space-y-2.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-sky-500" />
                  <span className="font-display font-bold text-sm text-white">Boeing 777 Fleet</span>
                </div>
                <span className="font-mono text-xs font-bold text-sky-300">
                  {FLEET_SUMMARY.b777Completed} / {FLEET_SUMMARY.b777Target} ({b777Pct}%)
                </span>
              </div>
              <div className="w-full bg-navy-950 h-2 rounded-full overflow-hidden border border-navy-800">
                <div 
                  className="bg-sky-500 h-full rounded-full transition-all duration-700" 
                  style={{ width: `${b777Pct}%` }}
                />
              </div>
              <div className="flex justify-between items-center text-[10px] text-slate-400 font-mono">
                <span>Phase 1–2 Progress</span>
                <span>1-2-1 Business Upgrade</span>
                <span>Remaining: {FLEET_SUMMARY.b777Target - FLEET_SUMMARY.b777Completed}</span>
              </div>
            </div>

            {/* Airbus A350 note */}
            <div className="p-3 rounded-xl bg-navy-950 border border-navy-800 flex items-center justify-between text-xs text-slate-300">
              <div className="flex items-center gap-2 font-mono">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>Airbus A350-900 Fleet (New Generation)</span>
              </div>
              <span className="font-mono text-[11px] text-emerald-400 font-semibold">Factory Fitted Standard</span>
            </div>
          </div>
        </div>

        {/* Product Rollout Comparison */}
        <div className="glass-panel p-6 rounded-2xl border border-navy-700/60 flex flex-col justify-between space-y-6">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-navy-800">
              <h3 className="text-base font-bold font-display text-white flex items-center gap-2">
                <Layers className="w-4 h-4 text-emirates-gold" />
                Product Rollout & Feature Adoption
              </h3>
              <span className="text-xs font-mono text-slate-400">Cabin Penetration</span>
            </div>
            <p className="text-xs text-slate-400 mt-2 font-sans">
              Proportion of widebody fleet equipped with key passenger experience innovations
            </p>
          </div>

          <div className="space-y-3.5">
            {productPenetration.map((item, idx) => (
              <div key={idx} className="p-3.5 rounded-xl bg-navy-900/80 border border-navy-750 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-display font-bold text-white">{item.product}</span>
                  <span className="font-mono font-bold text-slate-200">{item.count}</span>
                </div>
                <div className="w-full bg-navy-950 h-2 rounded-full overflow-hidden border border-navy-800">
                  <div 
                    className="h-full rounded-full transition-all duration-700" 
                    style={{ width: `${item.pct}%`, backgroundColor: item.color }}
                  />
                </div>
                <div className="flex justify-between items-center text-[10px] text-slate-400 font-mono">
                  <span>{item.note}</span>
                  <span className="font-bold" style={{ color: item.color }}>{item.pct}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 3. HYPOTHETICAL SCENARIO SIMULATOR TOOL */}
      <div className="glass-panel p-6 rounded-2xl border border-navy-700/60 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-navy-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-emirates-red/15 text-emirates-red border border-emirates-red/30">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold font-display text-white">
                Explore a Hypothetical Rollout Scenario
              </h3>
              <p className="text-xs text-slate-400 font-sans">
                Simulate how accelerating aircraft upgrade completions shifts overall modernization percentage and runway
              </p>
            </div>
          </div>

          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/25 text-xs font-mono">
            <AlertCircle className="w-3.5 h-3.5 text-amber-400" />
            Hypothetical scenario — not an Emirates forecast.
          </span>
        </div>

        {/* Scenario Selectors & Outcomes */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
          {/* Selector Buttons */}
          <div className="space-y-3">
            <label className="text-xs font-bold text-slate-300 uppercase tracking-wider font-mono block">
              Select Upgrade Addon:
            </label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { label: 'Baseline (0)', value: 0 },
                { label: '+5 Upgraded', value: 5 },
                { label: '+10 Upgraded', value: 10 },
                { label: '+25 Upgraded', value: 25 },
              ].map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setScenarioAddon(opt.value)}
                  className={`p-3 rounded-xl border text-xs font-medium font-mono transition-all text-left ${
                    scenarioAddon === opt.value
                      ? 'bg-emirates-red text-white border-emirates-red shadow-sm'
                      : 'bg-navy-900 text-slate-300 border-navy-750 hover:bg-navy-850 hover:text-white'
                  }`}
                >
                  <div className="font-bold text-sm">{opt.label}</div>
                  <span className="text-[10px] opacity-80 font-sans">
                    {opt.value === 0 ? 'Current Status' : `Simulate +${opt.value} units`}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Simulated Outputs */}
          <div className="lg:col-span-2 p-5 rounded-xl bg-navy-900 border border-navy-750 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1">
              <span className="text-[10px] font-mono text-slate-400 uppercase">Simulated Modernization</span>
              <div className="text-2xl font-bold font-mono text-white">
                {simulatedProgressPct}%
              </div>
              <span className="text-[11px] text-emerald-400 font-mono">
                {simulatedCompleted} of 191 units
              </span>
            </div>

            <div className="space-y-1">
              <span className="text-[10px] font-mono text-slate-400 uppercase">Remaining in Queue</span>
              <div className="text-2xl font-bold font-mono text-amber-300">
                {simulatedRemaining} Units
              </div>
              <span className="text-[11px] text-slate-400 font-mono">
                {simulatedRemaining === 0 ? 'Full Scope Completed' : `${simulatedRemaining} overhauls left`}
              </span>
            </div>

            <div className="space-y-1">
              <span className="text-[10px] font-mono text-slate-400 uppercase">Estimated Runway Impact</span>
              <div className="text-2xl font-bold font-mono text-sky-400">
                ~{monthsRemainingSimulated} Months
              </div>
              <span className="text-[11px] text-slate-400 font-mono">
                {scenarioAddon > 0 ? `Compressed by ~${monthsRemainingBaseline - monthsRemainingSimulated} months` : 'Baseline schedule'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 4. "WHAT THE DATA SUGGESTS" SECTION (Objective, non-prescriptive observations) */}
      <div className="glass-panel p-6 rounded-2xl border border-navy-700/60 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-navy-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-amber-500/15 text-amber-300 border border-amber-500/30">
              <Lightbulb className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold font-display text-white">
                What the Data Suggests — Strategic Synthesis
              </h3>
              <p className="text-xs text-slate-400 font-sans">
                Objective observations, potential opportunities, and areas for further analytical investigation
              </p>
            </div>
          </div>

          <span className="text-xs font-mono text-slate-400 bg-navy-900 px-3 py-1 rounded-lg border border-navy-750">
            Elevate Strategy Track Analysis
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Item 1 */}
          <div className="p-4 rounded-xl bg-navy-900/90 border border-navy-750 space-y-2">
            <div className="flex items-center justify-between">
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                Observed pattern
              </span>
              <span className="text-[10px] font-mono text-slate-400">Operational Velocity</span>
            </div>
            <h4 className="text-sm font-bold text-white font-display">
              Hangar Turnaround Learning Curve Maturation
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed font-sans">
              Based on available public information, turnaround durations compressed from 45 days on the prototype A380 airframe (A6-EVM) to a stable ~21-day cadence. This observed pattern indicates that standardized multi-bay tooling and parallel shift allocations significantly improved hangar throughput.
            </p>
          </div>

          {/* Item 2 */}
          <div className="p-4 rounded-xl bg-navy-900/90 border border-navy-750 space-y-2">
            <div className="flex items-center justify-between">
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-sky-500/10 text-sky-400 border border-sky-500/20">
                Area to investigate
              </span>
              <span className="text-[10px] font-mono text-slate-400">Fleet Homogeneity</span>
            </div>
            <h4 className="text-sm font-bold text-white font-display">
              Cabin Configuration & Fleet Product Consistency
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed font-sans">
              Some aircraft configurations show different product availability across routes during the transition period. This prototype allows analysts to explore where product consistency between 4-class retrofitted widebodies and legacy 3-class aircraft may warrant further investigation in schedule planning.
            </p>
          </div>

          {/* Item 3 */}
          <div className="p-4 rounded-xl bg-navy-900/90 border border-navy-750 space-y-2">
            <div className="flex items-center justify-between">
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-amber-500/10 text-amber-300 border border-amber-500/20">
                Potential opportunity
              </span>
              <span className="text-[10px] font-mono text-slate-400">Yield Architecture</span>
            </div>
            <h4 className="text-sm font-bold text-white font-display">
              Premium Economy Revenue Density on Key Hub Corridors
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed font-sans">
              Data modeling indicates that adding 56 Premium Economy seats on A380s and 24 on Boeing 777s creates a high revenue density cabin footprint. Observed route schedules show initial deployment prioritizing premium long-haul hubs (London, New York, Geneva, Tokyo, Sydney) to optimize premium leisure yield.
            </p>
          </div>

          {/* Item 4 */}
          <div className="p-4 rounded-xl bg-navy-900/90 border border-navy-750 space-y-2">
            <div className="flex items-center justify-between">
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-purple-500/10 text-purple-300 border border-purple-500/20">
                Based on available public information
              </span>
              <span className="text-[10px] font-mono text-slate-400">Boeing 777 Overhaul</span>
            </div>
            <h4 className="text-sm font-bold text-white font-display">
              Boeing 777 Direct Aisle Business Class Standard
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed font-sans">
              Public releases confirmed that the Boeing 777 refurbishment introduces a 1-2-1 Business Class layout (eliminating the legacy 2-3-2 middle seat). This closes the premium cabin experience differential with the A380 upper deck fleet, aligning customer satisfaction metrics across widebody types.
            </p>
          </div>
        </div>
      </div>

      {/* 5. TIMELINE OF MAJOR PROGRAMME MILESTONES */}
      <div className="glass-panel p-6 rounded-2xl border border-navy-700/60 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-navy-800">
          <div>
            <h3 className="text-base font-bold font-display text-white flex items-center gap-2">
              <Calendar className="w-4 h-4 text-emirates-gold" />
              Timeline of Major Programme Milestones
            </h3>
            <p className="text-xs text-slate-400 mt-0.5 font-sans">
              Key verifiable benchmarks in the multi-billion dollar retrofit programme
            </p>
          </div>
          <span className="text-xs font-mono text-slate-400">
            {RETROFIT_MILESTONES.length} Key Markers
          </span>
        </div>

        <div className="space-y-4">
          {RETROFIT_MILESTONES.map((m) => (
            <div
              key={m.id}
              className={`p-4 rounded-xl border transition-all flex flex-col sm:flex-row sm:items-start justify-between gap-4 ${
                m.highlight 
                  ? 'bg-navy-850 border-emirates-red/40' 
                  : 'bg-navy-900 border-navy-750'
              }`}
            >
              <div className="space-y-1.5 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-mono text-xs font-bold text-emirates-gold">{m.date}</span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-navy-800 text-slate-300 border border-navy-700">
                    {m.tag}
                  </span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-mono border ${
                    m.dataSource === 'Public Emirates information'
                      ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                      : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                  }`}>
                    {m.dataSource === 'Public Emirates information' ? 'Public Reference' : 'Demo Projection'}
                  </span>
                </div>
                <h4 className="text-sm font-bold text-white font-display">{m.title}</h4>
                <p className="text-xs text-slate-300 leading-relaxed font-sans">{m.description}</p>
                <div className="text-[10px] text-slate-400 font-mono italic pt-1">
                  Source: {m.sourceCitation}
                </div>
              </div>

              {m.aircraftCountReached && (
                <div className="p-2.5 rounded-lg bg-navy-950 border border-navy-800 text-right shrink-0">
                  <span className="text-[10px] text-slate-400 block font-mono">Modernized Fleet</span>
                  <span className="text-base font-bold font-mono text-emerald-400">{m.aircraftCountReached} Units</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
