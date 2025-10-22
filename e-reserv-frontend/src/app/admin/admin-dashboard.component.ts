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
  template: `
    <!-- MÉTRICAS -->
    <div class="metrics">
      <mat-card class="metric">
        <div class="metric-left">
          <div class="metric-title">Reservas confirmadas</div>
        </div>
        <div class="metric-num">45</div>
      </mat-card>

      <mat-card class="metric">
        <div class="metric-left">
          <div class="metric-title">Reservas canceladas</div>
        </div>
        <div class="metric-num warn">3</div>
      </mat-card>

      <mat-card class="metric">
        <div class="metric-left">
          <div class="metric-title">Taxa de ocupação atual</div>
        </div>
        <div class="metric-num">30%</div>
      </mat-card>

      <mat-card class="metric orange">
        <div class="metric-left">
          <div class="metric-title">Fila de espera</div>
          <div class="metric-sub">Clientes aguardando</div>
        </div>
        <div class="metric-num">12</div>
      </mat-card>

      <mat-card class="metric orange">
        <div class="metric-left">
          <div class="metric-title">Reservas pendentes</div>
        </div>
        <div class="metric-num">15</div>
      </mat-card>

      <mat-card class="metric">
        <div class="metric-left">
          <div class="metric-title">Mesas disponíveis</div>
        </div>
        <div class="metric-num">70</div>
      </mat-card>

      <mat-card class="metric">
        <div class="metric-left">
          <div class="metric-title">Mesas ocupadas</div>
        </div>
        <div class="metric-num">30</div>
      </mat-card>

      <mat-card class="metric">
        <div class="metric-left">
          <div class="metric-title">No-shows recentes</div>
          <div class="metric-sub">Clientes faltantes</div>
        </div>
        <div class="metric-num warn">2</div>
      </mat-card>
    </div>

    <!-- CALENDÁRIO -->
    <div class="section">
      <div class="section-title">Agenda mensal</div>

      <mat-card class="calendar">
        <div class="cal-toolbar">
          <div class="cal-title">{{ monthLabel() }}</div>

          <div class="cal-legend">
            <span class="legend"><span class="dot dot-blue"></span> Mesas reservadas</span>
            <span class="legend"><span class="dot dot-green"></span> Mesas disponíveis</span>
            <span class="legend"><span class="dot dot-red"></span> Cancelamentos</span>
            <span class="legend"><span class="dot dot-gray"></span> No-shows</span>
          </div>

          <div class="cal-nav">
            <button mat-icon-button (click)="prevMonth()" matTooltip="Mês anterior">
              <mat-icon>arrow_back</mat-icon>
            </button>
            <button mat-icon-button (click)="nextMonth()" matTooltip="Próximo mês">
              <mat-icon>arrow_forward</mat-icon>
            </button>
          </div>
        </div>

        <div class="weekdays">
          <div *ngFor="let w of weekDays">{{ w }}</div>
        </div>

        <div class="cal-grid">
          <div
            class="cell"
            *ngFor="let d of monthGrid()"
            [class.empty]="!d.day"
            [class.unavailable]="d.unavailable"
          >
            <div class="cell-head">
              <span class="day">{{ d.day || '' }}</span>
              <button
                *ngIf="d.unavailable"
                mat-icon-button
                class="lock"
                matTooltip="Data indisponível"
                tabindex="-1"
              >
                <mat-icon>lock</mat-icon>
              </button>
            </div>

            <div *ngIf="d.day && !d.unavailable" class="stacks">
              <div class="stack stack-blue"><span class="val">{{ d.reserved }}</span></div>
              <div class="stack stack-green"><span class="val">{{ d.available }}</span></div>
              <div class="stack stack-red"><span class="val">{{ d.cancels }}</span></div>
              <div class="stack stack-gray"><span class="val">{{ d.noshows }}</span></div>
            </div>
          </div>
        </div>
      </mat-card>
    </div>
  `,
  styles: [`
    :host {
      --surface: #ffffff;
      --line: #e5e9f2;
      --text: #263238;
      --muted: #607d8b;
      --blue: #1e88e5;
      --green: #43a047;
      --red: #e53935;
      --gray: #455a64;
      --orange: #FF9F19;
      --shadow: 0 2px 6px rgba(0,0,0,.06);
      display:block;
    }

    /* ===== Métricas ===== */
    .metrics {
      display: grid;
      grid-template-columns: repeat(auto-fill,minmax(240px,1fr));
      gap: 12px;
      margin-bottom: 16px;
    }

    .metric {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 14px 18px;
      border: 1px solid var(--line);
      border-radius: 6px;
      box-shadow: var(--shadow);
      background: var(--surface);
    }

    .metric-left {
      display: flex;
      flex-direction: column;
    }

    .metric-title {
      font-weight: 600;
      color: var(--text);
    }

    .metric-sub {
      font-size: 12px;
      color: #8a9aa8;
      margin-top: 2px;
    }

    .metric-num {
      font-size: 28px;
      font-weight: 800;
      color: #0A4697;
    }

    .metric-num.warn { color: var(--red); }

    /* cor laranja específica */
    .metric.orange .metric-num {
      color: var(--orange);
    }

    /* ===== Seção ===== */
    .section-title{ font-weight:600; margin:8px 0 10px; color:var(--text); }

    /* ===== Calendário ===== */
    .calendar{
      background:var(--surface);
      border:1px solid var(--line);
      box-shadow:var(--shadow);
      padding:12px;
      border-radius:8px;
    }

    .cal-toolbar{
      display:grid;
      grid-template-columns: 1fr auto auto;
      align-items:center;
      gap:12px;
      margin-bottom:8px;
    }

    .cal-title{ font-weight:700; font-size:16px; color:var(--text); }

    .cal-nav button{ border:1px solid var(--line); }

    .cal-legend{
      display:flex; gap:14px; align-items:center; justify-self:center; flex-wrap:wrap;
    }

    .legend{ font-size:12px; color:var(--muted); display:flex; gap:6px; align-items:center; }
    .dot{ width:12px; height:12px; border-radius:3px; display:inline-block; }
    .dot-blue{ background:var(--blue); }
    .dot-green{ background:var(--green); }
    .dot-red{ background:var(--red); }
    .dot-gray{ background:var(--gray); }

    .weekdays{
      display:grid; grid-template-columns:repeat(7,1fr);
      color:#90a4ae; font-weight:600; font-size:12px;
      padding:8px 6px; gap:8px;
    }

    .weekdays > div{ text-align:left; padding-left:6px; }

    .cal-grid{
      display:grid;
      grid-template-columns:repeat(7,1fr);
      gap:8px;
    }

    .cell{
      height:94px;
      border:1px solid var(--line);
      border-radius:6px;
      font-size:12px;
      color:var(--muted);
      padding:6px;
      background:#fff;
      position:relative;
    }

    .cell.empty{ background:#fafbfd; }
    .cell.unavailable{ background:#f5f7fb; border-style:dashed; }

    .cell-head{ display:flex; align-items:center; justify-content:space-between; margin-bottom:2px; }
    .day{ color:#546e7a; font-weight:700; }

    .lock{ width:22px; height:22px; pointer-events:none; }
    .lock mat-icon{ font-size:18px; width:18px; height:18px; color:#9e9e9e; }

    /* ===== Ajuste: pílulas à direita e 36x14 ===== */
.stacks{
  position: absolute;        /* fixa dentro da célula */
  right: 6px;                /* encosta na lateral direita */
  top: 50%;                  /* centraliza verticalmente */
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  align-items: flex-end;     /* alinha as barrinhas à direita */
  gap: 4px;
}

/* pílulas com tamanho fixo */
.stack{
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 14px;
  border-radius: 3px;
  color: #fff;
  font-weight: 700;
  font-size: 10px;
  line-height: 14px;         /* centraliza o número */
  box-shadow: 0 1px 0 rgba(0,0,0,.04) inset;
}

/* cores */
.stack-blue{ background: var(--blue); }
.stack-green{ background: var(--green); }
.stack-red{ background: var(--red); }
.stack-gray{ background: var(--gray); }


    .val{ font-size:10px; line-height:1; }

    @media (max-width: 860px){
      .cal-toolbar{ grid-template-columns: 1fr auto; }
      .cal-legend{ grid-column:1 / -1; justify-content:flex-start; }
    }
  `]
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
