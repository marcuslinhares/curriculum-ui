import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { tap, catchError, of, Observable } from 'rxjs';
import { CandidatoResponseDTO } from '../models/DTOs/responses/CandidatoResponseDTO';
import { AuthService } from './auth.service';
import { environment } from '../../environments/environment';
import { Curriculo } from '../models/curriculo';
import { CurriculoResponseDTO } from '../models/DTOs/responses/CurriculoResponseDTO';
import { CurriculosResponseDTO } from '../models/DTOs/responses/CurriculosResponseDTO';

@Injectable({
  providedIn: 'root'
})
export class CurriculoService {
  private readonly apiUrl = environment.ApiBaseUrl;

  constructor(
    private http: HttpClient,
    private messageService: MessageService,
    private authService: AuthService
  ) { }

  cadastro(candidato: Curriculo): void {
    const token = this.authService.getToken();

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  
    this.http.post<CandidatoResponseDTO>(
      `${this.apiUrl}/curriculos`,
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

  getCurriculo() {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  
    return this.http.get<CurriculoResponseDTO>(
      `${this.apiUrl}/curriculos/loged-user`, 
      { headers }
    );
  }

  getCurriculoById(id: string) {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  
    return this.http.get<CurriculoResponseDTO>(
      `${this.apiUrl}/curriculos/${id}`, 
      { headers }
    );
  }

  getCurriculos(page: Number, size: Number = 10): Observable<CurriculosResponseDTO>{
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    return this.http.get<CurriculosResponseDTO>(
      `${this.apiUrl}/curriculos`,
      { headers, params }
    );
  }
}
