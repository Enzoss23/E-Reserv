import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Unit } from '../models/unit.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UnitService {

  private url: string = 'http://177.102.233.197:25565/unit'

  constructor(private http: HttpClient) {}

  public findAll(): Observable<Unit[]> {
    return this.http.get<Unit[]>(this.url);
  }

  public findById(id: number): Observable<Unit> {
    return this.http.get<Unit>(`${this.url}/${id}`);
  }
}