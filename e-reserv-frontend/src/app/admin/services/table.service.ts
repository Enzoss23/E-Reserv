import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';

export type TablePayload = {
  number: number | null;
  name?: string;
  chairs: number | null;
  area: string | null;
  status?: string | null; // e.g., 'Disponível' | 'Ocupada' | 'Reservada'
  shape?: string | null;  // e.g., 'Quadrada' | 'Redonda' | 'Retangular'
  nearWindow?: boolean;
  wheelchair?: boolean;
  privateArea?: boolean;
  outdoor?: boolean;
  notes?: string;
};

export type Table = Required<Pick<TablePayload, 'number' | 'chairs' | 'area'>> &
  Omit<TablePayload, 'number' | 'chairs' | 'area'> & {
    id: number;
    status: string;
  };

@Injectable({ providedIn: 'root' })
export class TableService {
  private baseUrl = 'http://177.102.233.197:25565/tables';
  private mockUrl = '/assets/mock/tables.json';
  constructor(private http: HttpClient) {}

  create(payload: TablePayload): Observable<Table> {
    const nextId = Math.floor(Math.random() * 9000) + 1000;
    const fallback: Table = {
      id: nextId,
      number: payload.number ?? nextId,
      name: payload.name || undefined,
      chairs: payload.chairs ?? 0,
      area: payload.area || 'Salão Principal',
      status: payload.status || 'Disponível',
      shape: payload.shape || undefined,
      nearWindow: !!payload.nearWindow,
      wheelchair: !!payload.wheelchair,
      privateArea: !!payload.privateArea,
      outdoor: !!payload.outdoor,
      notes: payload.notes || undefined,
    };

    return this.http.post<Table | any>(this.baseUrl, payload).pipe(
      map((res: any) => {
        if (res && typeof res === 'object') {
          return {
            id: res.id ?? fallback.id,
            number: res.number ?? fallback.number,
            name: res.name ?? fallback.name,
            chairs: res.chairs ?? fallback.chairs,
            area: res.area ?? fallback.area,
            status: res.status ?? fallback.status,
            shape: res.shape ?? fallback.shape,
            nearWindow: res.nearWindow ?? fallback.nearWindow,
            wheelchair: res.wheelchair ?? fallback.wheelchair,
            privateArea: res.privateArea ?? fallback.privateArea,
            outdoor: res.outdoor ?? fallback.outdoor,
            notes: res.notes ?? fallback.notes,
          } as Table;
        }
        return fallback;
      }),
      catchError(() => of(fallback))
    );
  }

  list(): Observable<Table[]> {
    return this.http.get<Table[] | any>(this.baseUrl).pipe(
      map((res: any) => (Array.isArray(res) ? (res as Table[]) : [])),
      catchError(() => this.http.get<Table[]>(this.mockUrl))
    );
  }

  get(id: number): Observable<Table> {
    return this.http.get<Table | any>(`${this.baseUrl}/${id}`).pipe(
      map((res: any) => res as Table),
      catchError(() =>
        this.http
          .get<Table[]>(this.mockUrl)
          .pipe(map((arr) => (arr || []).find((t) => Number(t.id) === Number(id)) as Table))
      )
    );
  }

  update(id: number, patch: Partial<TablePayload>): Observable<Table> {
    return this.http.patch<Table | any>(`${this.baseUrl}/${id}`, patch).pipe(
      map((res: any) => res as Table)
    );
  }

  remove(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
