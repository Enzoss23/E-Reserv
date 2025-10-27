import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
// FormsModule no longer required here (kept in dialog component)
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { AdminNewReservationDialogComponent } from './component/admin-new-reservation-dialog.component';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-admin-reservations',
  imports: [CommonModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatTableModule, AdminNewReservationDialogComponent],
  templateUrl: './admin-reservations.component.html',
  styleUrl: 'admin-reservations.component.css'
})
export class AdminReservationsComponent{
  constructor(private router: Router) {}
  cols = ['id','cliente','horario','pessoas','ambiente','info','origem','status','acoes'];

  isNewOpen = false;

  openNew(){
    this.isNewOpen = true;
  }

  closeNew(){
    this.isNewOpen = false;
  }

  onConfirmNew(payload: any){
    // Gera um ID simples e navega para detalhes passando o estado
    const idNum = Math.floor(Math.random() * 900) + 100; // 3 dígitos
    const id = idNum.toString().padStart(3, '0');
    const reservation = { id, origin: 'Site', ...payload };
    this.isNewOpen = false;
    this.router.navigate(['/gestao/reservas', id], { state: { reservation } });
  }
}
