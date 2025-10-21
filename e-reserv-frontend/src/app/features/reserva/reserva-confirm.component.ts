import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { ReservationService } from '../../core/services/reservation.service';

@Component({
  standalone: true,
  selector: 'app-reserva-confirm',
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatCheckboxModule, MatButtonModule],
  template: `
    <div class="container">
      <div class="card" style="overflow:hidden">
        <img src="/assets/cover.svg" alt="cover" style="width:100%; max-height:240px; object-fit:cover;" />
      </div>
      <div style="text-align:center; margin-top:-40px">
        <img src="/assets/logo.svg" alt="logo" height="84" />
        <h2 style="margin:12px 0 4px; color:#1a4ea1;">Confirmar dados da reserva</h2>
      </div>

      <form [formGroup]="form" class="container" style="max-width:800px;">
        <div style="display:grid; grid-template-columns:repeat(auto-fit,minmax(240px,1fr)); gap:16px;">
          <mat-form-field appearance="outline">
            <mat-label>Nome</mat-label>
            <input matInput formControlName="name" />
          </mat-form-field>
          <mat-form-field appearance="outline">
            <mat-label>Telefone</mat-label>
            <input matInput formControlName="phone" placeholder="+55 11 99999-9999" />
          </mat-form-field>
          <mat-form-field appearance="outline" style="grid-column:1 / -1;">
            <mat-label>E-mail</mat-label>
            <input matInput type="email" formControlName="email" />
          </mat-form-field>
        </div>

        <p style="font-size:12px; color:#666; margin-top:8px;">
          Ao continuar, você aceita os Termos de Serviço e Reserva. Suas informações serão usadas para realizar a transação.
        </p>

        <div style="display:flex; justify-content:flex-end; gap:8px; margin-top:8px;">
          <button mat-button type="button" (click)="voltar()">Voltar</button>
          <button mat-raised-button color="primary" type="button" [disabled]="form.invalid" (click)="confirmar()">Confirmar Reserva</button>
        </div>
      </form>
    </div>
  `
})
export class ReservaConfirmComponent implements OnInit {
  form = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    phone: ['', [Validators.required, Validators.minLength(8)]],
    email: ['', [Validators.required, Validators.email]],
  });

  constructor(private fb: FormBuilder, private router: Router, private reservation: ReservationService) {}

  ngOnInit(): void {
    this.reservation.loadFromStorage();
  }

  voltar() {
    window.history.back();
  }

  confirmar() {
    if (this.form.invalid) return;
    this.reservation.setCustomer(this.form.value as any);
    const payload = this.reservation.buildPayload();
    console.log('Reserva pronta para envio', payload);
    alert('Reserva registrada localmente. Integração com API pendente.');
    this.reservation.clear();
    this.router.navigateByUrl('/');
  }
}
