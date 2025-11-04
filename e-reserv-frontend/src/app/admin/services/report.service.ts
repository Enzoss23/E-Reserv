import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';

export type MonthPoint = { label: string; reservations: number; cancels: number; occupancy: number };

export type ReportSummary = {
  totalReservations: number;
  confirmed: number;
  cancelled: number;
  noShows: number;
  avgOccupancy: number; // %
  avgPartySize: number; // pax
  months: MonthPoint[];
};

@Injectable({ providedIn: 'root' })
export class ReportService {
  constructor(private http: HttpClient) {}

  getSummary(params?: Record<string, any>): Observable<ReportSummary> {
    const mockUrl = '/assets/mock/reports.json';
    return this.http.get<ReportSummary | any>('http://177.102.233.197:25565/reports', { params }).pipe(
      map((res: any) => {
        if (res && typeof res === 'object') {
          return {
            totalReservations: res.totalReservations,
            confirmed: res.confirmed,
            cancelled: res.cancelled,
            noShows: res.noShows,
            avgOccupancy: res.avgOccupancy,
            avgPartySize: res.avgPartySize,
            months: Array.isArray(res.months) ? res.months : [],
          } as ReportSummary;
        }
        throw new Error('Invalid reports payload');
      }),
      catchError(() => this.http.get<ReportSummary>(mockUrl))
    );
  }
}
