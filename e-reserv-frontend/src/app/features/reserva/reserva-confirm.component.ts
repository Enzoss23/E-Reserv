import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { ReservationService } from '../../core/services/reservation.service';
import { MatIconModule } from '@angular/material/icon';
import { HttpClient } from '@angular/common/http';
import { Unit } from '../../core/models/unit.model';

@Component({
  standalone: true,
  selector: 'app-reserva-confirm',
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatCheckboxModule, MatButtonModule, MatIconModule],
  templateUrl: './reserva-confirm.component.html',
  styleUrl: './reserva-confirm.component.css',
})
export class ReservaConfirmComponent implements OnInit {
  unit = signal<Unit | null>(null);
  payload: any;
  form = this.fb.group({
    name: [ '', [Validators.required, Validators.minLength(2)]],
    phone: [ '', [Validators.required, Validators.minLength(8)]],
    email: [ '', [Validators.required, Validators.email]],
  });

  constructor(private fb: FormBuilder, private router: Router, private reservation: ReservationService, private http: HttpClient) {}

  ngOnInit(): void {
    if (this.router.getCurrentNavigation()?.extras.state) {
      this.payload = this.router.getCurrentNavigation()?.extras.state?.['data'];
      this.unit.set(this.payload.unit);
      console.log(this.payload)
    }
  }

  confirmar() {
    if (this.form.invalid) return;
    const payload = {...this.payload, 
      customerName: this.form.get('name')?.value,
      customerPhone: this.form.get('phone')?.value,
      customerEmail: this.form.get('email')?.value,
    };
    console.log('Reserva pronta para envio', payload);
    alert('Reserva registrada localmente. Integração com API pendente.');
  }
}
