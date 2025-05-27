import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Candidato } from '../models/candidato';
import { CandidatoResponseDTO } from '../models/DTOs/responses/CandidatoResponseDTO';
import { environment } from '../../environments/environment';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CandidatoService {
  private readonly apiUrl = environment.ApiBaseUrl;

  constructor(
    private http: HttpClient,
    private messageService: MessageService,
    private authService: AuthService
  ) { }

  cadastro(candidato: Candidato): void {
    const token = this.authService.getToken();

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  
    this.http.post<CandidatoResponseDTO>(
      `${this.apiUrl}/candidatos`,
      candidato,
      { headers, observe: 'response' }
    ).pipe(
  
      tap((response) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Cadastro',
          detail: 'Cadastro realizado com sucesso!'
        });
        location.reload();
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

  avaliarCandidato(candidatoId: string, aprovado: boolean): Observable<CandidatoResponseDTO> {
    const token = this.authService.getToken();

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<CandidatoResponseDTO>(
      `${this.apiUrl}/candidatos/${candidatoId}?aprovado=${aprovado}`,
      {headers}
    );
  }
  
}
