import React from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';
import { FLEET_SUMMARY } from '../../data/fleetData';
import { Plane, CheckCircle2, Clock, CalendarDays, ShieldAlert } from 'lucide-react';

export const FleetCompositionCard: React.FC = () => {
  const pieData = [
    { name: 'Retrofitted (In Service)', value: FLEET_SUMMARY.totalCompletedRetrofits, color: '#10B981' }, // Emerald
    { name: 'Active In Hangar', value: FLEET_SUMMARY.totalInHangar, color: '#F59E0B' }, // Amber
    { name: 'Scheduled (Queued)', value: FLEET_SUMMARY.totalScheduled, color: '#38BDF8' }, // Sky
    { name: 'Original / Remaining', value: FLEET_SUMMARY.totalOriginalRemaining, color: '#334155' }, // Slate
  ];

  const a380Pct = ((FLEET_SUMMARY.a380Completed / FLEET_SUMMARY.a380Target) * 100).toFixed(1);
  const b777Pct = ((FLEET_SUMMARY.b777Completed / FLEET_SUMMARY.b777Target) * 100).toFixed(1);

  return (
    <div className="glass-panel p-5 md:p-6 rounded-2xl border border-navy-700/60 flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold font-display text-white">
            Fleet Transformation Breakdown
          </h2>
          <span className="text-xs font-mono text-slate-400">191 Total Target</span>
        </div>
        <p className="text-xs text-slate-400 mt-1">
          Aircraft status distribution and subtype conversion rate
        </p>
      </div>

      {/* Donut Chart & Legend */}
      <div className="my-4 grid grid-cols-1 sm:grid-cols-2 items-center gap-4">
        <div className="h-44 relative flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                innerRadius={50}
                outerRadius={70}
                paddingAngle={4}
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} stroke="#111420" strokeWidth={2} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: '#111420',
                  borderColor: '#2E3858',
                  borderRadius: '0.5rem',
                  fontSize: '11px',
                  color: '#FFF'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-xl font-bold font-display text-white">
              {FLEET_SUMMARY.overallProgramProgressPct}%
            </span>
            <span className="text-[10px] text-slate-400 uppercase tracking-wider">Converted</span>
          </div>
        </div>

        {/* Legend stats */}
        <div className="space-y-2.5 text-xs">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-slate-300">Retrofitted:</span>
            </div>
            <span className="font-mono font-bold text-white">{FLEET_SUMMARY.totalCompletedRetrofits}</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              <span className="text-slate-300">In Hangar:</span>
            </div>
            <span className="font-mono font-bold text-amber-300">{FLEET_SUMMARY.totalInHangar}</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CalendarDays className="w-3.5 h-3.5 text-sky-400" />
              <span className="text-slate-300">Scheduled 2025/26:</span>
            </div>
            <span className="font-mono font-bold text-sky-300">{FLEET_SUMMARY.totalScheduled}</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShieldAlert className="w-3.5 h-3.5 text-slate-400" />
              <span className="text-slate-300">Original Baseline:</span>
            </div>
            <span className="font-mono text-slate-400">{FLEET_SUMMARY.totalOriginalRemaining}</span>
          </div>
        </div>
      </div>

      {/* Airframe Progress Gauges */}
      <div className="pt-4 border-t border-navy-800/80 space-y-3">
        {/* A380 */}
        <div>
          <div className="flex justify-between items-center text-xs mb-1">
            <span className="text-slate-300 font-medium flex items-center gap-1.5">
              <Plane className="w-3.5 h-3.5 text-purple-400" />
              Airbus A380 Programme
            </span>
            <span className="font-mono text-xs text-purple-300 font-semibold">
              {FLEET_SUMMARY.a380Completed} / {FLEET_SUMMARY.a380Target} ({a380Pct}%)
            </span>
          </div>
          <div className="w-full bg-navy-800 h-2 rounded-full overflow-hidden border border-navy-700/60">
            <div 
              className="bg-purple-500 h-full rounded-full transition-all duration-700" 
              style={{ width: `${a380Pct}%` }}
            />
          </div>
        </div>

        {/* B777 */}
        <div>
          <div className="flex justify-between items-center text-xs mb-1">
            <span className="text-slate-300 font-medium flex items-center gap-1.5">
              <Plane className="w-3.5 h-3.5 text-sky-400" />
              Boeing 777 Programme
            </span>
            <span className="font-mono text-xs text-sky-300 font-semibold">
              {FLEET_SUMMARY.b777Completed} / {FLEET_SUMMARY.b777Target} ({b777Pct}%)
            </span>
          </div>
          <div className="w-full bg-navy-800 h-2 rounded-full overflow-hidden border border-navy-700/60">
            <div 
              className="bg-sky-500 h-full rounded-full transition-all duration-700" 
              style={{ width: `${b777Pct}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
