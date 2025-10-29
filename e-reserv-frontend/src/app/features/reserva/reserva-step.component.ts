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
import { ToggleOnClickDirective } from '../../core/directives/toggle-on-click.directive';
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
    ToggleOnClickDirective,
  ],
  templateUrl: './reserva-step.component.html',
  styleUrl: './reserva-step.component.css' 
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
