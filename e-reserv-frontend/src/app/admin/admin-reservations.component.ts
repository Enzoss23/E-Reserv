import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';

@Component({
  standalone: true,
  selector: 'app-admin-reservations',
  imports: [CommonModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatTableModule],
  templateUrl: './admin-reservations.component.html',
  styleUrl: 'admin-reservations.component.css'
})
export class AdminReservationsComponent{
  cols = ['id','cliente','horario','pessoas','ambiente','info','origem','status','acoes'];
}

