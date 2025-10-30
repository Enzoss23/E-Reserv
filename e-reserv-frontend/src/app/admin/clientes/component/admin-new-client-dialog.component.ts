import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

export interface NewClientPayload {
  name: string;
  email: string;
  phone: string;
}

@Component({
  standalone: true,
  selector: 'app-admin-new-client-dialog',
  imports: [CommonModule, FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule],
  templateUrl: './admin-new-client-dialog.component.html',
  styleUrl: './admin-new-client-dialog.component.css'
})
export class AdminNewClientDialogComponent {
  @Output() close = new EventEmitter<void>();
  @Output() confirm = new EventEmitter<NewClientPayload>();

  form: NewClientPayload = {
    name: '',
    email: '',
    phone: '',
  };

  onCancel(){ this.close.emit(); }
  onConfirm(){ this.confirm.emit(this.form); }
}

