import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ToggleOnClickDirective } from '../../../core/directives/toggle-on-click.directive';

export interface NewTablePayload {
  number: number | null;
  name: string;
  chairs: number | null;
  area: string | null;
  status: 'Disponível' | 'Ocupada' | 'Reservada' | null;
  shape: 'Quadrada' | 'Redonda' | 'Retangular' | null;
  nearWindow: boolean;
  wheelchair: boolean;
  privateArea: boolean;
  outdoor: boolean;
  notes: string;
}

@Component({
  standalone: true,
  selector: 'app-admin-new-table-dialog',
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatCheckboxModule,
    ToggleOnClickDirective,
  ],
  templateUrl: './admin-new-table-dialog.component.html',
  styleUrl: './admin-new-table-dialog.component.css'
})
export class AdminNewTableDialogComponent {
  @Output() close = new EventEmitter<void>();
  @Output() confirm = new EventEmitter<NewTablePayload>();

  statuses: Array<'Disponível' | 'Ocupada' | 'Reservada'> = ['Disponível', 'Ocupada', 'Reservada'];
  areas = ['Salão Principal', 'Lounge Bar', 'Varanda', 'Mezanino'];
  shapes: Array<'Quadrada' | 'Redonda' | 'Retangular'> = ['Quadrada', 'Redonda', 'Retangular'];

  form: NewTablePayload = {
    number: null,
    name: '',
    chairs: null,
    area: null,
    status: null,
    shape: null,
    nearWindow: false,
    wheelchair: false,
    privateArea: false,
    outdoor: false,
    notes: ''
  };

  onCancel(){ this.close.emit(); }
  onConfirm(){ this.confirm.emit(this.form); }
}
