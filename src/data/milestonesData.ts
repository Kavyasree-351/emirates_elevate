import type { RetrofitMilestone } from '../types';

export const RETROFIT_MILESTONES: RetrofitMilestone[] = [
  {
    id: 'm-1',
    date: 'November 2022',
    title: 'Programme Inception & Hangar Dedication',
    description: 'Emirates officially commissions dedicated bays at Emirates Engineering DXB for the largest known fleet retrofit in commercial aviation history.',
    category: 'milestone',
    aircraftCountReached: 1,
    tag: 'Foundation',
    highlight: false,
    dataSource: 'Public Emirates information',
    sourceCitation: 'Emirates Engineering Press Release (Nov 2022)'
  },
  {
    id: 'm-2',
    date: 'January 2023',
    title: 'First Retrofitted A380 Enters Service',
    description: 'A6-EVM re-enters scheduled commercial operations deployed on the flagship Dubai to London Heathrow (LHR) corridor, debuting the 4-class configuration with 56 Premium Economy seats.',
    category: 'fleet',
    aircraftCountReached: 1,
    tag: 'A380 Service',
    highlight: false,
    dataSource: 'Public Emirates information',
    sourceCitation: 'Emirates Operational Announcement (6 Jan 2023, Flight EK003)'
  },
  {
    id: 'm-3',
    date: 'August 2023',
    title: 'Programme Scope Expanded to 191 Aircraft',
    description: 'Emirates announces an additional multi-billion dollar commitment, expanding the total retrofit target from 120 to 191 aircraft (110 Airbus A380s and 81 Boeing 777s).',
    category: 'milestone',
    aircraftCountReached: 16,
    tag: 'Strategic Scale',
    highlight: true,
    dataSource: 'Public Emirates information',
    sourceCitation: 'Emirates Official Fleet Programme Expansion Statement'
  },
  {
    id: 'm-4',
    date: 'May 2024',
    title: 'First Boeing 777 Enters Refurbishment Hangar',
    description: 'Engineering teams commence the 37-day structural and cabin teardown of Boeing 777-300ER (A6-EQH), introducing the new 1-2-1 Business Class and 24 Premium Economy seats.',
    category: 'fleet',
    aircraftCountReached: 38,
    tag: 'B777 Overhaul',
    highlight: false,
    dataSource: 'Public Emirates information',
    sourceCitation: 'Emirates Engineering Operational Update (May 2024)'
  },
  {
    id: 'm-5',
    date: 'August 2024',
    title: 'Inaugural Refurbished B777 Geneva Flight',
    description: 'Flight EK83 to Geneva marks the operational commercial debut of the retrofitted Boeing 777 (A6-EQH) with all-aisle-access Business Class.',
    category: 'network',
    aircraftCountReached: 44,
    tag: 'Network Debut',
    highlight: false,
    dataSource: 'Public Emirates information',
    sourceCitation: 'Emirates Commercial Launch (7 Aug 2024, Flight EK83)'
  },
  {
    id: 'm-6',
    date: 'November 2024',
    title: '50th Modernized Aircraft Milestone',
    description: 'Emirates Engineering completes its 50th full aircraft conversion ahead of schedule, with average turnaround velocity down to 21.4 days per A380.',
    category: 'milestone',
    aircraftCountReached: 50,
    tag: 'Key Milestone',
    highlight: true,
    dataSource: 'Public Emirates information',
    sourceCitation: 'Emirates 50th Retrofit Completion Release (Nov 2024)'
  },
  {
    id: 'm-7',
    date: 'April 2025',
    title: 'Global Premium Economy Network Expansion',
    description: 'Over 45 global gateways across the Americas, Europe, East Asia, and Australasia now feature regular scheduled 4-class retrofitted widebody service.',
    category: 'network',
    aircraftCountReached: 74,
    tag: 'Market Yield',
    highlight: false,
    dataSource: 'Synthetic demonstration data',
    sourceCitation: 'Elevate Portfolio Network Model Projection'
  },
  {
    id: 'm-8',
    date: 'Late 2025 - 2026 (Target)',
    title: 'Phase 2 Scale & Full Fleet Homogeneity',
    description: 'Targeted delivery pace of 4 to 5 completed aircraft per month, driving total retrofitted widebodies past 120 units toward full programme completion.',
    category: 'product',
    aircraftCountReached: 120,
    tag: 'Programme Target',
    highlight: true,
    dataSource: 'Synthetic demonstration data',
    sourceCitation: 'S-Curve Run Rate Predictive Model'
  }
];
