import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

type Settings = {
  restaurantName: string;
  openingHour: string; // HH:mm
  closingHour: string; // HH:mm
  maxPartySize: number;
  autoConfirmOnline: boolean;
  notifyEmail: boolean;
  notifySms: boolean;
  theme: 'light' | 'dark';
  defaultArea: string;
};

const KEY = 'admin.settings';

@Component({
  standalone: true,
  selector: 'app-admin-settings',
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatCheckboxModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './admin-settings.component.html',
  styleUrl: './admin-settings.component.css'
})
export class AdminSettingsComponent implements OnInit {
  form: Settings = {
    restaurantName: 'Corrientes 348 - Barra da Tijuca',
    openingHour: '11:30',
    closingHour: '23:30',
    maxPartySize: 10,
    autoConfirmOnline: true,
    notifyEmail: true,
    notifySms: false,
    theme: 'light',
    defaultArea: 'Salão Principal',
  };

  ngOnInit(): void {
    const raw = sessionStorage.getItem(KEY) || localStorage.getItem(KEY);
    if (raw) {
      try { this.form = { ...this.form, ...(JSON.parse(raw) as Settings) }; } catch {}
    }
  }

  save() {
    localStorage.setItem(KEY, JSON.stringify(this.form));
  }

  reset() {
    localStorage.removeItem(KEY);
    sessionStorage.removeItem(KEY);
    this.ngOnInit();
  }
}

