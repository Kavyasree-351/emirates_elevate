import React from 'react';
import { 
  ShieldCheck, 
  Award, 
  Terminal, 
  Database, 
  Briefcase, 
  Code2, 
  CheckCircle2, 
  AlertCircle,
  FileText
} from 'lucide-react';

export const AboutView: React.FC = () => {
  return (
    <div className="space-y-8 max-w-5xl mx-auto animate-fadeIn">
      {/* Hero Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-navy-900 via-navy-850 to-navy-900 border border-navy-700 p-6 md:p-8">
        <div className="relative z-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emirates-red/15 border border-emirates-red/30 text-xs font-medium text-red-200">
            <Award className="w-3.5 h-3.5 text-emirates-red" />
            <span>Elevate Internship Portfolio Project</span>
          </div>

          <h2 className="text-2xl md:text-3xl font-bold font-display text-white">
            Data Methodology & Programme Context
          </h2>

          <p className="text-sm text-slate-300 leading-relaxed font-sans max-w-3xl">
            This application is an independent portfolio prototype created for the application to the{' '}
            <strong className="text-white">Emirates Group Elevate Internship (Strategy, Data & Technology track)</strong>.
            It demonstrates how rigorous data classification, strategic frameworks, and modern web engineering can model commercial aviation fleet modernisations with complete transparency.
          </p>
        </div>
      </div>

      {/* Mandatory Disclaimer & Ethics Statement */}
      <div className="p-5 rounded-xl bg-navy-900/90 border border-amber-500/40 flex items-start gap-4">
        <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20 shrink-0">
          <ShieldCheck className="w-5 h-5" />
        </div>
        <div className="space-y-1.5 text-xs">
          <h4 className="font-bold text-amber-200 text-sm font-display">
            Independent Portfolio Project & Provenance Statement
          </h4>
          <p className="text-slate-300 leading-relaxed font-sans">
            "This is an independent portfolio project inspired by publicly available information about Emirates' fleet transformation initiatives. It is not affiliated with, endorsed by, or developed for Emirates. The prototype does not use proprietary Emirates data. Where aircraft-level or operational data is unavailable publicly, synthetic data is used for demonstration."
          </p>
        </div>
      </div>

      {/* 1. DATA METHODOLOGY & PROVENANCE BREAKDOWN */}
      <div className="glass-panel p-6 rounded-2xl border border-navy-700/60 space-y-6">
        <div className="pb-3 border-b border-navy-800">
          <h3 className="text-base font-bold text-white font-display flex items-center gap-2">
            <Database className="w-4 h-4 text-emerald-400" />
            1. Data Architecture: Public Facts vs. Calibrated Demonstration Data
          </h3>
          <p className="text-xs text-slate-400 mt-1 font-sans">
            To ensure research integrity, every metric in this dashboard is systematically classified into one of two tiers:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Public Emirates Information */}
          <div className="p-5 rounded-xl bg-navy-900/80 border border-emerald-500/30 space-y-3">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-1 rounded-full text-xs font-mono font-bold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                Public Verified Information
              </span>
              <span className="text-[10px] font-mono text-slate-400">Press & Filings</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed font-sans">
              Metrics and parameters sourced directly from official Emirates press releases, media briefings, aircraft manufacturer delivery logs, and public fleet announcements:
            </p>
            <ul className="space-y-1.5 text-xs text-slate-300 font-sans list-disc list-inside">
              <li>Total target retrofit scope: <strong>191 widebody aircraft</strong> (110 A380s + 81 B777s).</li>
              <li>Lead aircraft in-service debuts: <code>A6-EVM</code> (A380 - Jan 2023) and <code>A6-EQH</code> (B777-300ER - Aug 2024).</li>
              <li>Seat counts: 56 Premium Economy on A380, 24 on B777.</li>
              <li>Cabin standards: 1-2-1 direct-aisle access Business Class on refurbished B777s.</li>
              <li>Base of operations: Emirates Engineering Centre at Dubai International Airport (DXB).</li>
            </ul>
          </div>

          {/* Synthetic Demonstration Data */}
          <div className="p-5 rounded-xl bg-navy-900/80 border border-navy-750 space-y-3">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-1 rounded-full text-xs font-mono font-bold bg-navy-800 text-slate-300 border border-navy-700 flex items-center gap-1.5">
                <AlertCircle className="w-3.5 h-3.5 text-slate-400" />
                Synthetic Demonstration Data
              </span>
              <span className="text-[10px] font-mono text-slate-400">Simulation Model</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed font-sans">
              Operational statistics generated specifically to enable rich user filtering, UI interactivity, and sensitivity simulations:
            </p>
            <ul className="space-y-1.5 text-xs text-slate-300 font-sans list-disc list-inside">
              <li>Individual aircraft maintenance entry/exit timestamps and days in hangar.</li>
              <li>Current active bay assignments (Bays 1–4 telemetry percentages).</li>
              <li>Hypothetical rollout additions (+5, +10, +25 units in Scenario Lab).</li>
              <li>Unannounced future airframe induction sequence ordering.</li>
            </ul>
          </div>
        </div>
      </div>

      {/* 2. ASSUMPTIONS & ANALYTICAL BOUNDARIES */}
      <div className="glass-panel p-6 rounded-2xl border border-navy-700/60 space-y-6">
        <div className="pb-3 border-b border-navy-800">
          <h3 className="text-base font-bold text-white font-display flex items-center gap-2">
            <FileText className="w-4 h-4 text-sky-400" />
            2. Assumptions & Analytical Scope
          </h3>
          <p className="text-xs text-slate-400 mt-1 font-sans">
            Clear guidelines on what this dashboard can conclude and what remains outside its analytical scope:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
          <div className="p-4 rounded-xl bg-navy-900 border border-navy-750 space-y-2">
            <h4 className="font-bold text-emerald-400 font-mono flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" />
              What This Dashboard CAN Conclude
            </h4>
            <ul className="space-y-1.5 text-slate-300 font-sans list-disc list-inside">
              <li>Fleet-wide trajectory velocity against the declared 191 aircraft milestone.</li>
              <li>Product penetration rates for Premium Economy and refreshed 1-2-1 Business Class.</li>
              <li>Sensitivity of programme completion timelines under varying hangar throughput rates.</li>
              <li>Subtype allocation between Airbus A380 and Boeing 777 conversion lines.</li>
            </ul>
          </div>

          <div className="p-4 rounded-xl bg-navy-900 border border-navy-750 space-y-2">
            <h4 className="font-bold text-amber-400 font-mono flex items-center gap-1.5">
              <AlertCircle className="w-4 h-4" />
              What This Dashboard CANNOT Conclude
            </h4>
            <ul className="space-y-1.5 text-slate-300 font-sans list-disc list-inside">
              <li>Real-time proprietary flight dispatch or daily maintenance scheduling decisions.</li>
              <li>Confidential supplier pricing, contract terms, or financial bill of materials.</li>
              <li>Unreleased proprietary route yields or internal customer satisfaction indices.</li>
              <li>Precise future hangar slot allocations for specific unannounced tail registrations.</li>
            </ul>
          </div>
        </div>
      </div>

      {/* 3. STRATEGIC INTERNSHIP TRACK PILLARS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="glass-panel p-5 rounded-xl border border-navy-700/60 space-y-3">
          <div className="w-9 h-9 rounded-lg bg-emirates-red/10 text-emirates-red border border-emirates-red/20 flex items-center justify-center">
            <Briefcase className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-white font-display">1. Strategic Thinking</h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            Framing fleet retrofits not just as an engineering task, but as commercial yield drivers, customer experience enhancements, and network fleet consistency levers.
          </p>
        </div>

        <div className="glass-panel p-5 rounded-xl border border-navy-700/60 space-y-3">
          <div className="w-9 h-9 rounded-lg bg-sky-500/10 text-sky-400 border border-sky-500/20 flex items-center justify-center">
            <Database className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-white font-display">2. Data Modeling & Insights</h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            Structuring multi-tiered schemas, modeling S-curve completion runways, tracking hangar turnaround maturation, and building sensitivity simulation engines.
          </p>
        </div>

        <div className="glass-panel p-5 rounded-xl border border-navy-700/60 space-y-3">
          <div className="w-9 h-9 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center">
            <Code2 className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-white font-display">3. Frontend Engineering</h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            Architecting with React 18, TypeScript 5, Vite, Tailwind CSS, and Recharts. Delivering an executive dark UI with zero dependencies bloat, responsive views, and sub-second performance.
          </p>
        </div>
      </div>

      {/* 4. TECHNICAL ARCHITECTURE SUMMARY */}
      <div className="glass-panel p-6 rounded-2xl border border-navy-700/60 space-y-4">
        <h3 className="text-base font-bold text-white font-display flex items-center gap-2">
          <Terminal className="w-4 h-4 text-emirates-gold" />
          4. Technical Architecture Specs
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div className="p-3 rounded-xl bg-navy-900 border border-navy-800">
            <span className="text-slate-400 text-[11px] block font-mono">Framework</span>
            <span className="font-bold text-white mt-1 block">React 18 + Vite 6</span>
          </div>
          <div className="p-3 rounded-xl bg-navy-900 border border-navy-800">
            <span className="text-slate-400 text-[11px] block font-mono">Language</span>
            <span className="font-bold text-white mt-1 block">TypeScript 5 (Strict)</span>
          </div>
          <div className="p-3 rounded-xl bg-navy-900 border border-navy-800">
            <span className="text-slate-400 text-[11px] block font-mono">Styling</span>
            <span className="font-bold text-white mt-1 block">Tailwind CSS 3.4</span>
          </div>
          <div className="p-3 rounded-xl bg-navy-900 border border-navy-800">
            <span className="text-slate-400 text-[11px] block font-mono">Charts & Icons</span>
            <span className="font-bold text-white mt-1 block">Recharts + Lucide</span>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-navy-950 border border-navy-800 text-xs text-slate-300 space-y-2">
          <div className="font-mono text-slate-400 uppercase text-[10px] tracking-wider">
            Architecture Highlights:
          </div>
          <ul className="space-y-1.5 list-disc list-inside text-slate-300">
            <li>Strict separation of concerns: Type definitions, static datasets, UI components, and scenario math.</li>
            <li>Tail-by-tail registration explorer with live memory filtering and multi-column sorting.</li>
            <li>Interactive sensitivity modeling engine for hangar capacity and family prioritization simulations.</li>
            <li>Zero server round-trips: Fast, deterministic client-side rendering suitable for executive demonstrations.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
