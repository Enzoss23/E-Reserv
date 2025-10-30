import { Hall } from "./hall.model";

export interface Unit {
  id?: number;
  name: string;
  address: string;
  country: string;
  state: string;
  city: string;
  postalCode: string;
  maxDaysAntecedence: number;
  minMinutesAntecedence: number;
  intervalBetweenTimes: number;
  maxReservationTime: string;
  minReservationTime: string;
  halls: Hall[];
  active: boolean;
  creationDate: string;
}

