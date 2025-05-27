import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService, 
    private router: Router,
    private messageService: MessageService
  ) {}

  canActivate(): boolean {
    if (this.authService.isAuthenticated()) {
      return true;
    } else {
      this.messageService.add({
        severity: 'warn',
        summary: 'Acesso negado',
        detail: 'Você precisa estar autenticado para acessar esta página.'
      });
      this.router.navigate(['/login']);
      return false;
    }
  }
}
