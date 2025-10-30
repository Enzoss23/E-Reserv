import { Component, EventEmitter, Output, Input, OnChanges, SimpleChanges, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { ToggleOnClickDirective } from '../../core/directives/toggle-on-click.directive';

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
export class AdminNewReservationDialogComponent implements OnInit, OnChanges {
  @Output() close = new EventEmitter<void>();
  @Output() confirm = new EventEmitter<any>();
  @Input() data: any | null = null; // dados para edição/visualização
  @Input() mode: 'create' | 'edit' | 'view' = 'create';

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

  ngOnInit(): void { this.applyData(); }
  ngOnChanges(changes: SimpleChanges): void { if (changes['data']) this.applyData(); }

  private applyData() {
    if (this.data && typeof this.data === 'object') {
      this.form = {
        ...this.form,
        ...this.data
      };
    }
  }

  get isView(){ return this.mode === 'view'; }
}
