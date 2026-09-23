import React, { useEffect, useState } from 'react';
import { Search, ShieldAlert, Clock, Menu, X, Plane } from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onOpenMobileMenu: () => void;
  isMobileMenuOpen: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  searchQuery,
  onSearchChange,
  onOpenMobileMenu,
  isMobileMenuOpen
}) => {
  const [dubaiTime, setDubaiTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Dubai',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      };
      setDubaiTime(new Intl.DateTimeFormat('en-GB', options).format(now));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="sticky top-0 z-30 w-full bg-navy-950/95 backdrop-blur border-b border-navy-700/60 px-4 lg:px-8 py-3 transition-all">
      <div className="flex items-center justify-between gap-4 max-w-7xl mx-auto">
        {/* Left: Mobile Menu & Project Brand */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenMobileMenu}
            className="lg:hidden p-2 rounded-lg bg-navy-900 text-slate-300 hover:text-white border border-navy-700 focus:outline-none focus:ring-1 focus:ring-emirates-red"
            aria-label="Toggle Navigation Menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emirates-red flex items-center justify-center border border-emirates-crimson/50 shrink-0">
              <Plane className="w-4 h-4 text-white transform -rotate-45" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-display font-bold text-sm sm:text-base tracking-tight text-white">
                  Emirates Fleet Intelligence
                </span>
                <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-amber-500/10 text-amber-300 border border-amber-500/25 uppercase tracking-wider">
                  Independent Prototype
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-sans hidden md:block">
                Elevate Internship Portfolio • Strategy, Data & Tech Track
              </p>
            </div>
          </div>
        </div>

        {/* Center: Quick Search Bar */}
        <div className="hidden md:flex items-center flex-1 max-w-sm mx-4">
          <div className="relative w-full">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search tail (e.g. A6-EQH), aircraft, route..."
              className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-navy-900 border border-navy-700/80 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emirates-red focus:ring-1 focus:ring-emirates-red font-sans"
            />
          </div>
        </div>

        {/* Right: Dubai Live Clock & Meta Badges */}
        <div className="flex items-center gap-2.5">
          <div className="hidden lg:flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-navy-900 border border-navy-700/70 text-xs text-slate-300">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            <span className="font-mono text-[11px] text-slate-400">DXB:</span>
            <span className="font-mono text-[11px] text-slate-200 font-medium">{dubaiTime || 'Loading...'}</span>
          </div>

          <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-navy-900 border border-navy-700/70 text-[11px] text-slate-400" title="Non-proprietary dataset based on public announcements">
            <ShieldAlert className="w-3.5 h-3.5 text-slate-400" />
            <span className="hidden xl:inline">Public Data Source</span>
            <span className="xl:hidden">Public</span>
          </div>
        </div>
      </div>
    </header>
  );
};
