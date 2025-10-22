import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Unit } from '../../core/models/unit.model';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  standalone: true,
  selector: 'app-unit',
  imports: [CommonModule, MatButtonModule, MatIconModule],
  template: `
    <div class="unit-page" *ngIf="unit() as u">
      <div class="cover-wrap">
        <img src="assets/Mask group.png" alt="Foto do estabelecimento" class="cover-img" />
        <img src="assets/image 8.png" alt="Marca" class="brand-overlay" />
      </div>

      <div class="container center-block">
        <h2 class="unit-title">{{ u.name }}</h2>
        <div class="unit-address">{{ u.address }}</div>

        <div class="actions">
          <button class="action-card" (click)="goReserve(u.id)">
            <div class="card-title">Fazer reserva de mesa</div>
            <div class="card-subtitle">Selecione horário e data para nos visitar</div>
            <mat-icon class="card-icon" fontIcon="event_available"></mat-icon>
          </button>

          <button class="action-card" disabled>
            <div class="card-title">Lista de espera</div>
            <div class="card-subtitle">Informe quantidade de pessoas</div>
            <mat-icon class="card-icon" fontIcon="group"></mat-icon>
          </button>

          <button class="action-card" disabled>
            <div class="card-title">Cardápio</div>
            <div class="card-subtitle">Cardápio digital da unidade</div>
            <mat-icon class="card-icon" fontIcon="menu_book"></mat-icon>
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [
    `.cover-wrap{ position:relative; width:100vw; left:50%; right:50%; margin-left:-50vw; margin-right:-50vw; }`,
    `.cover-img{ width:100%; height:360px; object-fit:cover; display:block; }`,
    `.brand-overlay{ position:absolute; left:50%; transform:translateX(-50%); bottom:-48px; height:161px; width:auto; border-radius:4px; }`,
    `.center-block{ text-align:center; margin-top:68px; }`,
    `.unit-title{ margin:16px 0 4px; color:#0A4697; font-weight:700; }`,
    `.unit-address{ color:#7d8a97; }`,
    `.actions{ display:flex; gap:24px; justify-content:center; margin-top:24px; flex-wrap:wrap; }`,
    `.action-card{ cursor:pointer; background:#fff; border:1.8px solid #155BB5; border-radius:2px; width:322px; height:120px; display:flex; flex-direction:column; align-items:center; justify-content:center; box-shadow:0 2px 4px rgba(10,70,151,0.15); transition: box-shadow .2s ease, transform .2s ease; padding:12px 16px; }`,
    `.action-card:hover{ box-shadow:0 4px 10px rgba(10,70,151,0.25); transform: translateY(-1px); }`,
    `.action-card:disabled{ opacity:.65; cursor:default; box-shadow:0 2px 4px rgba(0,0,0,0.06); transform:none; }`,
    `.card-title{ color:#155BB5; font-weight:145px; font-size:15px; margin-bottom:4px; }`,
    `.card-subtitle{ color:#6C7B8A; font-size:12px; margin-bottom:10px; }`,
    `.card-icon{ color:#155BB5; font-size:40px; width:40px; height:40px; }`,
  ]
})
export class UnitComponent implements OnInit {
  unit = signal<Unit | null>(null);
  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.http.get<Unit[]>('assets/mock/units.json').subscribe((list) => {
      const u = list.find(x => x.id === id) || null;
      this.unit.set(u);
    });
  }

  goReserve(id: string) {
    this.router.navigate(['/unidade', id, 'reserva']);
  }
}

