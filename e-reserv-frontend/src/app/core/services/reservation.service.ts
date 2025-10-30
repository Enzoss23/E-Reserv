import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Available } from '../models/available.model';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  private url: string = 'http://localhost:8080/reservation'

  constructor(private http: HttpClient) {}

  public checkAvailable(params: any): Observable<Available> {
    return this.http.get<Available>(this.url + '/available', {params});
  }

  public create(payload: any): Observable<Available> {
    return this.http.post<Available>(this.url, payload);
  }
}