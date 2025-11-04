import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';

export type DayStats = {
  day?: number;
  reserved?: number;
  available?: number;
  cancels?: number;
  noshows?: number;
  unavailable?: boolean;
};

export type MonthOverview = {
  label: string; 
  grid: DayStats[]; 
};

export type DashboardStats = {
  confirmedReservations: number;
  cancelledReservations: number;
  occupancyRate: number; // percentage 0..100
  waitlistCount: number;
  pendingReservations: number;
  tablesAvailable: number;
  tablesOccupied: number;
  recentNoShows: number;
};

@Injectable({ providedIn: 'root' })
export class DashboardService {
  constructor(private http: HttpClient) {}

  getMonthOverview(year: number, month: number): Observable<MonthOverview> {
    // month: 0..11
    const d = new Date(year, month, 1);
    const labelRaw = d.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' });
    const label = labelRaw.charAt(0).toUpperCase() + labelRaw.slice(1);

    const mockUrl = `/assets/mock/dashboard-month-${year}-${String(month + 1).padStart(2,'0')}.json`;
    return this.http
      .get<MonthOverview | any>('http://177.102.233.197:25565/dashboard/month', { params: { year, month } as any })
      .pipe(
        map((res: any) => {
          if (res && typeof res === 'object') {
            return {
              label: res.label ?? label,
              grid: Array.isArray(res.grid) ? res.grid : [],
            } as MonthOverview;
          }
          throw new Error('Invalid month payload');
        }),
        catchError(() => this.http.get<MonthOverview>(mockUrl))
      );
  }

  getStats(): Observable<DashboardStats> {
    const mockUrl = '/assets/mock/dashboard-stats.json';
    return this.http.get<DashboardStats | any>('/api/dashboard/stats').pipe(
      map((res: any) => ({
        confirmedReservations: res?.confirmedReservations,
        cancelledReservations: res?.cancelledReservations,
        occupancyRate: res?.occupancyRate,
        waitlistCount: res?.waitlistCount,
        pendingReservations: res?.pendingReservations,
        tablesAvailable: res?.tablesAvailable,
        tablesOccupied: res?.tablesOccupied,
        recentNoShows: res?.recentNoShows,
      } as DashboardStats)),
      catchError(() => this.http.get<DashboardStats>(mockUrl))
    );
  }
}
