import { Component, OnInit, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Unit } from '../../core/models/unit.model';

@Component({
  standalone: true,
  selector: 'app-home',
  imports: [CommonModule, FormsModule, MatFormFieldModule, MatInputModule, MatIconModule, MatButtonModule],
  template: `
    <div class="container">
      <div class="hero">
        <img class="brand-mark" src="assets/image 4.png" alt="Marca do restaurante" />
        <h1>CORRIENTES TRÊS QUATRO OCHO</h1>
        <p>Faça sua reserva e venha experimentar carne de respeito, com cortes altos e suculentos, feitos com técnica e sentimento.</p>
      </div>

      <div class="search-bar">
        <mat-form-field appearance="outline" class="search-input">
          <mat-label>Pesquise por cidade ou unidade</mat-label>
          <input matInput [(ngModel)]="query" (keyup.enter)="buscar()" placeholder="Ex.: Jardins" />
        </mat-form-field>
        <button mat-flat-button color="primary" class="search-btn" (click)="buscar()">
          <mat-icon>search</mat-icon>
        </button>
      </div>

      <div class="grid">
        <div
          class="unit-card"
          *ngFor="let u of filtered()"
          (click)="openUnit(u)"
          role="button"
          tabindex="0"
        >
          <div class="logo-side">
            <img src="assets/image 8.png" alt="logo" />
          </div>
          <div class="info-side">
            <div class="unit-name">{{ u.name }}</div>
            <div class="unit-address">{{ u.address }}</div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [
    `.hero{ text-align:center; margin:56px auto 22px; max-width:1100px; }`,
    `.brand-mark{ height:140px; margin-bottom:12px; opacity:.95; }`,
    `.hero h1{ margin:0 0 8px; color: var(--brand-blue); font-weight:800; letter-spacing:.5px; font-size:28px; }`,
    `.hero p{ color:#7d8a97; max-width:720px; margin:0 auto; line-height:1.4; }`,
    `.search-bar{ display:flex; justify-content:center; align-items:stretch; gap:0; margin:18px auto 10px; max-width:720px; }`,
    `.search-input{ flex:1; }`,
    `.search-btn{ display:flex; justify-content:center; align-items:center; height:56px; width:56px; padding:0; border-radius:0 6px 6px 0; box-shadow:0 2px 4px rgba(0,0,0,.18); }`,
    `.search-btn .mdc-button__label{ display:flex; align-items:center; justify-content:center; width:100%; }`,
    `.search-btn .mat-icon{ font-size:30px; width:24px; height:24px; line-height:24px; padding:0; margin:0; }`,
    `.search-bar :is(.mat-mdc-form-field){ width:100%; }`,
    `.search-bar .mat-mdc-form-field-flex{ border-radius:6px 0 0 6px; }`,
    `.grid{ display:grid; grid-template-columns: repeat(auto-fit,minmax(360px,1fr)); gap:18px; margin:26px auto; justify-items:stretch; }`,
    `.unit-card{ width:100%; display:flex; align-items:stretch; background:#fff; border:1px solid #2a61c8; border-radius:6px; overflow:hidden; box-shadow:0 3px 8px rgba(0,0,0,.12); transition:box-shadow .12s ease, transform .12s ease; cursor:pointer; min-height:88px; }`,
    `.unit-card:hover{ transform: translateY(-1px); box-shadow:0 6px 16px rgba(0,0,0,.18); }`,
    `.logo-side{ width:92px; background: var(--brand-blue); display:flex; align-items:center; justify-content:center; }`,
    `.logo-side img{ height:42px; }`,
    `.info-side{ padding:12px 18px; display:flex; flex-direction:column; justify-content:center; }`,
    `.unit-name{ font-weight:800; color: var(--brand-blue-strong); margin-bottom:6px; font-size:17px; }`,
    `.unit-address{ color:#9aa4ae; font-size:13px; }`,
  ]
})
export class HomeComponent implements OnInit {
  units = signal<Unit[]>([]);
  query = '';
  filtered = computed(() => {
    const q = this.query.toLowerCase().trim();
    return this.units().filter(u =>
      !q || u.name.toLowerCase().includes(q) || u.city.toLowerCase().includes(q)
    );
  });

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.http.get<Unit[]>('assets/mock/units.json').subscribe((d) => this.units.set(d));
  }

  openUnit(u: Unit) {
    this.router.navigate(['/unidade', u.id]);
  }

  buscar() {
    // Espaço para futura busca remota; mantém filtro local por enquanto
  }
}

