import { Component, EventEmitter, Output, Directive, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule, MatSelect } from '@angular/material/select';

/* ---------- Diretiva: click no gatilho => toggle (abre/fecha) ---------- */
@Directive({
  selector: 'mat-select[toggleOnClick]',
  standalone: true
})
export class ToggleOnClickDirective {
  constructor(private sel: MatSelect) {}
  @HostListener('click', ['$event'])
  onClick(ev: MouseEvent) {
    ev.preventDefault();
    ev.stopPropagation();
    this.sel.panelOpen ? this.sel.close() : this.sel.open();
  }
}
/* --------------------------------------------------------------------- */

@Component({
  standalone: true,
  selector: 'app-admin-new-reservation-dialog',
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    ToggleOnClickDirective 
  ],
  templateUrl: './admin-new-reservation-dialog.component.html',
  styleUrl: './admin-new-reservation-dialog.component.css' 
})
export class AdminNewReservationDialogComponent {
  @Output() close = new EventEmitter<void>();
  @Output() confirm = new EventEmitter<any>();

  statuses = ['Pendente', 'Confirmada', 'Cancelada'];
  mesas = Array.from({ length: 30 }, (_, i) => `Mesa ${i + 1}`);
  ambientes = ['Lounge bar', 'Salão principal', 'Varanda', 'Mezanino'];
  peopleOptions = Array.from({ length: 20 }, (_, i) => i + 1);

  form = {
    status: 'Pendente',
    assignedTable: 'Mesa 1',
    date: '',
    time: '',
    people: 1,
    area: 'Lounge bar',
    name: '',
    phone: '',
    email: '',
    cpf: '',
    notes: ''
  };

  onCancel() { this.close.emit(); }
  onConfirm() { this.confirm.emit(this.form); }
}
