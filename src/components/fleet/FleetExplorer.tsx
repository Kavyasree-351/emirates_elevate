import React, { useState, useMemo } from 'react';
import { FLEET_RECORDS } from '../../data/fleetData';
import type { AircraftRecord } from '../../types';
import { StatusBadge, ModelBadge } from '../ui/Badge';
import { AircraftModal } from './AircraftModal';
import { 
  Search, 
  Plane, 
  ArrowUpDown, 
  ChevronRight, 
  Sparkles, 
  ShieldCheck, 
  Database,
  LayoutGrid,
  Table as TableIcon,
  Wifi,
  RotateCcw
} from 'lucide-react';

interface FleetExplorerProps {
  initialSearch?: string;
}

export const FleetExplorer: React.FC<FleetExplorerProps> = ({ initialSearch = '' }) => {
  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [selectedFamily, setSelectedFamily] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedProduct, setSelectedProduct] = useState<string>('all');
  const [selectedConnectivity, setSelectedConnectivity] = useState<string>('all');
  const [sourceFilter, setSourceFilter] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('grid');
  
  const [selectedAircraft, setSelectedAircraft] = useState<AircraftRecord | null>(null);
  const [sortField, setSortField] = useState<keyof AircraftRecord>('deliveryYear');
  const [sortAsc, setSortAsc] = useState<boolean>(false);

  // Filter and sort logic
  const filteredFleet = useMemo(() => {
    return FLEET_RECORDS.filter((ac) => {
      // 1. Search match
      const query = searchTerm.toLowerCase();
      const matchesSearch =
        ac.registration.toLowerCase().includes(query) ||
        ac.aircraftType.toLowerCase().includes(query) ||
        ac.aircraftFamily.toLowerCase().includes(query) ||
        (ac.notes && ac.notes.toLowerCase().includes(query)) ||
        ac.primaryRoutes.some(r => r.toLowerCase().includes(query)) ||
        ac.connectivityAvailable.toLowerCase().includes(query) ||
        ac.entertainmentProduct.toLowerCase().includes(query);

      // 2. Family filter
      const matchesFamily = selectedFamily === 'all' || ac.aircraftFamily === selectedFamily;

      // 3. Type filter
      const matchesType = selectedType === 'all' || ac.aircraftType === selectedType;

      // 4. Status filter
      const matchesStatus = selectedStatus === 'all' || ac.retrofitStatus === selectedStatus;

      // 5. Product filter
      let matchesProduct = true;
      if (selectedProduct === 'pe') {
        matchesProduct = ac.premiumEconomyAvailable;
      } else if (selectedProduct === 'refreshed_j') {
        matchesProduct = ac.cabinConfig.businessLayout === '1-2-1';
      } else if (selectedProduct === 'shower_lounge') {
        matchesProduct = !!(ac.cabinConfig.hasShowerSpa || ac.cabinConfig.hasOnboardLounge);
      } else if (selectedProduct === 'four_class') {
        matchesProduct = ac.isFourClass;
      }

      // 6. Connectivity filter
      let matchesConnectivity = true;
      if (selectedConnectivity === 'broadband') {
        matchesConnectivity = ac.connectivityAvailable.toLowerCase().includes('broadband') || ac.connectivityAvailable.toLowerCase().includes('ka-band') || ac.connectivityAvailable.toLowerCase().includes('gx');
      } else if (selectedConnectivity === 'livetv') {
        matchesConnectivity = ac.connectivityAvailable.toLowerCase().includes('live tv');
      }

      // 7. Source filter
      const matchesSource = 
        sourceFilter === 'all' || 
        (sourceFilter === 'public' && !ac.isSimulated) || 
        (sourceFilter === 'simulated' && ac.isSimulated);

      return (
        matchesSearch &&
        matchesFamily &&
        matchesType &&
        matchesStatus &&
        matchesProduct &&
        matchesConnectivity &&
        matchesSource
      );
    }).sort((a, b) => {
      if (sortField === 'isFourClass') {
        const valA = a.cabinConfig.premiumEconomySeats;
        const valB = b.cabinConfig.premiumEconomySeats;
        return sortAsc ? valA - valB : valB - valA;
      }

      let valA: any = a[sortField];
      let valB: any = b[sortField];

      if (valA === undefined || valA === null) return 1;
      if (valB === undefined || valB === null) return -1;

      if (typeof valA === 'string') {
        return sortAsc ? valA.localeCompare(valB) : valB.localeCompare(valA);
      }
      return sortAsc ? valA - valB : valB - valA;
    });
  }, [
    searchTerm,
    selectedFamily,
    selectedType,
    selectedStatus,
    selectedProduct,
    selectedConnectivity,
    sourceFilter,
    sortField,
    sortAsc
  ]);

  const handleSort = (field: keyof AircraftRecord) => {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(true);
    }
  };

  const resetFilters = () => {
    setSearchTerm('');
    setSelectedFamily('all');
    setSelectedType('all');
    setSelectedStatus('all');
    setSelectedProduct('all');
    setSelectedConnectivity('all');
    setSourceFilter('all');
  };

  // Aggregates for filter summary
  const totalPEUnits = filteredFleet.filter(ac => ac.premiumEconomyAvailable).length;
  const totalPublicUnits = filteredFleet.filter(ac => !ac.isSimulated).length;

  return (
    <div className="space-y-6">
      {/* Top Header & View Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl md:text-2xl font-bold font-display text-white flex items-center gap-2.5">
              <Plane className="w-6 h-6 text-emirates-red" />
              Fleet Explorer & Tail Intelligence
            </h2>
            <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-semibold bg-emirates-red/15 text-red-200 border border-emirates-red/30">
              Interactive Registry
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1 font-sans">
            Filter, inspect and analyze individual widebody airframes, cabin configurations, and data provenance
          </p>
        </div>

        {/* View Switcher & Counter */}
        <div className="flex items-center gap-3 self-start sm:self-auto">
          <div className="flex items-center p-1 rounded-lg bg-navy-900 border border-navy-700 text-xs">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-md transition-all flex items-center gap-1.5 ${
                viewMode === 'grid'
                  ? 'bg-emirates-red text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="Grid Cards View"
            >
              <LayoutGrid className="w-4 h-4" />
              <span className="text-xs font-medium hidden md:inline">Cards</span>
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded-md transition-all flex items-center gap-1.5 ${
                viewMode === 'table'
                  ? 'bg-emirates-red text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="Dense Table View"
            >
              <TableIcon className="w-4 h-4" />
              <span className="text-xs font-medium hidden md:inline">Table</span>
            </button>
          </div>

          <div className="flex items-center gap-1.5 text-xs font-mono text-slate-300 bg-navy-900 px-3 py-1.5 rounded-lg border border-navy-700">
            <span className="text-slate-400">Airframes:</span>
            <span className="font-bold text-white font-mono">{filteredFleet.length}</span>
            <span className="text-slate-500">/</span>
            <span>{FLEET_RECORDS.length}</span>
          </div>
        </div>
      </div>

      {/* Multi-Dimensional Enterprise Filter Panel */}
      <div className="glass-panel p-5 rounded-2xl border border-navy-700/70 space-y-4 shadow-lg">
        {/* Row 1: Search & Major Selectors */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Search Input */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search tail, route, or batch..."
              className="w-full pl-9 pr-3 py-2 rounded-xl bg-navy-900 border border-navy-750 text-xs text-slate-200 placeholder-slate-400 focus:outline-none focus:border-emirates-red focus:ring-1 focus:ring-emirates-red"
            />
          </div>

          {/* Aircraft Family Filter */}
          <div>
            <select
              value={selectedFamily}
              onChange={(e) => {
                setSelectedFamily(e.target.value);
                if (e.target.value !== 'all') setSelectedType('all');
              }}
              aria-label="Filter by Aircraft Family"
              className="w-full px-3 py-2 rounded-xl bg-navy-900 border border-navy-750 text-xs text-slate-200 focus:outline-none focus:border-emirates-red font-sans"
            >
              <option value="all">All Aircraft Families</option>
              <option value="Airbus A380">Airbus A380 Fleet</option>
              <option value="Boeing 777">Boeing 777 Fleet</option>
              <option value="Airbus A350">Airbus A350 Fleet</option>
            </select>
          </div>

          {/* Aircraft Type Filter */}
          <div>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              aria-label="Filter by Aircraft Subtype"
              className="w-full px-3 py-2 rounded-xl bg-navy-900 border border-navy-750 text-xs text-slate-200 focus:outline-none focus:border-emirates-red font-sans"
            >
              <option value="all">All Aircraft Types</option>
              <option value="A380-800">A380-800 (Superjumbo)</option>
              <option value="B777-300ER">Boeing 777-300ER</option>
              <option value="B777-200LR">Boeing 777-200LR</option>
              <option value="A350-900">Airbus A350-900</option>
            </select>
          </div>

          {/* Retrofit Status Filter */}
          <div>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              aria-label="Filter by Retrofit Status"
              className="w-full px-3 py-2 rounded-xl bg-navy-900 border border-navy-750 text-xs text-slate-200 focus:outline-none focus:border-emirates-red font-sans"
            >
              <option value="all">All Retrofit Statuses</option>
              <option value="completed">Retrofitted (In Active Service)</option>
              <option value="in_hangar">Active In Hangar (DXB Overhaul)</option>
              <option value="scheduled">Scheduled Queue (2025/26)</option>
              <option value="original">Original Baseline Configuration</option>
            </select>
          </div>
        </div>

        {/* Row 2: Deep Product, Connectivity & Provenance Filters */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-1 border-t border-navy-800/80">
          {/* Cabin Product Filter */}
          <div>
            <select
              value={selectedProduct}
              onChange={(e) => setSelectedProduct(e.target.value)}
              aria-label="Filter by Cabin Product"
              className="w-full px-3 py-2 rounded-xl bg-navy-900 border border-navy-750 text-xs text-slate-200 focus:outline-none focus:border-emirates-red font-sans"
            >
              <option value="all">All Cabin Products</option>
              <option value="pe">Signature Premium Economy Fitted</option>
              <option value="refreshed_j">1-2-1 Direct Aisle Business</option>
              <option value="shower_lounge">Shower Spa / Onboard Lounge</option>
              <option value="four_class">4-Class Complete Layout</option>
            </select>
          </div>

          {/* Connectivity Filter */}
          <div>
            <select
              value={selectedConnectivity}
              onChange={(e) => setSelectedConnectivity(e.target.value)}
              aria-label="Filter by Inflight Connectivity"
              className="w-full px-3 py-2 rounded-xl bg-navy-900 border border-navy-750 text-xs text-slate-200 focus:outline-none focus:border-emirates-red font-sans"
            >
              <option value="all">All Inflight Connectivity</option>
              <option value="broadband">Ka-band / Inmarsat GX Satellite Broadband</option>
              <option value="livetv">Live TV Enabled</option>
            </select>
          </div>

          {/* Provenance Filter */}
          <div>
            <select
              value={sourceFilter}
              onChange={(e) => setSourceFilter(e.target.value)}
              aria-label="Filter by Data Provenance"
              className="w-full px-3 py-2 rounded-xl bg-navy-900 border border-navy-750 text-xs text-slate-200 focus:outline-none focus:border-emirates-red font-mono"
            >
              <option value="all">All Data Provenance</option>
              <option value="public">Publicly Documented Tails Only</option>
              <option value="simulated">Synthetic / Demo Airframes</option>
            </select>
          </div>

          {/* Quick Reset & Sorting selector */}
          <div className="flex items-center gap-2">
            <div className="flex-1">
              <select
                value={sortField}
                onChange={(e) => setSortField(e.target.value as keyof AircraftRecord)}
                aria-label="Sort by attribute"
                className="w-full px-3 py-2 rounded-xl bg-navy-900 border border-navy-750 text-xs text-slate-200 focus:outline-none focus:border-emirates-red font-sans"
              >
                <option value="deliveryYear">Sort: Delivery Year</option>
                <option value="registration">Sort: Tail Registration</option>
                <option value="aircraftType">Sort: Aircraft Model</option>
                <option value="retrofitStatus">Sort: Retrofit Status</option>
                <option value="isFourClass">Sort: Premium Economy Capacity</option>
              </select>
            </div>

            <button
              onClick={resetFilters}
              className="p-2 rounded-xl bg-navy-850 hover:bg-navy-800 text-slate-400 hover:text-white border border-navy-750 transition-colors shrink-0"
              title="Reset all filters"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Dynamic Filter Insight Pills */}
        <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px] font-mono text-slate-400">
          <span className="text-slate-500">Active telemetry:</span>
          <span className="px-2 py-0.5 rounded bg-navy-800 text-slate-300 border border-navy-750">
            {totalPEUnits} PE-Equipped Widebodies
          </span>
          <span className="px-2 py-0.5 rounded bg-navy-800 text-emerald-300 border border-emerald-500/20">
            {totalPublicUnits} Publicly Verified Tails
          </span>
          <span className="px-2 py-0.5 rounded bg-navy-800 text-amber-300 border border-amber-500/20">
            {filteredFleet.length - totalPublicUnits} Calibrated Demo Airframes
          </span>
        </div>
      </div>

      {/* RENDER VIEW: 1. GRID CARDS VIEW */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredFleet.length === 0 ? (
            <div className="col-span-full glass-panel py-16 text-center text-slate-400 rounded-2xl">
              <Plane className="w-10 h-10 text-slate-600 mx-auto mb-3 animate-pulse" />
              <p className="text-sm font-bold text-slate-300 font-display">No widebodies matched the selected filters.</p>
              <p className="text-xs text-slate-500 mt-1">Try resetting the search keyword or broadening your parameters.</p>
              <button
                onClick={resetFilters}
                className="mt-4 px-4 py-1.5 rounded-lg bg-emirates-red text-white text-xs font-semibold hover:bg-emirates-crimson transition-all"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            filteredFleet.map((ac) => {
              const cfg = ac.cabinConfig;
              const isPublic = !ac.isSimulated;

              return (
                <div
                  key={ac.id}
                  onClick={() => setSelectedAircraft(ac)}
                  className="glass-panel p-5 rounded-2xl border border-navy-700/60 hover:border-navy-600 hover:bg-navy-850/80 transition-all duration-200 cursor-pointer group flex flex-col justify-between space-y-4 relative"
                >
                  {/* Card Header: Tail, Model, Status */}
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-lg font-bold font-mono text-white group-hover:text-emirates-red transition-colors">
                            {ac.registration}
                          </span>
                          <ModelBadge model={ac.aircraftType} />
                        </div>
                        <p className="text-[11px] text-slate-400 font-sans mt-0.5">
                          {ac.aircraftFamily} • Delivery: {ac.deliveryYear}
                        </p>
                      </div>

                      <StatusBadge status={ac.retrofitStatus} size="sm" />
                    </div>

                    {/* Provenance Tag */}
                    <div className="mt-2.5 flex items-center justify-between">
                      {isPublic ? (
                        <span className="inline-flex items-center gap-1 text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                          <ShieldCheck className="w-3 h-3" />
                          Public Verified
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[10px] font-mono text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                          <Database className="w-3 h-3" />
                          Demo Data
                        </span>
                      )}

                      {ac.isFourClass && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-mono text-emirates-gold">
                          <Sparkles className="w-3 h-3" />
                          4-Class PE
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Seat Density & Layout Specs */}
                  <div className="p-3 rounded-xl bg-navy-950/70 border border-navy-800 space-y-2">
                    <div className="flex justify-between items-center text-[11px] text-slate-300 font-mono">
                      <span>Seat Layout:</span>
                      <span className="font-bold text-white">
                        <span className="text-amber-300">{cfg.firstClassSeats}F</span> /{' '}
                        <span className="text-sky-300">{cfg.businessClassSeats}J</span> /{' '}
                        <span className={cfg.premiumEconomySeats > 0 ? 'text-red-300 font-bold' : 'text-slate-500'}>
                          {cfg.premiumEconomySeats}W
                        </span> /{' '}
                        <span className="text-slate-400">{cfg.economySeats}Y</span>
                      </span>
                    </div>

                    <div className="flex justify-between items-center text-[10px] text-slate-400">
                      <span>Business Config:</span>
                      <span className="font-mono text-slate-200 font-medium">
                        {cfg.businessLayout} {cfg.businessLayout === '1-2-1' ? '(Direct Aisle)' : '(Legacy)'}
                      </span>
                    </div>

                    {ac.daysInHangar !== null && ac.daysInHangar !== undefined ? (
                      <div className="flex justify-between items-center text-[10px] text-slate-400 pt-1 border-t border-navy-800">
                        <span>Hangar Turnaround:</span>
                        <span className="font-mono text-emerald-400 font-bold">{ac.daysInHangar} Days</span>
                      </div>
                    ) : ac.retrofitStatus === 'in_hangar' ? (
                      <div className="flex justify-between items-center text-[10px] text-amber-300 pt-1 border-t border-navy-800">
                        <span>Overhaul Progress:</span>
                        <span className="font-mono font-bold animate-pulse">{ac.retrofitProgressPct || 45}%</span>
                      </div>
                    ) : null}
                  </div>

                  {/* Connectivity & Routes */}
                  <div className="space-y-2 text-xs">
                    <div className="flex items-center gap-1.5 text-[11px] text-slate-300">
                      <Wifi className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span className="truncate">{ac.connectivityAvailable}</span>
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-navy-800">
                      <span className="truncate max-w-[170px] font-mono text-[10px]">
                        {ac.primaryRoutes.slice(0, 2).join(', ')}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedAircraft(ac);
                        }}
                        className="inline-flex items-center gap-1 text-slate-300 group-hover:text-emirates-red text-xs font-semibold transition-colors"
                      >
                        <span>Spec Sheet</span>
                        <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}

      {/* RENDER VIEW: 2. DENSE TABLE VIEW */}
      {viewMode === 'table' && (
        <div className="glass-panel rounded-2xl border border-navy-700/60 overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-navy-950/80 border-b border-navy-800 text-slate-400 font-mono text-[11px] uppercase tracking-wider">
                  <th className="py-3.5 px-4 font-semibold">
                    <button onClick={() => handleSort('registration')} className="flex items-center gap-1 hover:text-white">
                      Tail Reg <ArrowUpDown className="w-3 h-3" />
                    </button>
                  </th>
                  <th className="py-3.5 px-4 font-semibold">
                    <button onClick={() => handleSort('aircraftType')} className="flex items-center gap-1 hover:text-white">
                      Type <ArrowUpDown className="w-3 h-3" />
                    </button>
                  </th>
                  <th className="py-3.5 px-4 font-semibold">
                    <button onClick={() => handleSort('deliveryYear')} className="flex items-center gap-1 hover:text-white">
                      Delivered <ArrowUpDown className="w-3 h-3" />
                    </button>
                  </th>
                  <th className="py-3.5 px-4 font-semibold">Retrofit Status</th>
                  <th className="py-3.5 px-4 font-semibold">Seats (F/J/W/Y)</th>
                  <th className="py-3.5 px-4 font-semibold">Connectivity</th>
                  <th className="py-3.5 px-4 font-semibold">Last Updated</th>
                  <th className="py-3.5 px-4 font-semibold">Provenance</th>
                  <th className="py-3.5 px-4 font-semibold text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-navy-800/60">
                {filteredFleet.length === 0 ? (
                  <tr>
                    <td colSpan={9} className="py-12 text-center text-slate-400">
                      <Plane className="w-8 h-8 text-slate-600 mx-auto mb-2" />
                      No aircraft found matching the filter criteria.
                    </td>
                  </tr>
                ) : (
                  filteredFleet.map((ac) => {
                    const cfg = ac.cabinConfig;
                    const isPublic = !ac.isSimulated;
                    return (
                      <tr
                        key={ac.id}
                        onClick={() => setSelectedAircraft(ac)}
                        className="hover:bg-navy-850/70 transition-colors cursor-pointer group"
                      >
                        {/* Registration */}
                        <td className="py-3.5 px-4 font-mono font-bold text-white group-hover:text-emirates-red transition-colors">
                          {ac.registration}
                        </td>

                        {/* Model */}
                        <td className="py-3.5 px-4">
                          <ModelBadge model={ac.aircraftType} />
                        </td>

                        {/* Delivery */}
                        <td className="py-3.5 px-4 font-mono text-slate-300">
                          {ac.deliveryYear}
                        </td>

                        {/* Retrofit Status */}
                        <td className="py-3.5 px-4">
                          <StatusBadge status={ac.retrofitStatus} size="sm" />
                        </td>

                        {/* Seats Breakdown */}
                        <td className="py-3.5 px-4 font-mono text-[11px] text-slate-300">
                          <span className="text-amber-300">{cfg.firstClassSeats}</span> /{' '}
                          <span className="text-sky-300">{cfg.businessClassSeats}</span> /{' '}
                          <span className={cfg.premiumEconomySeats > 0 ? 'text-red-300 font-bold' : 'text-slate-500'}>
                            {cfg.premiumEconomySeats}
                          </span> /{' '}
                          <span className="text-slate-400">{cfg.economySeats}</span>
                        </td>

                        {/* Connectivity */}
                        <td className="py-3.5 px-4 text-[11px] text-slate-300 truncate max-w-[140px]">
                          {ac.connectivityAvailable}
                        </td>

                        {/* Last Updated */}
                        <td className="py-3.5 px-4 font-mono text-[11px] text-slate-400">
                          {ac.lastUpdated}
                        </td>

                        {/* Provenance */}
                        <td className="py-3.5 px-4">
                          {isPublic ? (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                              <ShieldCheck className="w-3 h-3" />
                              Public
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono bg-amber-500/10 text-amber-300 border border-amber-500/20">
                              <Database className="w-3 h-3" />
                              Demo
                            </span>
                          )}
                        </td>

                        {/* Action */}
                        <td className="py-3.5 px-4 text-right">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedAircraft(ac);
                            }}
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-navy-800 hover:bg-navy-700 text-slate-200 text-xs font-medium border border-navy-700 transition-colors"
                          >
                            <span>Spec</span>
                            <ChevronRight className="w-3 h-3 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Detailed Aircraft Modal */}
      <AircraftModal
        aircraft={selectedAircraft}
        onClose={() => setSelectedAircraft(null)}
      />
    </div>
  );
};
