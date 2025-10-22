import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MAT_DATE_LOCALE, DateAdapter } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router } from '@angular/router';
import { ReservationService } from '../../core/services/reservation.service';
import { HttpClient } from '@angular/common/http';
import { Unit } from '../../core/models/unit.model';

@Component({
  standalone: true,
  selector: 'app-reserva-step',
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'pt-BR' }],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
  ],
  template: `
    <div class="unit-page">
      <div class="cover-wrap">
        <img src="/assets/Mask group.png" alt="Foto do estabelecimento" class="cover-img" />
        <img src="/assets/image 8.png" alt="Marca" class="brand-overlay" />
      </div>

      <div class="container center-block compact">
        <h2 class="unit-title">{{ unit()?.name }}</h2>
        <div class="unit-address">{{ unit()?.address }}</div>

        <form [formGroup]="form" class="form-wrap compact">
          <div class="grid-2">
            <div class="field-block">
              <div class="field-title">Data da reserva</div>
              <mat-form-field appearance="fill" class="field">
                <mat-icon matPrefix>event</mat-icon>
                <input matInput [matDatepicker]="picker" placeholder="dd/mm/aaaa" formControlName="date" />
                <mat-datepicker #picker></mat-datepicker>
              </mat-form-field>
            </div>

            <div class="field-block">
              <div class="field-title">Horário</div>
              <mat-form-field appearance="fill" class="field">
                <mat-icon matPrefix>schedule</mat-icon>
                <input matInput placeholder="12:00h" formControlName="time" />
              </mat-form-field>
            </div>

            <div class="field-block">
              <div class="field-title">Quantidade de pessoas</div>
              <mat-form-field appearance="fill" class="field">
                <mat-icon matPrefix>group</mat-icon>
                <input matInput type="number" min="1" formControlName="people" />
              </mat-form-field>
            </div>

            <div class="field-block">
              <div class="field-title">Ambiente</div>
              <mat-form-field appearance="fill" class="field">
                <mat-icon matPrefix>cottage</mat-icon>
                <select matNativeControl formControlName="area">
                  <option value="salao">Salão</option>
                  <option value="lounge">Lounge bar</option>
                  <option value="externa">Área externa</option>
                  <option value="bar">Bar</option>
                </select>
              </mat-form-field>
            </div>
          </div>

          <div class="field-block full">
            <div class="field-title">Informações adicionais</div>
            <mat-form-field appearance="fill" class="field textarea">
              <textarea matInput rows="3" formControlName="notes" placeholder="Precisa de atendimento especializado ou alguma outra particularidade?"></textarea>
            </mat-form-field>
          </div>

          <div class="actions">
            <button mat-raised-button color="primary" (click)="continuar()" [disabled]="form.invalid">Continuar</button>
          </div>
        </form>
      </div>
    </div>
  `,
  styles: [
    `.cover-wrap{ position:relative; width:100vw; left:50%; right:50%; margin-left:-50vw; margin-right:-50vw; }`,
    `.cover-img{ width:100%; height:360px; object-fit:cover; display:block; }`,
    `.brand-overlay{ position:absolute; left:50%; transform:translateX(-50%); bottom:-48px; height:161px; width:auto; border-radius:4px; }`,
    `.center-block{ text-align:center; margin-top:52px; }`,
    `.unit-title{ margin:10px 0 2px; color:#0A4697; font-weight:700; font-size:22px; }`,
    `.unit-address{ color:#7d8a97; font-size:12px; }`,
    `.form-wrap{ max-width:720px; margin:12px auto 0; }`,
    `.grid-2{ display:grid; grid-template-columns:repeat(auto-fit,minmax(260px,1fr)); gap:18px 28px; }`,
    `.full{ width:100%; margin-top:8px; }`,
    `.actions{ display:flex; justify-content:center; margin-top:6px; }`,
    `.field-block{ text-align:left; }`,
    `.field-title{ color:#155BB5; font-weight:700; margin-bottom:6px; }`,
    `.field{ width:100%; }`,
    `.compact .mat-mdc-form-field-infix{ padding:6px 0 2px !important; min-height:36px; }`,
    `.compact .mat-mdc-text-field-wrapper{ height:40px; background:transparent !important; }`,
    `.compact .mat-mdc-form-field-subscript-wrapper{ height:0; }`,
    `.compact .mdc-notched-outline__notch{ padding:0 6px; }`,
    `.compact .mdc-line-ripple{ --mdc-filled-text-field-active-indicator-color: #B0BEC5; }`,
    `.compact .mat-mdc-form-field-icon-prefix{ color:#5F7EB3; margin-right:6px; }`,
    `.textarea .mat-mdc-text-field-wrapper{ height:auto; }`,
    `.compact button.mat-mdc-raised-button{ min-height:36px; padding:0 16px; }`,
  ]
})
export class ReservaStepComponent implements OnInit {
  unit = signal<Unit | null>(null);
  form = this.fb.group({
    date: [new Date(), Validators.required],
    time: ['12:00', [Validators.required, Validators.pattern(/^\d{2}:\d{2}$/)]],
    people: [2, [Validators.required, Validators.min(1), Validators.max(20)]],
    area: ['lounge', Validators.required],
    notes: ['']
  });

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private router: Router, private reservation: ReservationService, private http: HttpClient, private dateAdapter: DateAdapter<Date>) {}

  ngOnInit(): void {
    this.dateAdapter.setLocale('pt-BR');
    const id = this.route.snapshot.paramMap.get('id');
    this.http.get<Unit[]>('/assets/mock/units.json').subscribe(list => {
      this.unit.set(list.find(u => u.id === id) || null);
    });
  }

  continuar() {
    if (this.form.invalid) return;
    const id = this.route.snapshot.paramMap.get('id')!;
    const f = this.form.value;
    const pad = (n: number) => n.toString().padStart(2, '0');
    const d = f.date as Date;
    const iso = `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}`;
    this.reservation.setDetails({
      unitId: id,
      date: iso,
      time: f.time!,
      people: f.people!,
      area: f.area!,
      notes: f.notes || undefined,
    });
    this.router.navigate(['/unidade', id, 'reserva', 'confirmar']);
  }
}
