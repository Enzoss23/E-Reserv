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
  template: `
    <div class="unit-page">
      <div class="cover-wrap">
        <img src="/assets/Mask group.png" alt="Foto do estabelecimento" class="cover-img" />
        <img src="/assets/image 8.png" alt="Marca" class="brand-overlay" />
      </div>

      <div class="container center-block">
        <h2 class="unit-title">{{ unit()?.name }}</h2>
        <div class="unit-address">{{ unit()?.address }}</div>

        <h3 class="section-title">Confirmar dados da reserva</h3>
        <div class="section-sub">Informe seus dados para prosseguir</div>

        <form [formGroup]="form" class="form-wrap" style="max-width:800px; margin-left:auto; margin-right:auto;">
          <div class="grid-2">
            <div class="field-block">
              <div class="field-title">Nome</div>
              <mat-form-field appearance="fill" class="field">
                <mat-icon matPrefix>person</mat-icon>
                <input matInput formControlName="name" placeholder="Nome" />
              </mat-form-field>
            </div>
            <div class="field-block">
              <div class="field-title">Telefone</div>
              <mat-form-field appearance="fill" class="field">
                <mat-icon matPrefix>phone</mat-icon>
                <input matInput formControlName="phone" placeholder="Telefone"/>
              </mat-form-field>
            </div>
            <div class="field-block full">
              <div class="field-title">E-mail</div>
              <mat-form-field appearance="fill" class="field">
                <mat-icon matPrefix>mail</mat-icon>
                <input matInput type="email" formControlName="email" placeholder="E-mail" />
              </mat-form-field>
            </div>
          </div>

          <p class="terms">
            Ao continuar, você aceita os <a href="#" class="link">Termos de Serviço e Reserva</a> em {{ unit()?.name }} - {{ unit()?.address }}, e especificamente aceita que a E-reserv compartilhe suas informações com {{ unit()?.name }} para realizar a transação solicitada.
          </p>

          <div class="actions">
            <button mat-raised-button color="primary" type="button" [disabled]="form.invalid" (click)="confirmar()">Confirmar Reserva</button>
          </div>
        </form>
      </div> 
    </div>
  `,
  styles: [
    `.cover-wrap{ position:relative; width:100vw; margin-left:calc(50% - 50vw); margin-right:calc(50% - 50vw); }`,
    `.cover-img{ width:100%; height:360px; object-fit:cover; display:block; }`,
    `.brand-overlay{ position:absolute; left:50%; transform:translateX(-50%); bottom:-48px; height:161px; width:auto; border-radius:4px; }`,
    `.center-block{ text-align:center; margin-top:52px; }`,
    `.unit-title{ margin:10px 0 4px; color:#0A4697; font-weight:700; font-size:26px; }`,
    `.unit-address{ color:#7d8a97; font-size:12px; }`,
    `.section-title{ margin:18px 0 2px; color:#155BB5; font-weight:700; }`,
    `.section-sub{ color:#7d8a97; margin-bottom:8px; }`,
    `.form-wrap{ width:100%; }`,
    `.grid-2{ display:grid; grid-template-columns:repeat(auto-fit,minmax(260px,1fr)); gap:18px 28px; }`,
    `.field-block{ text-align:left; }`,
    `.field-title{ color:#155BB5; font-weight:700; margin-bottom:6px; }`,
    `.field{ width:100%; }`,
    `.mat-mdc-form-field-icon-prefix{ color:#5F7EB3; margin-right:6px; }`,
    `.terms{ font-size:12px; color:#666; margin-top:6px; }`,
    `.link{ color:#0A4697; text-decoration:none; font-weight:700; }`,
    `.actions{ display:flex; justify-content:center; gap:8px; margin-top:12px; }`,
  ]
})
export class ReservaConfirmComponent implements OnInit {
  unit = signal<Unit | null>(null);
  form = this.fb.group({
    name: [ '', [Validators.required, Validators.minLength(2)]],
    phone: [ '', [Validators.required, Validators.minLength(8)]],
    email: [ '', [Validators.required, Validators.email]],
  });

  constructor(private fb: FormBuilder, private router: Router, private reservation: ReservationService, private http: HttpClient) {}

  ngOnInit(): void {
    this.reservation.loadFromStorage();
    const d = this.reservation.details();
    const unitId = d?.unitId;
    if (unitId) {
      this.http.get<Unit[]>('/assets/mock/units.json').subscribe(list => {
        this.unit.set(list.find(u => u.id === unitId) || null);
      });
    }
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
