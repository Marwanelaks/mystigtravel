// Travel Program Types and Interfaces
// Re-export from the main types file to maintain compatibility

export {
  DemandStatus,
  TransportType,
  Gender,
  TravelerType,
  ServiceType,
  Currency,
  RoomTypeEnum,
  UserRole,
} from '@/types/travel';

export type {
  City,
  RoomType,
  Hotel,
  Activity,
  Service,
  Transport,
  Traveler,
  MainTraveler,
  ClientInfo,
  CitySelection,
  DemandCity,
  ClientDemand,
  AdminPackage,
} from '@/types/travel';

// Legacy aliases for backward compatibility
export type { ClientDemand as Demand } from '@/types/travel';
export type { Service as ServiceOffering } from '@/types/travel';
export type { ClientDemand as DemandForDisplay } from '@/types/travel';

// PLAN B: SPECIAL PACKAGE
import type { City, Hotel, Activity, Service, Transport } from '@/types/travel';

export interface PackageCityPeriod {
  id: string;
  city: City;
  periodDays: number;
}

export interface SpecialPackage {
  id: string;
  name: string;
  description?: string;
  cities: City[];
  hotels: Hotel[];
  activities: Activity[];
  services: Service[];
  transports: Transport[];
  basePrice: number;
  discountPercent: number;
  finalPrice: number;
  status: boolean;
  totalPeriodDays: number;
  cityPeriods: PackageCityPeriod[];
}




