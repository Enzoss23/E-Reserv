import { Component, inject, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { AdminNewReservationDialogComponent } from './component/admin-new-reservation-dialog.component';

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
  imports: [CommonModule, RouterModule, MatIconModule, MatButtonModule, DatePipe, FormsModule, AdminNewReservationDialogComponent],
  templateUrl: './admin-reservation-details.component.html',
  styleUrl: './admin-reservation-details.component.css'
})
export class AdminReservationDetailsComponent implements OnInit {
  private router = inject(Router);

  reservation!: NewReservation | null;
  isEditOpen = false;
  isEditing = false;
  draft: NewReservation | null = null;

  ngOnInit(): void {
    const nav = this.router.getCurrentNavigation();
    const state = (nav?.extras.state as any) || history.state || {};
    this.reservation = state.reservation ?? null;

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

  openEdit() { this.isEditOpen = true; }
  closeEdit() { this.isEditOpen = false; }
  onEditConfirm(payload: Partial<NewReservation>) {
    if (this.reservation) {
      this.reservation = { ...this.reservation, ...(payload as any) };
    }
    this.isEditOpen = false;
  }

  // Inline edit helpers
  startInlineEdit() {
    if (!this.reservation) return;
    this.draft = { ...this.reservation };
    this.isEditing = true;
  }
  cancelInlineEdit() {
    this.isEditing = false;
    this.draft = null;
  }
  saveInlineEdit() {
    if (this.reservation && this.draft) {
      this.reservation = { ...this.reservation, ...this.draft };
    }
    this.isEditing = false;
    this.draft = null;
  }
}
