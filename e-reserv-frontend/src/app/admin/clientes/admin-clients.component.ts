import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ToggleOnClickDirective } from '../../core/directives/toggle-on-click.directive';
import { AdminNewClientDialogComponent, NewClientPayload } from './component';

type ClientStatus = 'VIP' | 'Regular' | 'Bloqueado';

export interface ClientItem {
  id: number;
  name: string;
  email: string;
  phone: string;
  status: ClientStatus;
  totalReservations: number;
  lastVisit: string; // dd/MM/yyyy
}

@Component({
  standalone: true,
  selector: 'app-admin-clients',
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    ToggleOnClickDirective,
    AdminNewClientDialogComponent,
  ],
  templateUrl: './admin-clients.component.html',
  styleUrl: './admin-clients.component.css',
})
export class AdminClientsComponent {
  // Mock de clientes para compor a tela
  private data = signal<ClientItem[]>([
    { id: 1, name: 'Fulano Beltrano Silveira', email: 'fulano@email.com', phone: '+55 11 2345-6789', status: 'VIP', totalReservations: 15, lastVisit: '28/10/2025' },
    { id: 2, name: 'Fulano Beltrano Silveira', email: 'fulano@email.com', phone: '+55 11 2345-6789', status: 'VIP', totalReservations: 15, lastVisit: '28/10/2025' },
    { id: 3, name: 'Fulano Beltrano Silveira', email: 'fulano@email.com', phone: '+55 11 2345-6789', status: 'VIP', totalReservations: 15, lastVisit: '28/10/2025' },
    { id: 4, name: 'Fulano Beltrano Silveira', email: 'fulano@email.com', phone: '+55 11 2345-6789', status: 'VIP', totalReservations: 15, lastVisit: '28/10/2025' },
    { id: 5, name: 'Fulano Beltrano Silveira', email: 'fulano@email.com', phone: '+55 11 2345-6789', status: 'VIP', totalReservations: 15, lastVisit: '28/10/2025' },
    { id: 6, name: 'Fulano Beltrano Silveira', email: 'fulano@email.com', phone: '+55 11 2345-6789', status: 'VIP', totalReservations: 15, lastVisit: '28/10/2025' },
    { id: 7, name: 'Fulano Beltrano Silveira', email: 'fulano@email.com', phone: '+55 11 2345-6789', status: 'VIP', totalReservations: 15, lastVisit: '28/10/2025' },
    { id: 8, name: 'Fulano Beltrano Silveira', email: 'fulano@email.com', phone: '+55 11 2345-6789', status: 'VIP', totalReservations: 15, lastVisit: '28/10/2025' },
  ]);

  // Filtros
  query = signal('');
  statusFilter = signal<ClientStatus | 'Todos'>('Todos');
  orderBy = signal<'nome_asc' | 'nome_desc' | 'reservas_desc' | 'reservas_asc'>('nome_asc');

  // Lista derivada
  list = computed(() => {
    let items = this.data();
    const q = this.query().trim().toLowerCase();
    if (q) {
      items = items.filter(i =>
        i.name.toLowerCase().includes(q) ||
        i.email.toLowerCase().includes(q) ||
        i.phone.replace(/\s|\+|\-/g, '').includes(q.replace(/\s|\+|\-/g, ''))
      );
    }

    const st = this.statusFilter();
    if (st !== 'Todos') items = items.filter(i => i.status === st);

    const ord = this.orderBy();
    items = [...items].sort((a, b) => {
      switch (ord) {
        case 'nome_desc': return b.name.localeCompare(a.name);
        case 'reservas_desc': return b.totalReservations - a.totalReservations;
        case 'reservas_asc': return a.totalReservations - b.totalReservations;
        default: return a.name.localeCompare(b.name);
      }
    });

    return items;
  });

  // Métricas simples do topo
  get totalClients() { return this.data().length; }
  get vipCount() { return this.data().filter(c => c.status === 'VIP').length; }
  get newThisMonth() { return 156; }
  get returnRate() { return 68; }

  // Ações
  isNewOpen = false;
  addClient() { this.isNewOpen = true; }
  closeNewClient(){ this.isNewOpen = false; }
  onConfirmClient(payload: NewClientPayload){
    const nextId = Math.max(0, ...this.data().map(d => d.id)) + 1;
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();
    const item: ClientItem = {
      id: nextId,
      name: payload.name,
      email: payload.email,
      phone: payload.phone,
      status: 'Regular',
      totalReservations: 0,
      lastVisit: `${dd}/${mm}/${yyyy}`,
    };
    this.data.set([item, ...this.data()]);
    this.isNewOpen = false;
  }
  editClient(id: number) { /* implementar depois */ }
  viewClient(id: number) { /* implementar depois */ }
  deleteClient(id: number) { this.data.set(this.data().filter(c => c.id !== id)); }
}
