import type { QuarterlyTrend, RouteDeployment } from '../types';

export const QUARTERLY_TRENDS: QuarterlyTrend[] = [
  {
    quarter: 'Q4 2022',
    a380Completed: 1,
    b777Completed: 0,
    cumulativeTotal: 1,
    targetCumulative: 1,
    hangarAvgDays: 45,
    isProjected: false,
    dataSource: 'Public Emirates information'
  },
  {
    quarter: 'Q1 2023',
    a380Completed: 4,
    b777Completed: 0,
    cumulativeTotal: 5,
    targetCumulative: 6,
    hangarAvgDays: 27,
    isProjected: false,
    dataSource: 'Synthetic demonstration data'
  },
  {
    quarter: 'Q2 2023',
    a380Completed: 5,
    b777Completed: 0,
    cumulativeTotal: 10,
    targetCumulative: 12,
    hangarAvgDays: 21,
    isProjected: false,
    dataSource: 'Synthetic demonstration data'
  },
  {
    quarter: 'Q3 2023',
    a380Completed: 6,
    b777Completed: 0,
    cumulativeTotal: 16,
    targetCumulative: 18,
    hangarAvgDays: 20,
    isProjected: false,
    dataSource: 'Synthetic demonstration data'
  },
  {
    quarter: 'Q4 2023',
    a380Completed: 7,
    b777Completed: 0,
    cumulativeTotal: 23,
    targetCumulative: 25,
    hangarAvgDays: 20,
    isProjected: false,
    dataSource: 'Synthetic demonstration data'
  },
  {
    quarter: 'Q1 2024',
    a380Completed: 8,
    b777Completed: 0,
    cumulativeTotal: 31,
    targetCumulative: 32,
    hangarAvgDays: 19.5,
    isProjected: false,
    dataSource: 'Synthetic demonstration data'
  },
  {
    quarter: 'Q2 2024',
    a380Completed: 7,
    b777Completed: 2,
    cumulativeTotal: 40,
    targetCumulative: 41,
    hangarAvgDays: 28,
    isProjected: false,
    dataSource: 'Synthetic demonstration data'
  },
  {
    quarter: 'Q3 2024',
    a380Completed: 5,
    b777Completed: 4,
    cumulativeTotal: 49,
    targetCumulative: 50,
    hangarAvgDays: 24,
    isProjected: false,
    dataSource: 'Public Emirates information'
  },
  {
    quarter: 'Q4 2024',
    a380Completed: 6,
    b777Completed: 6,
    cumulativeTotal: 61,
    targetCumulative: 62,
    hangarAvgDays: 22,
    isProjected: false,
    dataSource: 'Synthetic demonstration data'
  },
  {
    quarter: 'Q1 2025 (Demo)',
    a380Completed: 7,
    b777Completed: 6,
    cumulativeTotal: 74,
    targetCumulative: 75,
    hangarAvgDays: 21.2,
    isProjected: false,
    dataSource: 'Synthetic demonstration data'
  },
  {
    quarter: 'Q2 2025 (Proj)',
    a380Completed: 8,
    b777Completed: 8,
    cumulativeTotal: 90,
    targetCumulative: 90,
    hangarAvgDays: 20.5,
    isProjected: true,
    dataSource: 'Synthetic demonstration data'
  },
  {
    quarter: 'Q3 2025 (Proj)',
    a380Completed: 8,
    b777Completed: 9,
    cumulativeTotal: 107,
    targetCumulative: 105,
    hangarAvgDays: 20.0,
    isProjected: true,
    dataSource: 'Synthetic demonstration data'
  },
  {
    quarter: 'Q4 2025 (Proj)',
    a380Completed: 9,
    b777Completed: 9,
    cumulativeTotal: 125,
    targetCumulative: 120,
    hangarAvgDays: 19.8,
    isProjected: true,
    dataSource: 'Synthetic demonstration data'
  }
];

export const ROUTE_DEPLOYMENTS: RouteDeployment[] = [
  {
    destination: 'London Heathrow',
    iata: 'LHR',
    country: 'United Kingdom',
    region: 'Europe',
    dailyFrequencies: 6,
    aircraftTypes: ['A380-800', 'B777-300ER'],
    premiumEconomyAvailable: true,
    dataSource: 'Public Emirates information',
    sourceCitation: 'Publicly confirmed 4-class scheduled route'
  },
  {
    destination: 'New York JFK',
    iata: 'JFK',
    country: 'United States',
    region: 'North America',
    dailyFrequencies: 3,
    aircraftTypes: ['A380-800'],
    premiumEconomyAvailable: true,
    dataSource: 'Public Emirates information',
    sourceCitation: 'Publicly confirmed 4-class scheduled route'
  },
  {
    destination: 'Geneva',
    iata: 'GVA',
    country: 'Switzerland',
    region: 'Europe',
    dailyFrequencies: 2,
    aircraftTypes: ['B777-300ER'],
    premiumEconomyAvailable: true,
    dataSource: 'Public Emirates information',
    sourceCitation: 'Debuted first refurbished B777 (EK83) Aug 2024'
  },
  {
    destination: 'Tokyo Haneda',
    iata: 'HND',
    country: 'Japan',
    region: 'Asia Pacific',
    dailyFrequencies: 1,
    aircraftTypes: ['B777-300ER', 'A380-800'],
    premiumEconomyAvailable: true,
    dataSource: 'Public Emirates information',
    sourceCitation: 'Publicly confirmed retrofitted B777 route'
  },
  {
    destination: 'Sydney Kingsford Smith',
    iata: 'SYD',
    country: 'Australia',
    region: 'Australasia',
    dailyFrequencies: 3,
    aircraftTypes: ['A380-800'],
    premiumEconomyAvailable: true,
    dataSource: 'Public Emirates information',
    sourceCitation: 'Flagship Premium Economy route'
  },
  {
    destination: 'Paris Charles de Gaulle',
    iata: 'CDG',
    country: 'France',
    region: 'Europe',
    dailyFrequencies: 3,
    aircraftTypes: ['A380-800'],
    premiumEconomyAvailable: true,
    dataSource: 'Public Emirates information',
    sourceCitation: 'Publicly confirmed 4-class scheduled route'
  },
  {
    destination: 'Zurich',
    iata: 'ZRH',
    country: 'Switzerland',
    region: 'Europe',
    dailyFrequencies: 2,
    aircraftTypes: ['B777-300ER', 'A380-800'],
    premiumEconomyAvailable: true,
    dataSource: 'Public Emirates information',
    sourceCitation: 'Confirmed retrofitted B777 route'
  },
  {
    destination: 'Singapore Changi',
    iata: 'SIN',
    country: 'Singapore',
    region: 'Asia Pacific',
    dailyFrequencies: 4,
    aircraftTypes: ['A380-800'],
    premiumEconomyAvailable: true,
    dataSource: 'Public Emirates information',
    sourceCitation: 'Publicly confirmed 4-class scheduled route'
  },
  {
    destination: 'Mumbai Chhatrapati Shivaji',
    iata: 'BOM',
    country: 'India',
    region: 'Asia Pacific',
    dailyFrequencies: 5,
    aircraftTypes: ['B777-300ER', 'A380-800'],
    premiumEconomyAvailable: true,
    dataSource: 'Public Emirates information',
    sourceCitation: 'Confirmed 4-class service route'
  },
  {
    destination: 'Los Angeles',
    iata: 'LAX',
    country: 'United States',
    region: 'North America',
    dailyFrequencies: 2,
    aircraftTypes: ['A380-800'],
    premiumEconomyAvailable: true,
    dataSource: 'Public Emirates information',
    sourceCitation: 'Publicly confirmed 4-class scheduled route'
  },
  {
    destination: 'Auckland',
    iata: 'AKL',
    country: 'New Zealand',
    region: 'Australasia',
    dailyFrequencies: 1,
    aircraftTypes: ['A380-800'],
    premiumEconomyAvailable: true,
    dataSource: 'Public Emirates information',
    sourceCitation: 'Direct A380 4-class route'
  },
  {
    destination: 'Edinburgh',
    iata: 'EDI',
    country: 'United Kingdom',
    region: 'Europe',
    dailyFrequencies: 1,
    aircraftTypes: ['A350-900'],
    premiumEconomyAvailable: true,
    dataSource: 'Public Emirates information',
    sourceCitation: 'New Airbus A350 scheduled launch destination'
  }
];
