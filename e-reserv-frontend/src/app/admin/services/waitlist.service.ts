import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';

export type WaitlistPayload = {
  name: string;
  people: number;
  phone: string;
  notes?: string;
  priority?: boolean;
};

export type WaitlistEntry = WaitlistPayload & {
  id: number;
  waitingMin: number;
  createdAt: string; // ISO
};

@Injectable({ providedIn: 'root' })
export class WaitlistService {
  private baseUrl = 'http://177.102.233.197:25565/waitlist';
  private mockUrl = '/assets/mock/waitlist.json';
  constructor(private http: HttpClient) {}

  create(payload: WaitlistPayload): Observable<WaitlistEntry> {
    const fallback: WaitlistEntry = {
      id: Math.floor(Math.random() * 9000) + 1000,
      waitingMin: 0,
      createdAt: new Date().toISOString(),
      ...payload,
    };

    return this.http.post<WaitlistEntry | any>(this.baseUrl, payload).pipe(
      map((res: any) => {
        if (res && typeof res === 'object') {
          return {
            id: res.id ?? fallback.id,
            name: res.name ?? payload.name,
            people: res.people ?? payload.people,
            phone: res.phone ?? payload.phone,
            notes: res.notes ?? payload.notes,
            priority: res.priority ?? payload.priority,
            waitingMin: res.waitingMin ?? fallback.waitingMin,
            createdAt: res.createdAt ?? fallback.createdAt,
          } as WaitlistEntry;
        }
        return fallback;
      }),
      catchError(() => of(fallback))
    );
  }

  list(): Observable<WaitlistEntry[]> {
    return this.http.get<WaitlistEntry[] | any>(this.baseUrl).pipe(
      map((res: any) => (Array.isArray(res) ? (res as WaitlistEntry[]) : [])),
      catchError(() => this.http.get<WaitlistEntry[]>(this.mockUrl))
    );
  }

  update(id: number, patch: Partial<WaitlistPayload & { waitingMin?: number; priority?: boolean }>): Observable<WaitlistEntry> {
    return this.http.patch<WaitlistEntry | any>(`${this.baseUrl}/${id}`, patch).pipe(
      map((res: any) => res as WaitlistEntry)
    );
  }

  remove(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  call(id: number): Observable<WaitlistEntry> {
    return this.http.post<WaitlistEntry | any>(`${this.baseUrl}/${id}/call`, {}).pipe(
      map((res: any) => res as WaitlistEntry)
    );
  }

  checkIn(id: number): Observable<WaitlistEntry> {
    return this.http.post<WaitlistEntry | any>(`${this.baseUrl}/${id}/check-in`, {}).pipe(
      map((res: any) => res as WaitlistEntry)
    );
  }
}
