import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';

export type ClientPayload = {
  name: string;
  email: string;
  phone: string;
};

export type Client = ClientPayload & {
  id: number;
  status: 'VIP' | 'Regular' | 'Bloqueado';
  totalReservations: number;
  lastVisit: string; // dd/MM/yyyy
};

@Injectable({ providedIn: 'root' })
export class ClientService {
  private baseUrl = 'http://177.102.233.197:25565/clients';
  private mockUrl = '/assets/mock/clients.json';
  constructor(private http: HttpClient) {}

  create(payload: ClientPayload): Observable<Client> {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();

    const fallback: Client = {
      id: Math.floor(Math.random() * 9000) + 1000,
      status: 'Regular',
      totalReservations: 0,
      lastVisit: `${dd}/${mm}/${yyyy}`,
      ...payload,
    };

    return this.http.post<Client | any>(this.baseUrl, payload).pipe(
      map((res: any) => {
        if (res && typeof res === 'object') {
          return {
            id: res.id ?? fallback.id,
            name: res.name ?? payload.name,
            email: res.email ?? payload.email,
            phone: res.phone ?? payload.phone,
            status: res.status ?? 'Regular',
            totalReservations: res.totalReservations ?? 0,
            lastVisit: res.lastVisit ?? fallback.lastVisit,
          } as Client;
        }
        return fallback;
      }),
      catchError(() => of(fallback))
    );
  }

  list(params?: Record<string, any>): Observable<Client[]> {
    return this.http.get<Client[] | any>(this.baseUrl, { params }).pipe(
      map((res: any) => (Array.isArray(res) ? (res as Client[]) : [])),
      catchError(() => this.http.get<Client[]>(this.mockUrl))
    );
  }

  get(id: number): Observable<Client> {
    return this.http.get<Client | any>(`${this.baseUrl}/${id}`).pipe(
      map((res: any) => res as Client),
      catchError(() =>
        this.http
          .get<Client[]>(this.mockUrl)
          .pipe(map((arr) => (arr || []).find((c) => Number(c.id) === Number(id)) as Client))
      )
    );
  }

  update(id: number, patch: Partial<ClientPayload & { status?: Client['status'] }>): Observable<Client> {
    return this.http.patch<Client | any>(`${this.baseUrl}/${id}`, patch).pipe(
      map((res: any) => res as Client)
    );
  }

  remove(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
