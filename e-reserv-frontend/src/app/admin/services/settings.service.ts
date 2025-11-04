import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';

export type SettingsPayload = {
  restaurantName: string;
  openingHour: string; // HH:mm
  closingHour: string; // HH:mm
  maxPartySize: number;
  autoConfirmOnline: boolean;
  notifyEmail: boolean;
  notifySms: boolean;
  theme: 'light' | 'dark';
  defaultArea: string;
};

const STORAGE_KEY = 'admin.settings';

@Injectable({ providedIn: 'root' })
export class SettingsService {
  constructor(private http: HttpClient) {}

  get(): Observable<SettingsPayload> {
    const local = (() => {
      try {
        const raw = sessionStorage.getItem(STORAGE_KEY) || localStorage.getItem(STORAGE_KEY);
        return raw ? (JSON.parse(raw) as SettingsPayload) : null;
      } catch { return null; }
    })();

    const fallback: SettingsPayload = local ?? {
      restaurantName: 'Corrientes 348 - Barra da Tijuca',
      openingHour: '11:30',
      closingHour: '23:30',
      maxPartySize: 10,
      autoConfirmOnline: true,
      notifyEmail: true,
      notifySms: false,
      theme: 'light',
      defaultArea: 'Salão Principal',
    };

    return this.http.get<SettingsPayload | any>('http://177.102.233.197:25565/settings').pipe(
      map((res: any) => ({
        restaurantName: res?.restaurantName ?? fallback.restaurantName,
        openingHour: res?.openingHour ?? fallback.openingHour,
        closingHour: res?.closingHour ?? fallback.closingHour,
        maxPartySize: res?.maxPartySize ?? fallback.maxPartySize,
        autoConfirmOnline: res?.autoConfirmOnline ?? fallback.autoConfirmOnline,
        notifyEmail: res?.notifyEmail ?? fallback.notifyEmail,
        notifySms: res?.notifySms ?? fallback.notifySms,
        theme: res?.theme ?? fallback.theme,
        defaultArea: res?.defaultArea ?? fallback.defaultArea,
      } as SettingsPayload)),
      catchError(() => of(fallback))
    );
  }

  save(payload: SettingsPayload): Observable<SettingsPayload> {
    // Persist a local backup regardless of API result
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(payload)); } catch {}

    return this.http.post<SettingsPayload | any>('/api/settings', payload).pipe(
      map((res: any) => ({
        restaurantName: res?.restaurantName ?? payload.restaurantName,
        openingHour: res?.openingHour ?? payload.openingHour,
        closingHour: res?.closingHour ?? payload.closingHour,
        maxPartySize: res?.maxPartySize ?? payload.maxPartySize,
        autoConfirmOnline: res?.autoConfirmOnline ?? payload.autoConfirmOnline,
        notifyEmail: res?.notifyEmail ?? payload.notifyEmail,
        notifySms: res?.notifySms ?? payload.notifySms,
        theme: res?.theme ?? payload.theme,
        defaultArea: res?.defaultArea ?? payload.defaultArea,
      } as SettingsPayload)),
      catchError(() => of(payload))
    );
  }
}

