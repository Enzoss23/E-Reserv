import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

type TableStatus = 'Disponível' | 'Ocupada' | 'Reservada';

export interface TableDetails {
  id: number;
  number: number;
  name?: string;
  chairs: number;
  area: string;
  notes?: string;
  status: TableStatus;
}

@Component({
  standalone: true,
  selector: 'app-admin-table-details',
  imports: [CommonModule, RouterModule, MatIconModule, MatButtonModule, FormsModule],
  templateUrl: './admin-table-details.component.html',
  styleUrl: './admin-table-details.component.css'
})
export class AdminTableDetailsComponent implements OnInit {
  private router = inject(Router);

  table: TableDetails | null = null;
  isEditing = false;
  draft: TableDetails | null = null;

  ngOnInit(): void {
    const nav = this.router.getCurrentNavigation();
    const state = (nav?.extras.state as any) || history.state || {};
    this.table = state.table ?? null;

    if (!this.table) {
      this.router.navigate(['/gestao/mesas']);
    }
  }

  get statusClass() {
    const s = this.table?.status || '';
    return {
      disp: s === 'Disponível',
      ocup: s === 'Ocupada',
      res: s === 'Reservada'
    };
  }

  back() { this.router.navigate(['/gestao/mesas']); }

  marcarDisponivel() { if (this.table) this.table.status = 'Disponível'; }
  marcarOcupada() { if (this.table) this.table.status = 'Ocupada'; }
  marcarReservada() { if (this.table) this.table.status = 'Reservada'; }

  startEdit() {
    if (!this.table) return;
    this.draft = { ...this.table };
    this.isEditing = true;
  }
  cancelEdit() {
    this.isEditing = false;
    this.draft = null;
  }
  saveEdit() {
    if (this.table && this.draft) this.table = { ...this.draft };
    this.isEditing = false;
    this.draft = null;
  }
}
