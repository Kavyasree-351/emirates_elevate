import React from 'react';
import type { AircraftRecord } from '../../types';
import { Bath, GlassWater } from 'lucide-react';

interface CabinLayoutVisualizerProps {
  aircraft: AircraftRecord;
}

export const CabinLayoutVisualizer: React.FC<CabinLayoutVisualizerProps> = ({ aircraft }) => {
  const { cabinConfig, aircraftType, isFourClass } = aircraft;
  const isA380 = aircraftType.includes('A380');

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider font-mono">
            Cabin Architecture & Seating Map ({cabinConfig.totalSeats} Total Seats)
          </h4>
          <p className="text-[11px] text-slate-400">
            {isFourClass ? '4-Class Refreshed Architecture (F / J / W / Y)' : '3-Class / 2-Class Configuration'}
          </p>
        </div>

        <div className="flex items-center gap-2">
          {cabinConfig.hasShowerSpa && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] bg-amber-500/10 text-amber-300 border border-amber-500/20">
              <Bath className="w-3 h-3" />
              Shower Spa
            </span>
          )}
          {cabinConfig.hasOnboardLounge && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] bg-purple-500/10 text-purple-300 border border-purple-500/20">
              <GlassWater className="w-3 h-3" />
              Onboard Lounge
            </span>
          )}
        </div>
      </div>

      {/* Visual Cabin Stack */}
      <div className="p-4 rounded-xl bg-navy-950 border border-navy-700 space-y-4">
        {/* A380 Upper Deck (if A380) */}
        {isA380 && (
          <div>
            <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mb-1.5">
              <span>Upper Deck — Premium Zone</span>
              <span>{cabinConfig.firstClassSeats + cabinConfig.businessClassSeats} Seats</span>
            </div>

            <div className="flex gap-1.5 p-2 rounded-lg bg-navy-900 border border-navy-800">
              {/* First Class block */}
              {cabinConfig.firstClassSeats > 0 && (
                <div 
                  className="bg-amber-500/20 border border-amber-500/40 p-2 rounded flex-1 flex flex-col justify-between text-center"
                  style={{ flex: cabinConfig.firstClassSeats }}
                >
                  <div className="text-[10px] font-bold text-amber-300 uppercase">First Class</div>
                  <div className="text-xs font-mono font-bold text-amber-200">{cabinConfig.firstClassSeats} Suites</div>
                  <div className="text-[9px] text-amber-400/80">Private 1-2-1</div>
                </div>
              )}

              {/* Business Class block */}
              <div 
                className="bg-sky-500/20 border border-sky-500/40 p-2 rounded flex-1 flex flex-col justify-between text-center"
                style={{ flex: cabinConfig.businessClassSeats }}
              >
                <div className="text-[10px] font-bold text-sky-300 uppercase">Business Class</div>
                <div className="text-xs font-mono font-bold text-sky-200">{cabinConfig.businessClassSeats} Seats</div>
                <div className="text-[9px] text-sky-400/80">Direct Aisle 1-2-1</div>
              </div>

              {/* Lounge block */}
              {cabinConfig.hasOnboardLounge && (
                <div className="bg-purple-500/20 border border-purple-500/40 px-2 py-1 rounded flex flex-col items-center justify-center text-center">
                  <GlassWater className="w-3.5 h-3.5 text-purple-300 mb-0.5" />
                  <span className="text-[9px] font-mono text-purple-300 font-semibold">Bar Lounge</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Main Deck */}
        <div>
          <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mb-1.5">
            <span>Main Deck {isA380 ? '' : '• Nose to Tail Layout'}</span>
            <span>
              {isA380 
                ? (cabinConfig.premiumEconomySeats + cabinConfig.economySeats) 
                : cabinConfig.totalSeats} Seats
            </span>
          </div>

          <div className="flex gap-1.5 p-2 rounded-lg bg-navy-900 border border-navy-800">
            {/* If Boeing 777: First Class at nose */}
            {!isA380 && cabinConfig.firstClassSeats > 0 && (
              <div 
                className="bg-amber-500/20 border border-amber-500/40 p-2 rounded flex flex-col justify-between text-center"
                style={{ flex: 15 }}
              >
                <div className="text-[9px] font-bold text-amber-300 uppercase">First</div>
                <div className="text-xs font-mono font-bold text-amber-200">{cabinConfig.firstClassSeats}</div>
                <div className="text-[8px] text-amber-400/80">Gamechanger</div>
              </div>
            )}

            {/* If Boeing 777: Business Class */}
            {!isA380 && (
              <div 
                className="bg-sky-500/20 border border-sky-500/40 p-2 rounded flex flex-col justify-between text-center"
                style={{ flex: 35 }}
              >
                <div className="text-[9px] font-bold text-sky-300 uppercase">Business</div>
                <div className="text-xs font-mono font-bold text-sky-200">{cabinConfig.businessClassSeats}</div>
                <div className="text-[8px] text-sky-400/80">Layout {cabinConfig.businessLayout}</div>
              </div>
            )}

            {/* Premium Economy block */}
            {cabinConfig.premiumEconomySeats > 0 ? (
              <div 
                className="bg-emirates-red/25 border border-emirates-red/50 p-2 rounded flex flex-col justify-between text-center relative overflow-hidden"
                style={{ flex: isA380 ? 30 : 25 }}
              >
                <div className="text-[9px] font-bold text-red-200 uppercase flex items-center justify-center gap-1">
                  <span>Prem Economy</span>
                </div>
                <div className="text-xs font-mono font-bold text-white">{cabinConfig.premiumEconomySeats} Seats</div>
                <div className="text-[8px] text-red-300">2-4-2 Cradle</div>
              </div>
            ) : null}

            {/* Economy Class block */}
            <div 
              className="bg-slate-700/30 border border-slate-600/40 p-2 rounded flex flex-col justify-between text-center"
              style={{ flex: isA380 ? 70 : 60 }}
            >
              <div className="text-[9px] font-bold text-slate-300 uppercase">Economy Class</div>
              <div className="text-xs font-mono font-bold text-slate-200">{cabinConfig.economySeats} Seats</div>
              <div className="text-[8px] text-slate-400">Ergonomic + ice 4K</div>
            </div>
          </div>
        </div>
      </div>

      {/* Seating Breakdown Pills */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 text-xs">
        <div className="p-2 rounded-lg bg-navy-900 border border-navy-800 flex items-center justify-between">
          <span className="text-amber-300 font-medium text-[11px]">First:</span>
          <span className="font-mono font-bold text-white">{cabinConfig.firstClassSeats}</span>
        </div>
        <div className="p-2 rounded-lg bg-navy-900 border border-navy-800 flex items-center justify-between">
          <span className="text-sky-300 font-medium text-[11px]">Business:</span>
          <span className="font-mono font-bold text-white">{cabinConfig.businessClassSeats}</span>
        </div>
        <div className="p-2 rounded-lg bg-navy-900 border border-navy-800 flex items-center justify-between">
          <span className="text-red-300 font-medium text-[11px]">Prem Economy:</span>
          <span className="font-mono font-bold text-white">{cabinConfig.premiumEconomySeats}</span>
        </div>
        <div className="p-2 rounded-lg bg-navy-900 border border-navy-800 flex items-center justify-between">
          <span className="text-slate-300 font-medium text-[11px]">Economy:</span>
          <span className="font-mono font-bold text-white">{cabinConfig.economySeats}</span>
        </div>
      </div>
    </div>
  );
};
