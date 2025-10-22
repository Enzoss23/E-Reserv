import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-admin-login',
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule],
  template: `
    <div class="login-wrap">
      <div class="login-card">
        <div class="brand-pane">
          <img src="/assets/image 8.png" alt="Logo" />
        </div>
        <div class="form-pane">
          <div class="title">Painel de Gestão</div>
          <div class="subtitle">Informe seus dados para prosseguir</div>
          <form [formGroup]="form" (ngSubmit)="go()" class="form">
            <div class="field-title">Usuário</div>
            <mat-form-field appearance="fill" class="full">
              <mat-icon matPrefix>person</mat-icon>
              <input matInput formControlName="user" />
            </mat-form-field>

            <div class="field-title">Senha</div>
            <mat-form-field appearance="fill" class="full">
              <mat-icon matPrefix>vpn_key</mat-icon>
              <input matInput type="password" formControlName="pass" />
            </mat-form-field>

            <a class="link" href="#">Esqueci a senha</a>

            <button mat-raised-button color="primary" class="submit" [disabled]="form.invalid">Acessar</button>
          </form>
        </div>
      </div>
      <footer class="foot">Desenvolvido por E-reserv ©</footer>
    </div>
  `,
  styles: [
    `.login-wrap{ min-height:calc(100vh - 64px); display:flex; flex-direction:column; align-items:center; justify-content:center; padding:16px; }`,
    `.login-card{ display:flex; width:880px; max-width:100%; background:#fff; border:1px solid #e5e9f2; box-shadow:0 2px 8px rgba(0,0,0,.08); }`,
    `.brand-pane{ width:50%; min-height:420px; background:#0A4697; display:flex; align-items:center; justify-content:center; }`,
    `.brand-pane img{ max-width:320px; width:80%; height:auto; filter:drop-shadow(0 4px 8px rgba(0,0,0,.25)); }`,
    `.form-pane{ width:50%; padding:28px 28px 24px; }`,
    `.title{ text-align:center; color:#155BB5; font-weight:700; }`,
    `.subtitle{ text-align:center; color:#7d8a97; margin-bottom:16px; }`,
    `.field-title{ color:#155BB5; font-weight:700; margin:6px 0 4px; }`,
    `.full{ width:100%; }`,
    `.link{ display:inline-block; margin:4px 0 12px; color:#0A4697; text-decoration:none; font-size:13px; }`,
    `.submit{ width:100%; }`,
    `.foot{ margin-top:18px; color:#8a97a5; font-size:13px; }`,
    `@media (max-width:820px){ .login-card{ flex-direction:column; } .brand-pane, .form-pane{ width:100%; } .brand-pane{ min-height:200px; } }`
  ]
})
export class AdminLoginComponent {
  form = this.fb.group({ user: ['', Validators.required], pass: ['', Validators.required] });
  constructor(private fb: FormBuilder, private router: Router) {}
  go(){ if(this.form.valid){ this.router.navigateByUrl('/gestao'); } }
}
 
