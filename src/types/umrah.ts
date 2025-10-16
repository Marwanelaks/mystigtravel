export type DemandStatus = 'PENDING' | 'VALIDATED' | 'REJECTED' | 'PROCESSED';
export type ProposalStatus = 'PENDING' | 'VALIDATED' | 'REJECTED' | 'MODIFIED'; // Added MODIFIED
export type DateType = 'FLEXIBLE' | 'SPECIFIC';
export type City = 'MECCA' | 'MEDINA' | 'JEDDAH';
export type RoomType = 'SINGLE' | 'DOUBLE' | 'TRIPLE' | 'FAMILY';

export interface UmrahDemand {
  id: number;
  fullName: string;
  email: string;
  phone: string;
  phoneCountry?: string;
  detectedCountry?: string;
  hotelCategories: string[];
  numberOfRooms: number;
  roomSelections: { [roomType: string]: number };
  travelParty: {
    adults: number;
    children: number;
    infants?: number;
    ages: number[];
    totalTravelers: number;
  };
  dateType: DateType;
  flexibleMonth?: string;
  flexibleDurationFrom?: string;
  flexibleDurationTo?: string;
  departureDate: string;
  returnDate: string;
  specialRequests: string;
  status: DemandStatus;
  adminComment?: string;
  validatedAt?: string;
  assignedPartenaire?: {
    id: number;
    username: string;
    email: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface HotelProposal {
  id: number;
  hotelCategory: string;
  city: City;
  hotelName: string;
  checkInDate: string;
  checkOutDate: string;
  numberOfRooms: number;
  singleRoomPrice: number;
  doubleRoomPrice: number;
  tripleRoomPrice: number;
  familyRoomPrice: number;
  assignedRoomType?: RoomType;
  totalHotelPrice?: number;
  roomTypeConfig?: string; // Added for room configuration
  roomTypeCounts?: RoomTypeCount[]; // Added for room configuration
}

export interface FlightProposal {
  id: number;
  airlineCompany: string;
  departureFlightDate: string;
  returnFlightDate: string;
  pricePerPerson: number;
  totalFlightPrice?: number;
}

export interface MazaratProposal {
  id: number;
  mazaratName: string;
  pricePerPerson: number;
}

export interface PartenaireProposal {
  id: number;
  umrahDemand: UmrahDemand;
  partenaire: {
    id: number;
    username: string;
    email: string;
  };
  hotelProposals: HotelProposal[];
  flightProposals: FlightProposal[];
  mazaratProposals: MazaratProposal[];
  transportPrice: number;
  visaPrice: number;
  beneficePrice: number;
  totalPrice: number;
  submittedAt: string;
  isActive: boolean;
  
  // NEW FIELDS FOR STATUS WORKFLOW
  status: ProposalStatus;
  adminComment?: string;
  validatedAt?: string;
  rejectedAt?: string;
  modifiedAt?: string;
  validatedBy?: {
    id: number;
    username: string;
    email: string;
  };
  rejectedBy?: {
    id: number;
    username: string;
    email: string;
  };
}

// DTOs for creation
export interface CreateDemandDTO {
  fullName: string;
  email: string;
  phone: string;
  phoneCountry?: string;
  detectedCountry?: string;
  hotelCategories: string[];
  roomSelections: { [roomType: string]: number };
  travelParty: {
    adults: number;
    children: number;
    infants?: number;
    ages: number[];
  };
  dateType: DateType;
  flexibleMonth?: string;
  flexibleDurationFrom?: string;
  flexibleDurationTo?: string;
  departureDate: string;
  returnDate: string;
  specialRequests: string;
}

export interface RoomTypeCount {
  roomType: string;
  count: number;
  price: number;
}

export interface HotelProposalDTO {
  hotelCategory: string;
  city: City;
  hotelName: string;
  checkInDate: string;
  checkOutDate: string;
  numberOfRooms: number;
  roomTypeCounts: RoomTypeCount[];
  totalHotelPrice: number;
}

export interface FlightProposalDTO {
  airlineCompany: string;
  departureFlightDate: string;
  returnFlightDate: string;
  pricePerPerson: number;
}

export interface MazaratProposalDTO {
  mazaratName: string;
  pricePerPerson: number;
}

export interface CreateProposalDTO {
  hotelProposals: HotelProposalDTO[];
  flightProposals: FlightProposalDTO[];
  mazaratProposals: MazaratProposalDTO[];
  transportPrice: number;
  visaPrice: number;
  beneficePrice: number;
}

export interface PriceBreakdown {
  hotels: number;
  flights: number;
  mazarat: number;
  transport: number;
  visa: number;
  benefice: number;
  total: number;
}

export interface DemandStatistics {
  PENDING: number;
  VALIDATED: number;
  REJECTED: number;
  PROCESSED: number;
}

export interface PartenaireStatistics {
  totalProposals: number;
  pendingProposals: number;
  validatedProposals: number;
  rejectedProposals: number;
  activeDemands: number;
}

export interface AdminProposalStatistics {
  totalProposals: number;
  pendingProposals: number;
  validatedProposals: number;
  rejectedProposals: number;
}

export interface SanitizedUmrahDemand extends Omit<UmrahDemand, 'fullName' | 'email' | 'phone'> {
  fullName: '[HIDDEN]';
  email: '[HIDDEN]';
  phone: '[HIDDEN]';
}

// Request DTOs for proposal actions
export interface RejectProposalRequest {
  comment: string;
}

export interface ValidateProposalRequest {
  proposalId: number;
}