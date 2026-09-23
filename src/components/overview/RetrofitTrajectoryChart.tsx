import React, { useState } from 'react';
import {
  ResponsiveContainer,
  ComposedChart,
  Area,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend
} from 'recharts';
import { QUARTERLY_TRENDS } from '../../data/analyticsData';
import { Layers } from 'lucide-react';

export const RetrofitTrajectoryChart: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'split'>('all');

  return (
    <div className="glass-panel p-5 md:p-6 rounded-2xl border border-navy-700/60 flex flex-col justify-between">
      {/* Header & Filter Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-base font-bold font-display text-white">
              Retrofit Runway & Delivery Pace
            </h2>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              S-Curve Trajectory
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1 font-sans">
            Historical quarterly completions vs planned 191-aircraft target milestone curve
          </p>
        </div>

        {/* View Toggle */}
        <div className="flex items-center gap-1 p-1 bg-navy-900 rounded-lg border border-navy-700 self-start sm:self-auto text-xs">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1 rounded-md text-xs font-medium transition-all ${
              filter === 'all'
                ? 'bg-emirates-red text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Cumulative Runway
          </button>
          <button
            onClick={() => setFilter('split')}
            className={`px-3 py-1 rounded-md text-xs font-medium transition-all ${
              filter === 'split'
                ? 'bg-emirates-red text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            A380 vs B777 Quarterly
          </button>
        </div>
      </div>

      {/* Recharts Container */}
      <div className="w-full h-72 md:h-80">
        <ResponsiveContainer width="100%" height="100%">
          {filter === 'all' ? (
            <ComposedChart
              data={QUARTERLY_TRENDS}
              margin={{ top: 10, right: 10, left: -15, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#C8102E" stopOpacity={0.35} />
                  <stop offset="95%" stopColor="#C8102E" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1F263B" vertical={false} />
              <XAxis
                dataKey="quarter"
                stroke="#64748B"
                fontSize={11}
                tickLine={false}
                axisLine={{ stroke: '#2E3858' }}
              />
              <YAxis
                stroke="#64748B"
                fontSize={11}
                tickLine={false}
                axisLine={false}
                domain={[0, 140]}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#111522',
                  borderColor: '#2E3856',
                  borderRadius: '0.75rem',
                  fontSize: '12px',
                  color: '#F1F5F9'
                }}
                itemStyle={{ color: '#E2E8F0' }}
              />
              <Legend
                verticalAlign="top"
                align="right"
                wrapperStyle={{ paddingBottom: '12px', fontSize: '11px' }}
              />
              <Area
                type="monotone"
                dataKey="cumulativeTotal"
                name="Cumulative Modernized Fleet"
                stroke="#C8102E"
                strokeWidth={2.5}
                fillOpacity={1}
                fill="url(#colorActual)"
              />
              <Line
                type="monotone"
                dataKey="targetCumulative"
                name="Target Benchmark Plan"
                stroke="#D4AF37"
                strokeWidth={2}
                strokeDasharray="4 4"
                dot={{ r: 3, fill: '#D4AF37' }}
              />
            </ComposedChart>
          ) : (
            <ComposedChart
              data={QUARTERLY_TRENDS}
              margin={{ top: 10, right: 10, left: -15, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#1F263B" vertical={false} />
              <XAxis
                dataKey="quarter"
                stroke="#64748B"
                fontSize={11}
                tickLine={false}
                axisLine={{ stroke: '#2E3858' }}
              />
              <YAxis
                stroke="#64748B"
                fontSize={11}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#111522',
                  borderColor: '#2E3856',
                  borderRadius: '0.75rem',
                  fontSize: '12px',
                  color: '#F1F5F9'
                }}
              />
              <Legend
                verticalAlign="top"
                align="right"
                wrapperStyle={{ paddingBottom: '12px', fontSize: '11px' }}
              />
              <Area
                type="monotone"
                dataKey="a380Completed"
                name="A380 Refurbishments / Quarter"
                fill="#8B5CF6"
                fillOpacity={0.25}
                stroke="#A78BFA"
                strokeWidth={2}
              />
              <Area
                type="monotone"
                dataKey="b777Completed"
                name="Boeing 777 Refurbishments / Quarter"
                fill="#0284C7"
                fillOpacity={0.25}
                stroke="#38BDF8"
                strokeWidth={2}
              />
            </ComposedChart>
          )}
        </ResponsiveContainer>
      </div>

      {/* Chart Footer Strategic Note */}
      <div className="mt-4 pt-3 border-t border-navy-800 flex items-center justify-between text-[11px] text-slate-400">
        <div className="flex items-center gap-2">
          <Layers className="w-3.5 h-3.5 text-emirates-gold" />
          <span>Hangar cycle rate: <strong>~1.8 aircraft completions / month</strong> across 4 concurrent bays.</span>
        </div>
        <span className="hidden md:inline font-mono text-emerald-400 font-medium">On Track (+1.4% vs plan)</span>
      </div>
    </div>
  );
};
