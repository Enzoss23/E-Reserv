import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

type ClientStatus = 'VIP' | 'Regular' | 'Bloqueado';

export interface ClientDetails {
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
  selector: 'app-admin-client-details',
  imports: [CommonModule, RouterModule, MatIconModule, MatButtonModule, FormsModule],
  templateUrl: './admin-client-details.component.html',
  styleUrl: './admin-client-details.component.css'
})
export class AdminClientDetailsComponent implements OnInit {
  private router = inject(Router);

  client: ClientDetails | null = null;
  isEditing = false;
  draft: ClientDetails | null = null;

  ngOnInit(): void {
    const nav = this.router.getCurrentNavigation();
    const state = (nav?.extras.state as any) || history.state || {};
    this.client = state.client ?? null;

    if (!this.client) {
      this.router.navigate(['/gestao/clientes']);
    }
  }

  back() { this.router.navigate(['/gestao/clientes']); }

  isVip() { return this.client?.status === 'VIP'; }
  isBlocked() { return this.client?.status === 'Bloqueado'; }

  marcarVip() { if (this.client) this.client.status = 'VIP'; }
  marcarRegular() { if (this.client) this.client.status = 'Regular'; }
  bloquear() { if (this.client) this.client.status = 'Bloqueado'; }
  desbloquear() { if (this.client && this.client.status === 'Bloqueado') this.client.status = 'Regular'; }

  startEdit() {
    if (!this.client) return;
    this.draft = { ...this.client };
    this.isEditing = true;
  }
  cancelEdit() {
    this.isEditing = false;
    this.draft = null;
  }
  saveEdit() {
    if (this.client && this.draft) this.client = { ...this.draft };
    this.isEditing = false;
    this.draft = null;
  }
}
