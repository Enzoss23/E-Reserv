import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Unit } from '../../core/models/unit.model';
import { MatButtonModule } from '@angular/material/button';

@Component({
  standalone: true,
  selector: 'app-unit',
  imports: [CommonModule, MatButtonModule],
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
          <button mat-stroked-button color="primary" (click)="goReserve(u.id)">Fazer reserva de mesa</button>
          <button mat-stroked-button disabled>Lista de espera</button>
          <button mat-stroked-button disabled>Cardápio</button>
        </div>
      </div>
    </div>
  `,
  styles: [
    `.cover-wrap{ position:relative; width:100vw; left:50%; right:50%; margin-left:-50vw; margin-right:-50vw; }`,
    `.cover-img{ width:100%; height:360px; object-fit:cover; display:block; }`,
    `.brand-overlay{ position:absolute; left:50%; transform:translateX(-50%); bottom:-48px; height:200px; width:auto; border-radius:4px; }`,
    `.center-block{ text-align:center; margin-top:68px; }`,
    `.unit-title{ margin:16px 0 4px; color:#0A4697; font-weight:700; }`,
    `.unit-address{ color:#7d8a97; }`,
    `.actions{ display:flex; gap:16px; justify-content:center; margin-top:24px; flex-wrap:wrap; }`,
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

