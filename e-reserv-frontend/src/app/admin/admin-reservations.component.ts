import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { AdminNewReservationDialogComponent } from './component/admin-new-reservation-dialog.component';
import { Router } from '@angular/router';
import { Reservation, ReservationPayload, ReservationService } from './services/reservation.service';

@Component({
  standalone: true,
  selector: 'app-admin-reservations',
  imports: [CommonModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatTableModule, AdminNewReservationDialogComponent],
  templateUrl: './admin-reservations.component.html',
  styleUrl: 'admin-reservations.component.css'
})
export class AdminReservationsComponent{
  private router = inject(Router);
  private reservationService = inject(ReservationService);

  cols = ['id','cliente','horario','pessoas','ambiente','info','origem','status','acoes'];

  isNewOpen = false;
  editingData: Reservation | null = null;
  dialogMode: 'create' | 'edit' | 'view' = 'create';
  reservations: Reservation[] = [];

  openNew(){
    this.isNewOpen = true;
    this.dialogMode = 'create';
  }

  closeNew(){
    this.isNewOpen = false;
    this.editingData = null;
    this.dialogMode = 'create';
  }

  onConfirmNew(payload: ReservationPayload){
    if (this.editingData) {
      const updated: Reservation = { ...this.editingData, ...payload };
      this.reservations = this.reservations.map(r => r.id === updated.id ? updated : r);
      this.isNewOpen = false;
      this.editingData = null;
      return;
    }

    this.reservationService.create(payload).subscribe((reservation) => {
      this.reservations = [reservation, ...this.reservations];
      this.isNewOpen = false;
      // Para abrir detalhes automaticamente, descomente:
      // this.router.navigate(['/gestao/reservas', reservation.id], { state: { reservation } });
    });
  }

  // Métricas
  get confirmedCount() { return this.reservations.filter(r => r.status?.toLowerCase().includes('confirm')).length; }
  get pendingCount() { return this.reservations.filter(r => r.status?.toLowerCase().includes('pend')).length; }
  get cancelledCount() { return this.reservations.filter(r => r.status?.toLowerCase().includes('cancel')).length; }

  statusClass(s: string) {
    const v = (s || '').toLowerCase();
    return {
      'status-pill': true,
      confirmed: v.includes('confirm'),
      pending: v.includes('pend'),
      cancelled: v.includes('cancel')
    };
  }

  openEdit(item: Reservation) {
    this.editingData = item;
    this.isNewOpen = true;
    this.dialogMode = 'edit';
  }

  openView(item: Reservation){
    // Abre como tela (rota de detalhes), enviando os dados no state
    this.router.navigate(['/gestao/reservas', item.id], { state: { reservation: item } });
  }
}
