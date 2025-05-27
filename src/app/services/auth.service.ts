import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from "jwt-decode";
import { MessageService } from 'primeng/api';
import { JwtPayload } from '../models/jwtPayload';
import { AuthResponse } from '../models/DTOs/responses/autentication';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenKey = 'auth_token';
  private readonly apiUrl = environment.ApiBaseUrl;

  constructor(
    private http: HttpClient,
    private router: Router,
    private messageService: MessageService
  ) { }

  login(email: string, password: string) {
    const basicToken = btoa(`${email}:${password}`);
    const headers = new HttpHeaders({
      'Authorization': `Basic ${basicToken}`,
      'Content-Type': 'application/json'
    });
  
    this.http.post<AuthResponse>(`${this.apiUrl}/autenticacao`, {}, { headers }).subscribe({
      next: (response) => {
        localStorage.setItem(this.tokenKey, response.token);
  
        const payload = jwtDecode<JwtPayload>(response.token);
  
        this.messageService.add({
          severity: 'success',
          summary: 'Login',
          detail: 'Login realizado com sucesso!'
        });
  
        if (payload.scope === 'ADMIN') {
          this.router.navigate(['/admin']);
        } else {
          this.router.navigate(['/candidato']);
        }
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'E-mail ou senha inválidos.'
        });
      }
    });
  }
  

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    this.messageService.add({
      severity: 'info',
      summary: 'Logout',
      detail: 'Você saiu do sistema.'
    });
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  getDecodedToken(): JwtPayload | null {
    const token = this.getToken();
    if (!token) return null;

    try {
      return jwtDecode<JwtPayload>(token);
    } catch {
      this.messageService.add({
        severity: 'error',
        summary: 'Token inválido',
        detail: 'Erro ao decodificar o token.'
      });
      return null;
    }
  }

  isTokenExpired(): boolean {
    const payload = this.getDecodedToken();
    if (!payload) return true;

    const currentTime = Math.floor(Date.now() / 1000);
    return payload.exp < currentTime;
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    if (!token) return false;

    return !this.isTokenExpired();
  }

  redirectIfAuthenticated(): void {
      const decodedToken = this.getDecodedToken();
      const route = decodedToken?.scope === 'ADMIN' ? '/admin' : '/candidato';
      this.router.navigate([route]);
  }
  
}
