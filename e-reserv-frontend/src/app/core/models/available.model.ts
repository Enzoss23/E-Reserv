import { Hall } from "./hall.model";

export interface Available {
    date: string;
    hall: Hall;
    peopleQuantity: number;
    isAvailable: boolean;
}