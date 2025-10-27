import { Component, inject, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

type NewReservation = {
  id: string;
  status: string;
  assignedTable: string;
  date: string; // yyyy-MM-dd
  time: string; // HH:mm
  people: number;
  area: string;
  name: string;
  phone: string;
  email: string;
  cpf: string;
  notes?: string;
  origin?: string;
};

@Component({
  standalone: true,
  selector: 'app-admin-reservation-details',
  imports: [CommonModule, RouterModule, MatIconModule, MatButtonModule, DatePipe],
  templateUrl: './admin-reservation-details.component.html',
  styleUrl: './admin-reservation-details.component.css'
})
export class AdminReservationDetailsComponent implements OnInit {
  private router = inject(Router);

  reservation!: NewReservation | null;

  ngOnInit(): void {
    const nav = this.router.getCurrentNavigation();
    const state = (nav?.extras.state as any) || history.state || {};
    this.reservation = state.reservation ?? null;
    // if accessed directly without state, go back to list
    if (!this.reservation) {
      this.router.navigate(['/gestao/reservas']);
    }
  }

  get statusClass() {
    const s = this.reservation?.status?.toLowerCase() || '';
    return {
      pending: s.includes('pend'),
      confirmed: s.includes('confirm'),
      cancelled: s.includes('cancel')
    };
  }

  // Placeholder actions
  confirm() { if (this.reservation) this.reservation.status = 'Confirmada'; }
  cancel() { if (this.reservation) this.reservation.status = 'Cancelada'; }
  back() { this.router.navigate(['/gestao/reservas']); }
}

