import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Unit } from '../../core/models/unit.model';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { UnitService } from 'src/app/core/services/unit.service';

@Component({
  standalone: true,
  selector: 'app-unit',
  imports: [CommonModule, MatButtonModule, MatIconModule],
  templateUrl: './unit.component.html',
  styleUrl: './unit.component.css'
})
export class UnitComponent implements OnInit {
  unit = signal<Unit | null>(null);
  constructor(private route: ActivatedRoute, private unitService: UnitService, private router: Router) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.unitService.findById(id).subscribe({
      next: (res) => this.unit.set(res),
      error: (err) => console.error('Error fetching data:', err)
    });
  }

  goReserve(id: string) {
    this.router.navigate(['/unidade', id, 'reserva']);
  }
}
