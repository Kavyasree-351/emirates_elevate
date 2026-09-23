import React from 'react';
import { HeroBanner } from './HeroBanner';
import { StatCard } from '../ui/StatCard';
import { RetrofitTrajectoryChart } from './RetrofitTrajectoryChart';
import { FleetCompositionCard } from './FleetCompositionCard';
import { MilestoneTimeline } from './MilestoneTimeline';
import { ExecutiveInsight } from './ExecutiveInsight';
import { DataMethodologyCard } from './DataMethodologyCard';
import { FLEET_SUMMARY, METRIC_SOURCES } from '../../data/fleetData';
import { Plane, CheckCircle2, Layers, Armchair } from 'lucide-react';

interface OverviewViewProps {
  onNavigateTab: (tab: string) => void;
}

export const OverviewView: React.FC<OverviewViewProps> = ({ onNavigateTab }) => {
  return (
    <div className="space-y-6 md:space-y-8">
      {/* Hero Section */}
      <HeroBanner onExploreClick={() => onNavigateTab('fleet')} />

      {/* 4 Core KPI Cards */}
      <section aria-labelledby="core-metrics-heading">
        <div className="flex items-center justify-between mb-3">
          <h2 id="core-metrics-heading" className="text-xs font-bold text-slate-400 uppercase tracking-wider font-mono">
            Core Fleet Transformation Metrics
          </h2>
          <span className="text-[11px] text-slate-400 font-sans">
            Hover <span className="font-mono text-slate-300">ⓘ</span> icon on any card for source provenance
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* KPI 1: Aircraft Upgraded */}
          <StatCard
            title="Aircraft Upgraded"
            value={`${FLEET_SUMMARY.totalCompletedRetrofits}`}
            subtitle="74 completed widebodies in active service"
            icon={CheckCircle2}
            accentColor="red"
            sourceMeta={METRIC_SOURCES.completedCount}
            trend={{
              value: '+14 units',
              isPositive: true,
              label: 'vs previous quarter'
            }}
            onClick={() => onNavigateTab('fleet')}
          />

          {/* KPI 2: Programme Progress */}
          <StatCard
            title="Programme Progress"
            value="38.7%"
            subtitle="Targeting 191 total widebody aircraft"
            icon={Plane}
            accentColor="emerald"
            sourceMeta={METRIC_SOURCES.totalTarget}
            trend={{
              value: '191 units',
              isPositive: true,
              label: 'total modernization scope'
            }}
            onClick={() => onNavigateTab('progress')}
          />

          {/* KPI 3: Aircraft Types Tracked */}
          <StatCard
            title="Aircraft Types Tracked"
            value="4 Variants"
            subtitle="A380-800, B777-300ER, B777-200LR, A350"
            icon={Layers}
            accentColor="blue"
            sourceMeta={METRIC_SOURCES.aircraftTypesTracked}
            trend={{
              value: '110 A380 / 81 B777',
              isPositive: true,
              label: 'widebody scope'
            }}
            onClick={() => onNavigateTab('fleet')}
          />

          {/* KPI 4: Product Configurations */}
          <StatCard
            title="Product Configurations"
            value="4 Classes"
            subtitle="First, 1-2-1 Business, Premium Econ, Econ"
            icon={Armchair}
            accentColor="gold"
            sourceMeta={METRIC_SOURCES.cabinConfigPE}
            trend={{
              value: '3,264+ PE Seats',
              isPositive: true,
              label: 'fitted across fleet'
            }}
            onClick={() => onNavigateTab('cabin')}
          />
        </div>
      </section>

      {/* Main Visualizations Grid */}
      <section aria-labelledby="fleet-trajectory-heading">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <RetrofitTrajectoryChart />
          </div>
          <div>
            <FleetCompositionCard />
          </div>
        </div>
      </section>

      {/* Milestones & Strategic Insights */}
      <section aria-labelledby="milestones-insights-heading">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <MilestoneTimeline />
          <ExecutiveInsight />
        </div>
      </section>

      {/* Dedicated Data Provenance & Methodology Architecture */}
      <section aria-labelledby="data-methodology-heading">
        <DataMethodologyCard />
      </section>
    </div>
  );
};
