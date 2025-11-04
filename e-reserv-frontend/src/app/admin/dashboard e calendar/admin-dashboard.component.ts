import { Component, OnInit, computed, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatChipsModule } from '@angular/material/chips';
import { DashboardService, DayStats, DashboardStats } from '../services/dashboard.service';

@Component({
  standalone: true,
  selector: 'app-admin-dashboard',
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatChipsModule
  ],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent implements OnInit {
  private dashboardService = inject(DashboardService);

  private month = signal(8); // Setembro
  private year = signal(2025);

  weekDays = ['SEG','TER','QUA','QUI','SEX','SAB','DOM'];

  // KPIs
  stats = signal<DashboardStats>({
    confirmedReservations: 0,
    cancelledReservations: 0,
    occupancyRate: 0,
    waitlistCount: 0,
    pendingReservations: 0,
    tablesAvailable: 0,
    tablesOccupied: 0,
    recentNoShows: 0,
  });

  // Calendar
  monthLabel = signal('');
  monthGrid = signal<DayStats[]>([]);

  ngOnInit(): void {
    this.loadStats();
    this.loadMonth();
  }

  private loadStats() {
    this.dashboardService.getStats().subscribe(s => this.stats.set(s));
  }

  private loadMonth() {
    const y = this.year();
    const m = this.month();
    this.dashboardService.getMonthOverview(y, m).subscribe(({ label, grid }) => {
      this.monthLabel.set(label);
      this.monthGrid.set(grid);
    });
  }

  prevMonth() {
    const m = this.month() - 1;
    if (m < 0) { this.month.set(11); this.year.set(this.year() - 1); }
    else this.month.set(m);
    this.loadMonth();
  }

  nextMonth() {
    const m = this.month() + 1;
    if (m > 11) { this.month.set(0); this.year.set(this.year() + 1); }
    else this.month.set(m);
    this.loadMonth();
  }
}
