export type AircraftFamily = 'Airbus A380' | 'Boeing 777' | 'Airbus A350';

export type AircraftModel = 'A380-800' | 'B777-300ER' | 'B777-200LR' | 'A350-900';

export type RetrofitStatus = 'completed' | 'in_hangar' | 'scheduled' | 'original';

export type CabinTier = 'First' | 'Business' | 'Premium Economy' | 'Economy';

export interface CabinConfiguration {
  firstClassSeats: number;
  businessClassSeats: number;
  premiumEconomySeats: number;
  economySeats: number;
  totalSeats: number;
  businessLayout: '1-2-1' | '2-3-2' | '2-2-2';
  premiumEconomyLayout?: '2-4-2' | '2-3-2';
  hasShowerSpa?: boolean;
  hasOnboardLounge?: boolean;
}

export type DataSourceType = 'Public Emirates information' | 'Synthetic demonstration data';

export interface ProductChecklistItem {
  name: string;
  isAvailable: boolean;
  category: 'cabin' | 'comfort' | 'technology' | 'dining';
  detail: string;
}

export interface AircraftRecord {
  id: string;
  registration: string; // e.g. A6-EQH
  aircraftFamily: AircraftFamily;
  aircraftType: AircraftModel;
  deliveryYear: number;
  retrofitStatus: RetrofitStatus;
  retrofitBatch?: string;
  retrofitCompletionDate?: string | null;
  hangarEntryDate?: string | null;
  daysInHangar?: number | null;
  cabinConfig: CabinConfiguration;
  isFourClass: boolean;
  premiumEconomyAvailable: boolean;
  refreshedCabinAvailable: boolean;
  entertainmentProduct: string;
  connectivityAvailable: string;
  lastUpdated: string;
  dataSource: DataSourceType;
  dataSourceDetail: string;
  isSimulated: boolean;
  primaryRoutes: string[];
  notes?: string;
  retrofitProgressPct?: number;
  hubBase: string; // "DXB"
}

export interface MetricSourceMeta {
  metricKey: string;
  label: string;
  value: string | number;
  sourceType: DataSourceType;
  sourceReference: string;
  notes: string;
  isSimulated: boolean;
}

export interface RetrofitMilestone {
  id: string;
  date: string;
  title: string;
  description: string;
  category: 'fleet' | 'product' | 'network' | 'milestone';
  aircraftCountReached?: number;
  highlight?: boolean;
  tag: string;
  dataSource: DataSourceType;
  sourceCitation: string;
}

export interface CabinSpecItem {
  classTier: CabinTier;
  code: 'F' | 'J' | 'W' | 'Y';
  productName: string;
  seatPitch: string;
  seatWidth: string;
  recline: string;
  screenSize: string;
  materials: string[];
  features: string[];
  accentColor: string;
  keyInnovation: string;
  dataSource: DataSourceType;
}

export interface QuarterlyTrend {
  quarter: string;
  a380Completed: number;
  b777Completed: number;
  cumulativeTotal: number;
  targetCumulative: number;
  hangarAvgDays: number;
  isProjected: boolean;
  dataSource: DataSourceType;
}

export interface RouteDeployment {
  destination: string;
  iata: string;
  country: string;
  region: 'Europe' | 'North America' | 'Asia Pacific' | 'Middle East & Africa' | 'Australasia';
  dailyFrequencies: number;
  aircraftTypes: AircraftModel[];
  premiumEconomyAvailable: boolean;
  dataSource: DataSourceType;
  sourceCitation: string;
}
