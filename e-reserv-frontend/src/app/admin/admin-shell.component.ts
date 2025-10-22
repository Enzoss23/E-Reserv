import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';

@Component({
  standalone: true,
  selector: 'app-admin-shell',
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive, MatSidenavModule, MatListModule, MatIconModule, MatToolbarModule, MatButtonModule, MatBadgeModule],
  template: `
    <mat-toolbar color="primary" class="topbar">
      <img src="/assets/image 8.png" alt="Logo" class="logo" />
      <span class="title">Corrientes 348 - Barra da Tijuca</span>
      <span class="spacer"></span>
      <button mat-icon-button><mat-icon>search</mat-icon></button>
      <button mat-icon-button><mat-icon>help_outline</mat-icon></button>
      <button mat-icon-button [matBadge]="''" matBadgeColor="warn" matBadgeSize="small"><mat-icon>notifications</mat-icon></button>
      <button mat-button class="user">Usuário Logado </button><mat-icon>arrow_drop_down</mat-icon>
    </mat-toolbar>

    <mat-sidenav-container class="layout with-topbar">
      <mat-sidenav mode="side" opened class="nav">
        <mat-nav-list>
          <a mat-list-item routerLink="/gestao" routerLinkActive="active" [routerLinkActiveOptions]="{ exact: true }"><mat-icon>home</mat-icon><span>Painel inicial</span></a>
          <a mat-list-item routerLink="/gestao/reservas" routerLinkActive="active"><mat-icon>event</mat-icon><span>Reservas</span></a>
          <a mat-list-item href="#"><mat-icon>hourglass_bottom</mat-icon><span>Fila de espera</span></a>
          <a mat-list-item href="#"><mat-icon>table_bar</mat-icon><span>Mesas</span></a>
          <a mat-list-item href="#"><mat-icon>group</mat-icon><span>Clientes</span></a>
          <a mat-list-item href="#"><mat-icon>bar_chart</mat-icon><span>Relatórios</span></a>
          <a mat-list-item href="#"><mat-icon>settings</mat-icon><span>Configurações</span></a>
        </mat-nav-list>
      </mat-sidenav>

      <mat-sidenav-content>
        <div class="content">
          <router-outlet></router-outlet>
          <footer class="foot">Desenvolvido por E-reserv ©</footer>
        </div>
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
  styles: [
    `.logo{ min-height:48px; }`,
    `.layout{ height:calc(100vh - 0px); }`,
    `.with-topbar{ height:calc(100vh - 64px); }`,
    `.nav{ width:240px; border-right:1px solid #e5e9f2; }`,
    `.brand{ display:flex; align-items:center; justify-content:center; padding:11px 0; }`,
    `.brand img{ height:42px; }`,
    `a.mat-list-item .mat-icon, a.mat-mdc-list-item .mat-icon{ margin-right:12px; }`,
    `a.active{ background:#eef4ff; }`,
    `.topbar{ position:sticky; top:0; z-index:1000; }`,
    `.topbar .logo{ height:28px; margin-right:12px; }`,
    `.topbar .title{ font-weight:600; font-size:16px; }`,
    `.user .mat-icon{ margin-left:4px; }`,
    `.content{ padding:16px; }`,
    `.foot{ text-align:center; color:#8a97a5; font-size:13px; padding:16px 0; }`,
    `.spacer{ flex:1 1 auto; }`
  ]
})
export class AdminShellComponent {}

