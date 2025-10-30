import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/home/home.component').then((m) => m.HomeComponent),
  },
  // Admin / Gestão
  {
    path: 'gestao/login',
    loadComponent: () => import('./admin/login/admin-login.component').then(m => m.AdminLoginComponent)
  },
  {
    path: 'gestao',
    loadComponent: () => import('./admin/admin-shell.component').then(m => m.AdminShellComponent),
    children: [
      {
        path: '',
        loadComponent: () => import('./admin/dashboard e calendar/admin-dashboard.component').then(m => m.AdminDashboardComponent)
      },
      {
        path: 'reservas',
        loadComponent: () => import('./admin/admin-reservations.component').then(m => m.AdminReservationsComponent)
      },
      {
        path: 'reservas/:id',
        loadComponent: () => import('./admin/admin-reservation-details.component').then(m => m.AdminReservationDetailsComponent)
      },
      {
        path: 'fila',
        loadComponent: () => import('./admin/fila de espera/admin-waitlist.component').then(m => m.AdminWaitlistComponent)
      },
      {
        path: 'mesas',
        loadComponent: () => import('./admin/mesas/admin-tables.component').then(m => m.AdminTablesComponent)
      },
      {
        path: 'clientes',
        loadComponent: () => import('./admin/clientes/admin-clients.component').then(m => m.AdminClientsComponent)
      },
    ]
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
