import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router,
    private messageService: MessageService
  ) {}

  canActivate(): boolean {
    const payload = this.authService.getDecodedToken();
    
    if (payload && payload.scope === 'ADMIN') {
      return true;
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Acesso restrito',
        detail: 'Você não tem permissão para acessar esta área.'
      });
      this.router.navigate(['/home']);
      return false;
    }
  }
}
