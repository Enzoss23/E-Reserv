import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
// FormsModule no longer required here (kept in dialog component)
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { AdminNewReservationDialogComponent } from './admin-new-reservation-dialog.component';

@Component({
  standalone: true,
  selector: 'app-admin-reservations',
  imports: [CommonModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatTableModule, AdminNewReservationDialogComponent],
  templateUrl: './admin-reservations.component.html',
  styleUrl: 'admin-reservations.component.css'
})
export class AdminReservationsComponent{
  cols = ['id','cliente','horario','pessoas','ambiente','info','origem','status','acoes'];

  isNewOpen = false;

  openNew(){
    this.isNewOpen = true;
  }

  closeNew(){
    this.isNewOpen = false;
  }

  onConfirmNew(payload: any){
    // Integrate with API/service here.
    // console.log('Reserva criada:', payload);
    this.isNewOpen = false;
  }
}

