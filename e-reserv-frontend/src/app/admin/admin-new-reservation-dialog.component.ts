import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  standalone: true,
  selector: 'app-admin-new-reservation-dialog',
  imports: [
    CommonModule, FormsModule,
    MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule
  ],
  templateUrl: './admin-new-reservation-dialog.component.html',
  /* use styleUrls se sua versão do Angular não suportar styleUrl */
  styleUrl: './admin-new-reservation-dialog.component.css'
})
export class AdminNewReservationDialogComponent {
  @Output() close = new EventEmitter<void>();
  @Output() confirm = new EventEmitter<any>();

  form = {
    date: '',
    time: '',
    people: 1,
    area: '',
    name: '',
    phone: '',
    email: '',
    notes: ''
  };

  onCancel(){ this.close.emit(); }
  onConfirm(){ this.confirm.emit(this.form); }
}
