import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';

@Component({
  standalone: true,
  selector: 'app-admin-reservations',
  imports: [CommonModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatTableModule],
  template: `
    <div class="metrics">
      <div class="metric">Reservas confirmadas<div class="num">—</div></div>
      <div class="metric">Reservas pendentes<div class="num orange">—</div></div>
      <div class="metric">Reservas canceladas<div class="num red">—</div></div>
      <div class="metric">Taxa de ocupação atual<div class="num">—</div></div>
      <div class="metric">No-shows recentes<div class="num red">—</div></div>
      <div class="metric actions">
        <button mat-stroked-button color="primary">Check-in</button>
        <button mat-raised-button color="primary">Nova reserva</button>
      </div>
    </div>

    <div class="filters">
      <div class="title">Filtros</div>
      <div class="grid">
        <mat-form-field appearance="outline"><mat-label>ID</mat-label><input matInput /></mat-form-field>
        <mat-form-field appearance="outline"><mat-label>Cliente</mat-label><input matInput /></mat-form-field>
        <mat-form-field appearance="outline"><mat-label>Horário</mat-label><input matInput /></mat-form-field>
        <mat-form-field appearance="outline"><mat-label>Quantidade de pessoas</mat-label><input matInput /></mat-form-field>
        <mat-form-field appearance="outline"><mat-label>Ambiente</mat-label><input matInput /></mat-form-field>
        <mat-form-field appearance="outline"><mat-label>Origem</mat-label><input matInput /></mat-form-field>
        <mat-form-field appearance="outline"><mat-label>Status</mat-label><input matInput /></mat-form-field>
      </div>
    </div>

    <div class="table-card">
      <div class="title">Reservas</div>
      <table mat-table [dataSource]="[]" class="mat-elevation-z0 full">
        <ng-container matColumnDef="id"><th mat-header-cell *matHeaderCellDef>ID</th><td mat-cell *matCellDef="let e"></td></ng-container>
        <ng-container matColumnDef="cliente"><th mat-header-cell *matHeaderCellDef>Cliente</th><td mat-cell *matCellDef="let e"></td></ng-container>
        <ng-container matColumnDef="horario"><th mat-header-cell *matHeaderCellDef>Horário</th><td mat-cell *matCellDef="let e"></td></ng-container>
        <ng-container matColumnDef="pessoas"><th mat-header-cell *matHeaderCellDef>Quantidade de pessoas</th><td mat-cell *matCellDef="let e"></td></ng-container>
        <ng-container matColumnDef="ambiente"><th mat-header-cell *matHeaderCellDef>Ambiente</th><td mat-cell *matCellDef="let e"></td></ng-container>
        <ng-container matColumnDef="info"><th mat-header-cell *matHeaderCellDef>Informações</th><td mat-cell *matCellDef="let e"></td></ng-container>
        <ng-container matColumnDef="origem"><th mat-header-cell *matHeaderCellDef>Origem</th><td mat-cell *matCellDef="let e"></td></ng-container>
        <ng-container matColumnDef="status"><th mat-header-cell *matHeaderCellDef>Status</th><td mat-cell *matCellDef="let e"></td></ng-container>
        <ng-container matColumnDef="acoes"><th mat-header-cell *matHeaderCellDef>Ações</th><td mat-cell *matCellDef="let e"></td></ng-container>

        <tr mat-header-row *matHeaderRowDef="cols"></tr>
        <tr mat-row *matRowDef="let row; columns: cols;"></tr>
      </table>
    </div>
  `,
  styles: [
    `.metrics{ display:grid; grid-template-columns:repeat(auto-fill,minmax(240px,1fr)); gap:12px; align-items:stretch; }`,
    `.metric{ background:#fff; border:1px solid #e5e9f2; box-shadow:0 2px 4px rgba(0,0,0,.06); padding:14px; border-radius:6px; font-weight:600; color:#263238; display:flex; align-items:center; justify-content:space-between; }`,
    `.metric .num{ font-size:24px; color:#0A4697; font-weight:700; }`,
    `.metric .num.orange{ color:#ff9800; }`,
    `.metric .num.red{ color:#f44336; }`,
    `.metric.actions{ gap:8px; }`,
    `.filters{ background:#fff; border:1px solid #e5e9f2; box-shadow:0 2px 4px rgba(0,0,0,.06); border-radius:6px; padding:12px; margin-top:14px; }`,
    `.filters .title{ font-weight:600; margin-bottom:8px; }`,
    `.filters .grid{ display:grid; grid-template-columns:repeat(auto-fit,minmax(180px,1fr)); gap:12px; }`,
    `.table-card{ background:#fff; border:1px solid #e5e9f2; box-shadow:0 2px 4px rgba(0,0,0,.06); border-radius:6px; padding:8px 12px 12px; margin-top:14px; }`,
    `.table-card .title{ font-weight:600; margin-bottom:8px; }`,
    `.full{ width:100%; }`
  ]
})
export class AdminReservationsComponent{
  cols = ['id','cliente','horario','pessoas','ambiente','info','origem','status','acoes'];
}

