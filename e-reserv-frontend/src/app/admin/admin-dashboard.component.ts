import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

@Component({
  standalone: true,
  selector: 'app-admin-dashboard',
  imports: [CommonModule, MatCardModule],
  template: `
    <div class="metrics">
      <div class="metric">Reservas confirmadas<div class="num">—</div></div>
      <div class="metric">Reservas canceladas<div class="num">—</div></div>
      <div class="metric">Taxa de ocupação atual<div class="num">—</div></div>
      <div class="metric">Fila de espera<div class="num">—</div></div>
      <div class="metric">Reservas pendentes<div class="num">—</div></div>
      <div class="metric">Mesas disponíveis<div class="num">—</div></div>
      <div class="metric">Mesas ocupadas<div class="num">—</div></div>
      <div class="metric">No-shows recentes<div class="num">—</div></div>
    </div>

    <div class="section">
      <div class="section-title">Agenda mensal</div>
      <div class="calendar">
        <div class="cal-head">Setembro 2025</div>
        <div class="cal-grid">
          <div class="cell" *ngFor="let d of days">{{ d }}</div>
        </div>
      </div>
    </div>
  `,
  styles: [
    `.metrics{ display:grid; grid-template-columns:repeat(auto-fill,minmax(240px,1fr)); gap:12px; }`,
    `.metric{ background:#fff; border:1px solid #e5e9f2; box-shadow:0 2px 4px rgba(0,0,0,.06); padding:14px; border-radius:6px; font-weight:600; color:#263238; }`,
    `.metric .num{ font-size:28px; color:#0A4697; margin-top:4px; font-weight:700; }`,
    `.section{ margin-top:16px; }`,
    `.section-title{ font-weight:600; margin-bottom:8px; }`,
    `.calendar{ background:#fff; border:1px solid #e5e9f2; border-radius:6px; box-shadow:0 2px 4px rgba(0,0,0,.06); padding:12px; }`,
    `.cal-head{ font-weight:600; margin-bottom:8px; }`,
    `.cal-grid{ display:grid; grid-template-columns:repeat(7,1fr); gap:8px; }`,
    `.cell{ height:86px; border:1px solid #e5e9f2; border-radius:4px; font-size:12px; color:#607D8B; padding:6px; }`
  ]
})
export class AdminDashboardComponent{
  days = Array.from({length:35}, (_,i)=> i+1);
}

