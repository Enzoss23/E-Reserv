import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

type MonthPoint = { label: string; reservations: number; cancels: number; occupancy: number };

@Component({
  standalone: true,
  selector: 'app-admin-reports',
  imports: [CommonModule, MatIconModule, MatButtonModule, MatCardModule],
  templateUrl: './admin-reports.component.html',
  styleUrl: './admin-reports.component.css'
})
export class AdminReportsComponent {
  // KPIs (mock)
  totalReservations = 1245;
  confirmed = 968;
  cancelled = 102;
  noShows = 34;
  avgOccupancy = 72; // %
  avgPartySize = 3.4; // pax

  // Series (mock)
  months: MonthPoint[] = [
    { label: 'Jan', reservations: 80, cancels: 6,  occupancy: 55 },
    { label: 'Fev', reservations: 92, cancels: 7,  occupancy: 60 },
    { label: 'Mar', reservations: 110,cancels: 8,  occupancy: 65 },
    { label: 'Abr', reservations: 96, cancels: 10, occupancy: 62 },
    { label: 'Mai', reservations: 120,cancels: 7,  occupancy: 70 },
    { label: 'Jun', reservations: 130,cancels: 9,  occupancy: 74 },
    { label: 'Jul', reservations: 145,cancels: 11, occupancy: 78 },
    { label: 'Ago', reservations: 160,cancels: 12, occupancy: 81 },
    { label: 'Set', reservations: 150,cancels: 9,  occupancy: 79 },
    { label: 'Out', reservations: 170,cancels: 10, occupancy: 83 },
    { label: 'Nov', reservations: 165,cancels: 8,  occupancy: 82 },
    { label: 'Dez', reservations: 188,cancels: 15, occupancy: 85 },
  ];

  maxReservations() {
    return Math.max(...this.months.map(m => m.reservations));
  }

  // Simple bar height calc (0..100%)
  barHeight(v: number) {
    const max = this.maxReservations() || 1;
    return (v / max) * 100;
  }

  // Template helpers (avoid arrow functions inside templates)
  get polylinePoints(): string {
    const n = this.months.length;
    if (n <= 1) return '';
    const step = 100 / (n - 1);
    return this.months
      .map((m, i) => `${i * step},${40 - (m.occupancy * 0.4)}`)
      .join(' ');
  }

  cx(i: number): number {
    const n = this.months.length;
    return n > 1 ? i * (100 / (n - 1)) : 0;
    }

  cy(m: MonthPoint): number {
    return 40 - (m.occupancy * 0.4);
  }
}
