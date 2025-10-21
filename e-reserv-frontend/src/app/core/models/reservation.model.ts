export interface ReservationDetails {
  unitId: string;
  date: string; // ISO string (yyyy-mm-dd)
  time: string; // HH:mm
  people: number;
  area: 'salão' | 'lounge' | 'externa' | 'bar' | string;
  notes?: string;
}

export interface CustomerInfo {
  name: string;
  phone: string;
  email: string;
}

export interface ReservationPayload extends ReservationDetails {
  customer: CustomerInfo;
}

