import { Component, OnDestroy, OnInit, signal } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { MatButtonModule } from "@angular/material/button";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatNativeDateModule, MAT_DATE_LOCALE } from "@angular/material/core";
import { MatIconModule } from "@angular/material/icon";
import { ActivatedRoute, NavigationExtras, Router } from "@angular/router";
import { ReservationService } from "../../core/services/reservation.service";
import { Unit } from "../../core/models/unit.model";
import { UnitService } from "src/app/core/services/unit.service";
import { Hall } from "src/app/core/models/hall.model";
import { startWith, Subject, takeUntil } from "rxjs";

interface FormValues {
  date: AbstractControl<Date | null>;
  reservationDate: AbstractControl<Date | null>;
  hall: AbstractControl<Hall | null>;
  people: AbstractControl<number | null>;
  observation: AbstractControl<string | null>;
  phone: AbstractControl<string | null>;
  email: AbstractControl<string | null>;
  name: AbstractControl<string | null>;
}

@Component({
  standalone: true,
  selector: "app-reserva-step",
  providers: [{ provide: MAT_DATE_LOCALE, useValue: "pt-BR" }],
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
  templateUrl: "./reserva-step.component.html",
  styleUrl: "./reserva-step.component.css",
})
export class ReservaStepComponent implements OnInit, OnDestroy {
  form!: FormGroup<FormValues>;
  unit = signal<Unit | null>(null);
  availableDates = signal<Date[] | null>([]);
  availableTimes = signal<Date[] | null>([]);
  confirmStep = false;
  private ngUnsubscribe = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private reservationService: ReservationService,
    private unitService: UnitService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group<FormValues>({
      date: this.fb.control(
        { value: null as Date | null, disabled: false },
        Validators.required
      ),
      reservationDate: this.fb.control(
        { value: null as Date | null, disabled: true },
        Validators.required
      ),
      people: this.fb.control(
        { value: null as number | null, disabled: true },
        Validators.required
      ),
      hall: this.fb.control(
        { value: null as Hall | null, disabled: true },
        Validators.required
      ),
      observation: this.fb.control({
        value: null as string | null,
        disabled: false,
      }),
      phone: this.fb.control(
        { value: null as string | null, disabled: false },
        Validators.required
      ),
      name: this.fb.control(
        { value: null as string | null, disabled: false },
        Validators.required
      ),
      email: this.fb.control(
        { value: null as string | null, disabled: false },
        [Validators.required, Validators.email]
      ),
    });
    this.loadUnitParams();
    this.setupConditionalLogic();
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  setupConditionalLogic(): void {
    const date = this.form.controls.date;
    const hall = this.form.controls.hall;
    const people = this.form.controls.people;
    const reservationDate = this.form.controls.reservationDate;

    date.valueChanges
      .pipe(startWith(date.value), takeUntil(this.ngUnsubscribe))
      .subscribe((value) => {
        const isControlValueEmpty = !value || String(value).trim().length === 0;
        if (isControlValueEmpty) {
          hall.disable();
        } else {
          hall.enable();
        }
        hall.setValue(null);
      });

    hall.valueChanges
      .pipe(startWith(hall.value), takeUntil(this.ngUnsubscribe))
      .subscribe((value) => {
        const isControlValueEmpty = !value || String(value).trim().length === 0;
        if (isControlValueEmpty) {
          people.disable();
        } else {
          people.enable();
        }
        people.setValue(null);
      });

    people.valueChanges
      .pipe(startWith(date.value), takeUntil(this.ngUnsubscribe))
      .subscribe((value) => {
        this.availableTimes.set([]);
        const isControlValueEmpty = !value || String(value).trim().length === 0;
        if (isControlValueEmpty) {
          reservationDate.disable();
        } else {
          reservationDate.enable();
          this.checkAvailable();
        }
        reservationDate.setValue(null);
      });
  }

  private loadUnitParams() {
    const id = Number(this.route.snapshot.paramMap.get("id"));
    this.unitService.findById(id).subscribe({
      next: (res) => {
        this.unit.set(res);
        this.generateFutureDates();
        this.generateTimeArray();
      },
      error: (err) => console.error("Error fetching data:", err),
    });
  }

  private generateFutureDates(): void {
    let availableDates = [];
    let currentDate = new Date();
    let maxDaysAntecedence = this.unit()?.maxDaysAntecedence ?? 30;

    for (let i = 0; i < maxDaysAntecedence; i++) {
      availableDates.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }

    this.availableDates.set(availableDates);
  }

  private checkAvailable() {
    const controls = this.form.controls;
    const params = {
      date: controls.date.value?.toISOString().split("T")[0],
      hall: controls.hall.value?.id,
      quantity: controls.people.value,
    };
    this.reservationService.checkAvailable(params).subscribe({
      next: (res) => {
        if (res.isAvailable) {
          this.generateTimeArray();
        }
      },
      error: (err) => console.error("Error fetching data:", err),
    });
  }

  private generateTimeArray() {
    const dateControl = this.form.controls.date;
    const selectDate = dateControl.value;
    const interval = this.unit()?.intervalBetweenTimes ?? 15;
    if (!selectDate) return;
    const year = selectDate.getFullYear();
    const month = String(selectDate.getMonth() + 1).padStart(2, "0");
    const day = String(selectDate.getDate()).padStart(2, "0");

    const dateTimeStringStart = `${year}-${month}-${day}T${
      this.unit()?.minReservationTime
    }`;
    const dateTimeStringEnd = `${year}-${month}-${day}T${
      this.unit()?.maxReservationTime
    }`;
    const currentTime = new Date(dateTimeStringStart);
    const endTime = new Date(dateTimeStringEnd);
    if (endTime < currentTime) {
      endTime.setDate(endTime.getDate() + 1);
    }
    const times = [];
    const minDate = new Date();
    const minutesAntecedence = this.unit()?.minMinutesAntecedence ?? 30;
    minDate.setMinutes(minDate.getMinutes() + minutesAntecedence);
    while (currentTime <= endTime) {
      if (currentTime > minDate) times.push(new Date(currentTime));
      currentTime.setMinutes(currentTime.getMinutes() + interval);
    }
    this.availableTimes.set(times);
  }

  nextStep() {
    if (
      !this.form.controls.date.valid ||
      !this.form.controls.hall.valid ||
      !this.form.controls.people.valid ||
      !this.form.controls.reservationDate.valid
    )
      return;
    this.confirmStep = true;
  }

  confirmReservation() {
    if (!this.form.valid) return;
    const controls = this.form.controls;
    const payload = {
      hall: controls.hall.value,
      reservationDate: controls.reservationDate.value,
      peopleQuantity: controls.people.value,
      customerName: controls.name.value,
      customerPhone: controls.phone.value,
      customerEmail: controls.email.value,
      observation: controls.observation.value
    }
    this.reservationService.create(payload).subscribe({
      next: (res) => {console.log(res)
      },
      error: (err) => console.error("Error fetching data:", err),
    });
  }
}
