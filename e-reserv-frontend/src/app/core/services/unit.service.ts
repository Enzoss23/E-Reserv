import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Unit } from '../models/unit.model';
import { Observable, catchError, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UnitService {
  private api = '/api/units';
  private mock = '/assets/mock/units.json';

  constructor(private http: HttpClient) {}

  public findAll(): Observable<Unit[]> {
    return this.http.get<Unit[] | any>(this.api).pipe(
      map((res: any) => (Array.isArray(res) ? (res as Unit[]) : [])),
      catchError(() => this.http.get<Unit[]>(this.mock))
    );
  }

  public findById(id: number): Observable<Unit> {
    return this.http.get<Unit | any>(`${this.api}/${id}`).pipe(
      map((res: any) => res as Unit),
      catchError(() =>
        this.http.get<Unit[]>(this.mock).pipe(
          map((list) => list.find((u: any) => Number(u.id) === Number(id)) as Unit)
        )
      )
    );
  }
}
