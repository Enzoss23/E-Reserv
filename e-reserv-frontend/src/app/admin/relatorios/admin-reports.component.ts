import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ReportService, ReportSummary } from '../services/report.service';

type MonthPoint = { label: string; reservations: number; cancels: number; occupancy: number };

@Component({
  standalone: true,
  selector: 'app-admin-reports',
  imports: [CommonModule, MatIconModule, MatButtonModule, MatCardModule],
  templateUrl: './admin-reports.component.html',
  styleUrl: './admin-reports.component.css'
})
export class AdminReportsComponent implements OnInit {
  private reportService = inject(ReportService);
  // KPIs (mock)
  totalReservations = 1245;
  confirmed = 968;
  cancelled = 102;
  noShows = 34;
  avgOccupancy = 72; // %
  avgPartySize = 3.4; // pax

  // Series (mock)
  months: MonthPoint[] = [];

  ngOnInit(): void {
    this.reportService.getSummary().subscribe((summary: ReportSummary) => {
      this.totalReservations = summary.totalReservations;
      this.confirmed = summary.confirmed;
      this.cancelled = summary.cancelled;
      this.noShows = summary.noShows;
      this.avgOccupancy = summary.avgOccupancy;
      this.avgPartySize = summary.avgPartySize;
      this.months = summary.months;
    });
  }

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
