import React, { useEffect } from 'react';
import type { AircraftRecord } from '../../types';
import { StatusBadge, ModelBadge } from '../ui/Badge';
import { CabinLayoutVisualizer } from './CabinLayoutVisualizer';
import { 
  X, 
  MapPin, 
  Plane, 
  Wrench, 
  Info, 
  ShieldCheck, 
  Database,
  Wifi,
  Tv,
  CheckCircle2,
  XCircle,
  Sparkles,
  Layers
} from 'lucide-react';

interface AircraftModalProps {
  aircraft: AircraftRecord | null;
  onClose: () => void;
}

export const AircraftModal: React.FC<AircraftModalProps> = ({ aircraft, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!aircraft) return null;

  const isPublic = aircraft.dataSource === 'Public Emirates information';

  // Product Checklist Model
  const productChecklist = [
    {
      id: 'refreshed-cabin',
      name: 'Refreshed Cabin Interior',
      isAvailable: aircraft.refreshedCabinAvailable,
      detail: aircraft.refreshedCabinAvailable
        ? 'Ghaf tree signature artwork, mood lighting & refreshed champagne wood veneer'
        : 'Legacy interior specification awaiting modernization cycle'
    },
    {
      id: 'premium-economy',
      name: 'Signature Premium Economy',
      isAvailable: aircraft.premiumEconomyAvailable,
      detail: aircraft.premiumEconomyAvailable
        ? `${aircraft.cabinConfig.premiumEconomySeats} cream leather cradle seats with 40" pitch & calf rests`
        : 'Not fitted on this airframe configuration'
    },
    {
      id: 'business-layout',
      name: '1-2-1 Direct Aisle Business Class',
      isAvailable: aircraft.cabinConfig.businessLayout === '1-2-1',
      detail: aircraft.cabinConfig.businessLayout === '1-2-1'
        ? 'All-aisle access lie-flat business seats (No 2-3-2 middle seats)'
        : `Legacy ${aircraft.cabinConfig.businessLayout} Business layout`
    },
    {
      id: 'ice-entertainment',
      name: 'Next-Gen ice Inflight Entertainment',
      isAvailable: aircraft.retrofitStatus === 'completed' || aircraft.aircraftType === 'A350-900',
      detail: aircraft.entertainmentProduct
    },
    {
      id: 'satellite-connectivity',
      name: 'High-Speed Broadband Wi-Fi',
      isAvailable: aircraft.connectivityAvailable.toLowerCase().includes('broadband') || aircraft.connectivityAvailable.toLowerCase().includes('ka-band') || aircraft.connectivityAvailable.toLowerCase().includes('gx'),
      detail: aircraft.connectivityAvailable
    },
    {
      id: 'first-suites',
      name: 'Private First Class Suites',
      isAvailable: aircraft.cabinConfig.firstClassSeats > 0,
      detail: aircraft.cabinConfig.firstClassSeats > 0
        ? `${aircraft.cabinConfig.firstClassSeats} Private suites with fully flat beds and personal minibar`
        : '2-Class / 3-Class configuration without First Class cabin'
    },
    {
      id: 'shower-lounge',
      name: 'Onboard Shower Spa & Lounge Bar',
      isAvailable: !!(aircraft.cabinConfig.hasShowerSpa || aircraft.cabinConfig.hasOnboardLounge),
      detail: aircraft.cabinConfig.hasShowerSpa
        ? 'A380 Upper Deck Shower Spa and Onboard Lounge cocktail bar access'
        : 'Standard widebody amenities footprint'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-3xl bg-navy-900 border border-navy-700/90 rounded-2xl shadow-2xl overflow-hidden z-10 my-6">
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 bg-navy-950 border-b border-navy-800">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-emirates-red/15 border border-emirates-red/30 flex items-center justify-center shadow-glow-red/20 shadow-sm">
              <Plane className="w-5 h-5 text-emirates-red" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-xl font-bold font-mono text-white tracking-wider">
                  {aircraft.registration}
                </h3>
                <ModelBadge model={aircraft.aircraftType} />
                <StatusBadge status={aircraft.retrofitStatus} size="sm" />
                {aircraft.isFourClass && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono bg-emirates-gold/15 text-emirates-gold border border-emirates-gold/30">
                    <Sparkles className="w-3 h-3" />
                    4-Class Fitted
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-400 font-sans mt-0.5">
                Family: <strong className="text-slate-200">{aircraft.aircraftFamily}</strong> • Delivered: {aircraft.deliveryYear} • Hub: {aircraft.hubBase} (Dubai)
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-navy-850 text-slate-400 hover:text-white border border-navy-700 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 max-h-[78vh] overflow-y-auto">
          {/* Data Provenance Banner */}
          <div className={`p-3.5 rounded-xl border flex items-start justify-between gap-3 text-xs ${
            isPublic 
              ? 'bg-emerald-950/25 border-emerald-500/35 text-emerald-300'
              : 'bg-amber-950/25 border-amber-500/35 text-amber-300'
          }`}>
            <div className="flex items-start gap-2.5">
              {isPublic ? (
                <ShieldCheck className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
              ) : (
                <Database className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
              )}
              <div>
                <div className="font-bold font-display flex items-center gap-2">
                  <span>{isPublic ? 'Publicly Documented Aircraft Record' : 'Synthetic Demonstration Airframe'}</span>
                </div>
                <p className="text-[11px] text-slate-300 mt-0.5 font-sans leading-snug">
                  {aircraft.dataSourceDetail}
                </p>
              </div>
            </div>
            <span className={`px-2.5 py-1 rounded text-[10px] font-mono uppercase tracking-wider font-bold shrink-0 border ${
              isPublic 
                ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30'
                : 'bg-amber-500/15 text-amber-300 border-amber-500/30'
            }`}>
              {isPublic ? 'Public Verified' : 'Demo / Simulated'}
            </span>
          </div>

          {/* Active Hangar Progress Bar (if in hangar) */}
          {aircraft.retrofitStatus === 'in_hangar' && (
            <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 space-y-2">
              <div className="flex items-center justify-between text-xs font-semibold text-amber-300">
                <span className="flex items-center gap-1.5 font-mono">
                  <Wrench className="w-4 h-4 text-amber-400 animate-spin" />
                  Active Hangar Teardown & Overhaul
                </span>
                <span className="font-mono text-sm">{aircraft.retrofitProgressPct || 45}% Completed</span>
              </div>
              <div className="w-full bg-navy-950 h-2.5 rounded-full overflow-hidden border border-navy-800">
                <div 
                  className="bg-amber-400 h-full rounded-full transition-all duration-500" 
                  style={{ width: `${aircraft.retrofitProgressPct || 45}%` }}
                />
              </div>
            </div>
          )}

          {/* Airframe & Telemetry Summary Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-navy-850 border border-navy-750">
              <span className="text-slate-400 block text-[10px] uppercase font-mono mb-1">Programme Batch</span>
              <span className="font-mono font-bold text-slate-200">
                {aircraft.retrofitBatch || 'Scheduled Queue'}
              </span>
            </div>

            <div className="p-3 rounded-xl bg-navy-850 border border-navy-750">
              <span className="text-slate-400 block text-[10px] uppercase font-mono mb-1">Hangar Turnaround</span>
              <span className="font-mono font-bold text-emerald-400">
                {aircraft.daysInHangar !== null && aircraft.daysInHangar !== undefined ? `${aircraft.daysInHangar} Days` : 'N/A'}
              </span>
            </div>

            <div className="p-3 rounded-xl bg-navy-850 border border-navy-750">
              <span className="text-slate-400 block text-[10px] uppercase font-mono mb-1">Total Capacity</span>
              <span className="font-mono font-bold text-white">
                {aircraft.cabinConfig.totalSeats} Seats
              </span>
            </div>

            <div className="p-3 rounded-xl bg-navy-850 border border-navy-750">
              <span className="text-slate-400 block text-[10px] uppercase font-mono mb-1">Last Telemetry</span>
              <span className="font-mono text-slate-300">
                {aircraft.lastUpdated}
              </span>
            </div>
          </div>

          {/* Cabin Layout Map Visualizer */}
          <CabinLayoutVisualizer aircraft={aircraft} />

          {/* Visual "Cabin & Product" Checklist */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between pb-2 border-b border-navy-800">
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider font-mono flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-emirates-gold" />
                Cabin & Product Modernization Checklist
              </h4>
              <span className="text-[11px] font-mono text-slate-400">
                {productChecklist.filter(p => p.isAvailable).length} / {productChecklist.length} Features Active
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
              {productChecklist.map((item) => (
                <div
                  key={item.id}
                  className={`p-3 rounded-xl border transition-all flex items-start gap-2.5 ${
                    item.isAvailable
                      ? 'bg-navy-850/80 border-navy-700/80'
                      : 'bg-navy-950/40 border-navy-800/50 opacity-60'
                  }`}
                >
                  <div className="mt-0.5 shrink-0">
                    {item.isAvailable ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <XCircle className="w-4 h-4 text-slate-500" />
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className={`text-xs font-bold font-display ${item.isAvailable ? 'text-white' : 'text-slate-400'}`}>
                        {item.name}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 leading-snug mt-0.5 font-sans">
                      {item.detail}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Inflight Entertainment & Connectivity Hardware Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3.5 rounded-xl bg-navy-900 border border-navy-750 flex items-start gap-3">
              <div className="p-2 rounded-lg bg-sky-500/10 text-sky-400 border border-sky-500/20 shrink-0">
                <Tv className="w-4 h-4" />
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-mono">Inflight Entertainment Suite</span>
                <span className="font-sans font-medium text-slate-200 text-xs mt-0.5 block">{aircraft.entertainmentProduct}</span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-navy-900 border border-navy-750 flex items-start gap-3">
              <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shrink-0">
                <Wifi className="w-4 h-4" />
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-mono">Satellite Connectivity</span>
                <span className="font-sans font-medium text-slate-200 text-xs mt-0.5 block">{aircraft.connectivityAvailable}</span>
              </div>
            </div>
          </div>

          {/* Primary Route Deployments */}
          <div>
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider font-mono mb-2 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-emirates-red" />
              Primary Network Deployments
            </h4>
            <div className="flex flex-wrap gap-2">
              {aircraft.primaryRoutes.map((route, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1.5 rounded-lg bg-navy-850 border border-navy-700 text-xs font-mono text-slate-200 flex items-center gap-1.5"
                >
                  <Plane className="w-3 h-3 text-slate-400" />
                  {route}
                </span>
              ))}
            </div>
          </div>

          {/* Technical Engineering Log */}
          {aircraft.notes && (
            <div className="p-3.5 rounded-xl bg-navy-950 border border-navy-800 text-xs text-slate-300">
              <div className="flex items-center gap-1.5 font-semibold text-slate-400 text-[11px] uppercase tracking-wider mb-1 font-mono">
                <Info className="w-3.5 h-3.5 text-slate-400" />
                Engineering Log & Operational Note
              </div>
              <p className="font-sans text-slate-300 leading-relaxed text-xs">
                {aircraft.notes}
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-navy-950 border-t border-navy-800 flex items-center justify-between text-xs text-slate-400">
          <span>Tail Registration: <strong className="text-white font-mono">{aircraft.registration}</strong></span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-navy-800 hover:bg-navy-700 text-white font-medium transition-colors"
          >
            Close Sheet
          </button>
        </div>
      </div>
    </div>
  );
};
