import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'unidade/:id',
    loadComponent: () =>
      import('./features/unit/unit.component').then((m) => m.UnitComponent),
  },
  {
    path: 'unidade/:id/reserva',
    loadComponent: () =>
      import('./features/reserva/reserva-step.component').then((m) => m.ReservaStepComponent),
  },
  {
    path: 'unidade/:id/reserva/confirmar',
    loadComponent: () =>
      import('./features/reserva/reserva-confirm.component').then((m) => m.ReservaConfirmComponent),
  },
  { path: '**', redirectTo: '' },
];

