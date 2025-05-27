import { Component, OnInit } from '@angular/core';
import { MainLayoutComponent } from '../../layouts/main-layout/main-layout.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { catchError, of } from 'rxjs';
import { CadastroCandidatoFormComponent } from '../../components/cadastro-candidato-form/cadastro-candidato-form.component';
import { NgIf } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { CadastroCurriculoFormComponent } from '../../components/cadastro-curriculo-form/cadastro-curriculo-form.component';
import { CurriculoViewComponent } from '../../components/curriculo-view/curriculo-view.component';
import { CurriculoResponseDTO } from '../../models/DTOs/responses/CurriculoResponseDTO';

@Component({
  selector: 'candidato-page',
  standalone: true,
  imports: [NgIf, MainLayoutComponent, CurriculoViewComponent, CadastroCurriculoFormComponent, CadastroCandidatoFormComponent],
  templateUrl: './candidato-page.component.html',
  styleUrl: './candidato-page.component.css'
})
export class CandidatoPageComponent implements OnInit{
  mostrarCadastroCandidato = false;
  mostrarCadastroCurriculo = false;

  curriculo?: CurriculoResponseDTO;
  
  constructor(private authService: AuthService, private http: HttpClient) { }

  ngOnInit(): void {
    const token = this.authService.getToken();

    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
  
    this.http.get<any>(`${environment.ApiBaseUrl}/curriculos/loged-user`, { headers })
      .pipe(
        catchError(err => {
          const msg = err.error?.message;
  
          if (msg === 'O usuário não completou o cadastro') {
            this.mostrarCadastroCandidato = true;
          } else if (msg === 'O candidato não cadastrou seu currículo') {
            this.mostrarCadastroCurriculo = true;
          }
  
          return of(null);
        })
      )
      .subscribe(data => {
        if (data) {
          this.curriculo = data;
        }
      });
  }

}
