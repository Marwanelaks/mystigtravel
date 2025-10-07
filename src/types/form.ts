export interface FormData {
  // Personal Information (Step 1)
  fullName: string;
  email: string;
  phone: string;
  phoneCountry?: string;
  detectedCountry?: string;

  // Accommodation Details (Step 2)
  hotelCategory: string | string[];
  hotelCategories?: string[];
  roomSelections: {
    [roomType: string]: number; // roomType -> number of rooms
  };
  numberOfRooms?: number;
  travelParty?: {
    adults: number;
    children: number;
    infants?: number;
    ages: number[];
  };

  // Trip Preferences (Step 3)
  dateType: 'flexible' | 'specific';
  flexibleMonth: string;
  flexibleDurationFrom?: string;
  flexibleDurationTo?: string;
  departureDate: string;
  returnDate: string;

  // Special Requests (Step 4)
  specialRequests: string;
}

export const initialFormData: FormData = {
  fullName: '',
  email: '',
  phone: '',
  hotelCategory: '',
  hotelCategories: [],
  roomSelections: {},
  numberOfRooms: 1,
  travelParty: {
    adults: 1,
    children: 0,
    ages: []
  },
  dateType: 'specific',
  flexibleMonth: '',
  flexibleDurationFrom: '',
  flexibleDurationTo: '',
  departureDate: '',
  returnDate: '',
  specialRequests: '',
};

export interface FormErrors {
  [key: string]: string;
}