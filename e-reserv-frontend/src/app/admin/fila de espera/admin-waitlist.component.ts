import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ToggleOnClickDirective } from '../../core/directives/toggle-on-click.directive';
import { MatTooltipModule } from '@angular/material/tooltip';

type WaitItem = {
  id: number;
  name: string;
  people: number;
  phone: string;
  notes?: string;
  priority?: boolean;
  waitingMin: number;
};

@Component({
  standalone: true,
  selector: 'app-admin-waitlist',
  imports: [CommonModule, MatIconModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatTooltipModule, ToggleOnClickDirective],
  templateUrl: './admin-waitlist.component.html',
  styleUrl: './admin-waitlist.component.css'
})
export class AdminWaitlistComponent {
  list = signal<WaitItem[]>([
    { id: 1, name: 'Fulano de Tal', people: 4, phone: '+55 11 2345-6789', notes: 'Idoso, cadeirante', priority: true, waitingMin: 35 },
    { id: 2, name: 'Ciclano da Silva', people: 6, phone: '+55 11 2345-6789', waitingMin: 39 },
    { id: 3, name: 'Maria José João', people: 10, phone: '+55 11 2345-6789', notes: '2 crianças', waitingMin: 41 },
  ]);

  get inQueue() { return this.list().length; }
  get avgTime() { return 18; }
  get servedToday() { return 37; }
  get dropoutRate() { return 8; }

  call(id: number){ /* trigger notification */ }
  checkIn(id: number){ /* convert to seated */ }
  remove(id: number){ this.list.set(this.list().filter(i => i.id !== id)); }
}
