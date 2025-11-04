import { Component, computed, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ToggleOnClickDirective } from '../../core/directives/toggle-on-click.directive';
import { Router } from '@angular/router';
import { AdminNewTableDialogComponent, NewTablePayload } from './component/admin-new-table-dialog.component';
import { TableService } from '../services/table.service';

type TableStatus = 'Disponível' | 'Ocupada' | 'Reservada';

interface TableItem {
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
  selector: 'app-admin-tables',
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatCheckboxModule,
    MatTooltipModule,
    AdminNewTableDialogComponent,
    ToggleOnClickDirective,
  ],
  templateUrl: './admin-tables.component.html',
  styleUrl: './admin-tables.component.css'
})
export class AdminTablesComponent {
  private router = inject(Router);
  private tableService = inject(TableService);
  // Base data (mocked to match the provided layout)
  private data = signal<TableItem[]>([
    { id: 1, number: 1, name: 'Fulano de Tal', chairs: 4, area: 'Salão Principal', notes: 'Idoso, cadeirante', status: 'Ocupada' },
    { id: 2, number: 2, name: 'Ciclano da Silva', chairs: 6, area: 'Lounge Bar', status: 'Ocupada' },
    { id: 3, number: 3, chairs: 10, area: 'Salão Principal', status: 'Disponível' },
    { id: 4, number: 4, name: 'Maria José João', chairs: 10, area: 'Salão Principal', notes: '2 crianças', status: 'Reservada' },
    { id: 5, number: 5, chairs: 8, area: 'Varanda', status: 'Disponível' },
    { id: 6, number: 6, chairs: 8, area: 'Varanda', status: 'Disponível' },
  ]);

  // Filters
  search = signal('');
  statusFilter = signal<TableStatus | null>(null);
  capacityFilter = signal<number | null>(null);
  areaFilter = signal<string | null>(null);
  orderBy = signal<'numero_asc' | 'numero_desc' | 'nome_asc' | 'nome_desc'>('numero_asc');

  // Sidebar checkboxes (basic state only)
  filterDisponiveis = signal(false);
  filterOcupadas = signal(false);
  filterReservadas = signal(false);
  filterAreas = signal<string[]>([]);

  // Derived lists and metrics
  list = computed(() => {
    let items = this.data();

    const q = this.search().trim().toLowerCase();
    if (q) {
      items = items.filter(i =>
        (i.name ?? '').toLowerCase().includes(q) || `mesa ${i.number}`.includes(q)
      );
    }

    const st = this.statusFilter();
    if (st != null) items = items.filter(i => i.status === st);

    const cap = this.capacityFilter();
    if (cap != null) items = items.filter(i => i.chairs === cap);

    const area = this.areaFilter();
    if (area) items = items.filter(i => i.area === area);

    // Sidebar status toggles
    const fd = this.filterDisponiveis();
    const fo = this.filterOcupadas();
    const fr = this.filterReservadas();
    if (fd || fo || fr) {
      items = items.filter(i =>
        (fd && i.status === 'Disponível') ||
        (fo && i.status === 'Ocupada') ||
        (fr && i.status === 'Reservada')
      );
    }

    const areasAllowed = this.filterAreas();
    if (areasAllowed.length > 0) {
      items = items.filter(i => areasAllowed.includes(i.area));
    }

    const ord = this.orderBy();
    items = [...items].sort((a, b) => {
      switch (ord) {
        case 'numero_desc': return b.number - a.number;
        case 'nome_asc': return (a.name || '').localeCompare(b.name || '');
        case 'nome_desc': return (b.name || '').localeCompare(a.name || '');
        default: return a.number - b.number;
      }
    });

    return items;
  });

  get total() { return this.data().length; }
  get disponiveis() { return this.data().filter(i => i.status === 'Disponível').length; }
  get ocupadas() { return this.data().filter(i => i.status === 'Ocupada').length; }
  get reservadas() { return this.data().filter(i => i.status === 'Reservada').length; }

  
  get query() { return this.search(); }
  set query(v: string) { this.search.set(v); }

  get capacity() { return this.capacityFilter(); }
  set capacity(v: number | null) { this.capacityFilter.set(v); }

  get area() { return this.areaFilter(); }
  set area(v: string | null) { this.areaFilter.set(v); }

  get status() { return this.statusFilter(); }
  set status(v: TableStatus | null) { this.statusFilter.set(v); }

  get order() { return this.orderBy(); }
  set order(v: 'numero_asc' | 'numero_desc' | 'nome_asc' | 'nome_desc') { this.orderBy.set(v); }

  get disp() { return this.filterDisponiveis(); }
  set disp(v: boolean) { this.filterDisponiveis.set(v); }

  get ocup() { return this.filterOcupadas(); }
  set ocup(v: boolean) { this.filterOcupadas.set(v); }

  get resv() { return this.filterReservadas(); }
  set resv(v: boolean) { this.filterReservadas.set(v); }


  isNewOpen = false;
  addTable() { this.isNewOpen = true; }
  closeNewTable(){ this.isNewOpen = false; }
  onConfirmTable(payload: NewTablePayload){
    const nextId = Math.max(0, ...this.data().map(d => d.id)) + 1;
    const item: TableItem = {
      id: nextId,
      number: payload.number ?? nextId,
      name: payload.name || undefined,
      chairs: payload.chairs ?? 0,
      area: payload.area || 'Salão Principal',
      notes: payload.notes || undefined,
      status: (payload.status || 'Disponível') as TableStatus,
    };
    this.data.set([item, ...this.data()]);
    this.isNewOpen = false;
  }
  editTable(id: number) { /* open edit - to implement later */ }
  viewTable(id: number) {
    const item = this.data().find(i => i.id === id);
    if (!item) return;
    this.router.navigate(['/gestao/mesas', id], { state: { table: item } });
  }
  deleteTable(id: number) { this.data.set(this.data().filter(i => i.id !== id)); }

  clearFilters() {
    this.search.set('');
    this.statusFilter.set(null);
    this.capacityFilter.set(null);
    this.areaFilter.set(null);
    this.orderBy.set('numero_asc');
    this.filterDisponiveis.set(false);
    this.filterOcupadas.set(false);
    this.filterReservadas.set(false);
    this.filterAreas.set([]);
  }

  isAreaSelected(name: string) {
    return this.filterAreas().includes(name);
  }

  toggleArea(name: string, checked: boolean) {
    const arr = [...this.filterAreas()];
    const i = arr.indexOf(name);
    if (checked && i === -1) arr.push(name);
    if (!checked && i > -1) arr.splice(i, 1);
    this.filterAreas.set(arr);
  }
}
