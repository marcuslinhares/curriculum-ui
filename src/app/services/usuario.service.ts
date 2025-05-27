import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Usuario } from '../models/usuario';
import { UsuarioResponseDTO } from '../models/DTOs/responses/UsuarioResponseDTO';
import { environment } from '../../environments/environment';
import { of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private readonly apiUrl = environment.ApiBaseUrl;

  constructor(
    private http: HttpClient,
    private router: Router,
    private messageService: MessageService
  ) { }

  cadastro(usuario: Usuario): void {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    this.http.post<UsuarioResponseDTO>(
      `${this.apiUrl}/usuarios`,
      usuario,
      { headers, observe: 'response' }
    ).pipe(

      tap((response) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Cadastro',
          detail: 'Cadastro realizado com sucesso!'
        });
        this.router.navigate(['/login']);
      }),

      catchError((err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: err.error?.message || 'Campos inválidos ou erro de servidor.'
        });

        console.error('Erro no cadastro:', err);

        return of();
      })

    ).subscribe();
  }

}
