import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatChipsModule } from '@angular/material/chips';

type DayStats = {
  day?: number;
  reserved?: number;
  available?: number;
  cancels?: number;
  noshows?: number;
  unavailable?: boolean;
};

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
export class AdminDashboardComponent {
  private month = signal(8); // Setembro
  private year = signal(2025);

  weekDays = ['SEG','TER','QUA','QUI','SEX','SAB','DOM'];

  monthLabel = computed(() => {
    const d = new Date(this.year(), this.month(), 1);
    const label = d.toLocaleDateString('pt-BR', { month:'long', year:'numeric' });
    return label.charAt(0).toUpperCase() + label.slice(1);
  });

  monthGrid = computed<DayStats[]>(() => {
    const m = this.month(), y = this.year();
    const first = new Date(y, m, 1);
    const dow = (first.getDay() + 6) % 7;
    const daysInMonth = new Date(y, m + 1, 0).getDate();
    const grid: DayStats[] = [];
    for (let i = 0; i < dow; i++) grid.push({});
    const blocked = new Set<number>([7, 30]);
    for (let d = 1; d <= daysInMonth; d++) {
      if (blocked.has(d)) grid.push({ day: d, unavailable: true });
      else grid.push({ day: d, reserved: 50, available: 100, cancels: 5, noshows: 2 });
    }
    while (grid.length % 7 !== 0) grid.push({});
    while (grid.length < 42) grid.push({});
    return grid;
  });

  prevMonth() {
    const m = this.month() - 1;
    if (m < 0) { this.month.set(11); this.year.set(this.year() - 1); }
    else this.month.set(m);
  }

  nextMonth() {
    const m = this.month() + 1;
    if (m > 11) { this.month.set(0); this.year.set(this.year() + 1); }
    else this.month.set(m);
  }
}
