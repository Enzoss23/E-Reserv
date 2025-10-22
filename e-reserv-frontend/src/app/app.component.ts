import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, MatToolbarModule],
  template: `
    <mat-toolbar color="primary" *ngIf="showPublicToolbar()">
      <img src="assets/image 8.png" alt="Logo" height="57px" style="margin-right:12px" />
      <span class="spacer"></span>
    </mat-toolbar>
    <router-outlet></router-outlet>
    <footer style="text-align:center; padding:16px; color:#7d8a97; font-size:14px;">
     Desenvolvido por E-Reserv &copy;
    </footer>
  `
})
export class AppComponent {
  title = signal('E-Reserv');
  constructor(public router: Router) {}
  showPublicToolbar() { return !this.router.url.startsWith('/gestao'); }
}
