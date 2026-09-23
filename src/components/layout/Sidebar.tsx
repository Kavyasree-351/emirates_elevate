import React from 'react';
import { 
  LayoutDashboard, 
  Plane, 
  TrendingUp, 
  Layers, 
  Sliders,
  Info, 
  CheckCircle2,
  Hammer
} from 'lucide-react';
import { FLEET_SUMMARY } from '../../data/fleetData';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  isMobileOpen: boolean;
  onCloseMobile: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onTabChange,
  isMobileOpen,
  onCloseMobile
}) => {
  const navItems = [
    {
      id: 'overview',
      label: 'Overview',
      icon: LayoutDashboard,
      badge: 'Live',
    },
    {
      id: 'fleet',
      label: 'Fleet Explorer',
      icon: Plane,
      count: 'Registry',
    },
    {
      id: 'progress',
      label: 'Retrofit Progress',
      icon: TrendingUp,
      badge: 'Analytics',
    },
    {
      id: 'cabin',
      label: 'Product & Cabin',
      icon: Layers,
      count: '4 Classes',
    },
    {
      id: 'scenario',
      label: 'Scenario Lab',
      icon: Sliders,
      badge: 'Interactive',
    },
    {
      id: 'about',
      label: 'Data & Methodology',
      icon: Info,
      badge: 'Elevate',
    }
  ];

  const handleSelect = (id: string) => {
    onTabChange(id);
    onCloseMobile();
  };

  const completedPct = ((FLEET_SUMMARY.totalCompletedRetrofits / FLEET_SUMMARY.totalTargetAircraft) * 100).toFixed(1);

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 lg:hidden"
          onClick={onCloseMobile}
        />
      )}

      {/* Main Sidebar */}
      <aside className={`
        fixed top-[53px] bottom-0 left-0 z-40 w-64 bg-navy-950 border-r border-navy-700/60 flex flex-col justify-between transition-transform duration-200 ease-in-out lg:translate-x-0 lg:static lg:top-0
        ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        {/* Navigation list */}
        <div className="p-4 space-y-5 overflow-y-auto">
          <div>
            <p className="px-3 text-[11px] font-semibold text-slate-400 uppercase tracking-wider font-mono">
              Programme Intelligence
            </p>
            <nav className="mt-2.5 space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleSelect(item.id)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all group ${
                      isActive
                        ? 'bg-navy-850 text-white border border-navy-700 shadow-sm border-l-2 border-l-emirates-red'
                        : 'text-slate-400 hover:text-white hover:bg-navy-900 border border-transparent'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className={`w-4 h-4 transition-colors ${
                        isActive ? 'text-emirates-red' : 'text-slate-500 group-hover:text-slate-300'
                      }`} />
                      <span>{item.label}</span>
                    </div>

                    {item.badge && (
                      <span className={`text-[10px] px-1.5 py-0.5 rounded font-mono ${
                        isActive 
                          ? 'bg-emirates-red/20 text-red-200 font-semibold' 
                          : 'bg-navy-900 text-slate-500 group-hover:text-slate-400'
                      }`}>
                        {item.badge}
                      </span>
                    )}
                    {item.count && !item.badge && (
                      <span className="text-[10px] text-slate-500 font-mono">
                        {item.count}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Quick Hangar Status Box */}
          <div className="p-3 rounded-xl bg-navy-900 border border-navy-700/60 text-xs">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5 font-mono">
                <Hammer className="w-3.5 h-3.5 text-amber-400" />
                DXB Hangar Status
              </span>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">
                4 Active Bays
              </span>
            </div>
            <div className="space-y-1.5 text-[11px] text-slate-400">
              <div className="flex justify-between items-center">
                <span>Bay 1 (A380):</span>
                <span className="font-mono text-slate-200">A6-EOU (28%)</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Bay 2 (A380):</span>
                <span className="font-mono text-slate-200">A6-EOT (88%)</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Bay 3 (B777):</span>
                <span className="font-mono text-slate-200">A6-EQP (15%)</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Bay 4 (B777):</span>
                <span className="font-mono text-slate-200">A6-EQO (62%)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom target completion gauge & internship banner */}
        <div className="p-4 border-t border-navy-800/80 bg-navy-950">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400 text-[11px] font-mono">Programme Target</span>
              <span className="text-white font-mono font-bold text-xs">{completedPct}%</span>
            </div>
            
            {/* Progress Bar */}
            <div className="w-full bg-navy-900 h-1.5 rounded-full overflow-hidden border border-navy-800">
              <div 
                className="bg-emirates-red h-full rounded-full transition-all duration-700"
                style={{ width: `${completedPct}%` }}
              />
            </div>

            <div className="flex justify-between items-center text-[10px] text-slate-500 font-mono">
              <span>{FLEET_SUMMARY.totalCompletedRetrofits} Done</span>
              <span>{FLEET_SUMMARY.totalTargetAircraft} Target</span>
            </div>
          </div>

          <div className="mt-3.5 pt-3 border-t border-navy-800/80 text-[10px] text-slate-400 flex items-center gap-1.5 font-sans">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span>Elevate Strategy & Tech Track</span>
          </div>
        </div>
      </aside>
    </>
  );
};
