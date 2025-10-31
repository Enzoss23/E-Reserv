import { Component, OnInit, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { Unit } from '../../core/models/unit.model';
import { UnitService } from 'src/app/core/services/unit.service';

@Component({
  standalone: true,
  selector: 'app-home',
  imports: [CommonModule, FormsModule, MatFormFieldModule, MatInputModule, MatIconModule, MatButtonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'] 
})
export class HomeComponent implements OnInit {
  units = signal<any[]>([]);
  query = '';
  filtered = computed(() => {
    const q = this.query.toLowerCase().trim();
    return this.units().filter(u =>
      !q || u.name.toLowerCase().includes(q) || u.city.toLowerCase().includes(q)
    );
  });

  constructor(private unitService: UnitService, private router: Router) {}

  ngOnInit(): void {
    this.unitService.findAll().subscribe({
      next: (res) => this.units.set(res),
      error: (err) => console.error('Error fetching data:', err)
    });
  }

  openUnit(u: Unit) {
    this.router.navigate(['/unidade', u.id]);
  }

  buscar() {
    // Espaço para futura busca remota; mantém filtro local por enquanto
  }
}

