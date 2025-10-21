import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatToolbarModule],
  template: `
    <mat-toolbar color="primary">
      <img src="assets/image 8.png" alt="Logo" height="50" style="margin-right:12px" />
      <span class="spacer"></span>
    </mat-toolbar>
    <router-outlet></router-outlet>
  `
})
export class AppComponent {
  title = signal('E-Reserv');
}

