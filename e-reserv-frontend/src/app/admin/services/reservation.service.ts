import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';

export type ReservationPayload = {
  status: string;
  assignedTable: string;
  date: string;
  time: string;
  people: number;
  area: string;
  name: string;
  phone: string;
  email: string;
  cpf: string;
  notes?: string;
};

export type Reservation = ReservationPayload & {
  id: string;
  origin: string;
};

@Injectable({ providedIn: 'root' })
export class ReservationService {
  constructor(private http: HttpClient) {}

  private generateId(): string {
    const n = Math.floor(Math.random() * 900) + 100; // 3 digits
    return n.toString().padStart(3, '0');
  }

  create(payload: ReservationPayload): Observable<Reservation> {
    const fallback: Reservation = {
      id: this.generateId(),
      origin: 'Reserva manual',
      ...payload,
    };

    // POST to backend; if API not ready, fall back to local result
    return this.http.post<Reservation | any>('/api/reservations', payload).pipe(
      map((res: any) => {
        // Try to map backend response or use fallback shaped object
        if (res && typeof res === 'object') {
          return {
            id: (res.id ?? fallback.id).toString().padStart(3, '0'),
            origin: res.origin ?? 'Reserva manual',
            status: res.status ?? payload.status,
            assignedTable: res.assignedTable ?? payload.assignedTable,
            date: res.date ?? payload.date,
            time: res.time ?? payload.time,
            people: res.people ?? payload.people,
            area: res.area ?? payload.area,
            name: res.name ?? payload.name,
            phone: res.phone ?? payload.phone,
            email: res.email ?? payload.email,
            cpf: res.cpf ?? payload.cpf,
            notes: res.notes ?? payload.notes,
          } as Reservation;
        }
        return fallback;
      }),
      catchError(() => of(fallback))
    );
  }
}

