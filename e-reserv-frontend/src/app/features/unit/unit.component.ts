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
  templateUrl: './unit.component.html',
  styleUrl: './unit.component.css'
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
