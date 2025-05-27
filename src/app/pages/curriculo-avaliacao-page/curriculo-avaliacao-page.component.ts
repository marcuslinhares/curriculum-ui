import { Component, Input, OnInit } from '@angular/core';
import { CurriculoResponseDTO } from '../../models/DTOs/responses/CurriculoResponseDTO';
import { CurriculoViewComponent } from '../../components/curriculo-view/curriculo-view.component';
import { ActivatedRoute, Router } from '@angular/router';
import { CurriculoService } from '../../services/curriculo.service';
import { MainLayoutComponent } from '../../layouts/main-layout/main-layout.component';
import { CandidatoService } from '../../services/candidato.service';
import { CardModule } from 'primeng/card';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'curriculo-avaliacao-page',
  standalone: true,
  imports: [ToastModule, CardModule, CurriculoViewComponent, MainLayoutComponent],
  templateUrl: './curriculo-avaliacao-page.component.html',
  styleUrl: './curriculo-avaliacao-page.component.css'
})
export class CurriculoAvaliacaoPageComponent implements OnInit {
  curriculo!: CurriculoResponseDTO;

  constructor(
    private curriculoService: CurriculoService,
    private candidatoService: CandidatoService,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.curriculoService.getCurriculoById(id).subscribe({
      next: data => this.curriculo = data,
      error: err => console.error('Erro ao carregar currículo', err)
    });
  }

  avaliarCandidato(aprovado: boolean) {
    const candidatoId = this.curriculo.candidato.id;
    this.candidatoService.avaliarCandidato(candidatoId, aprovado).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Avaliação',
          detail: 'Candidato avaliado com sucesso!',
        });

        this.router.navigate(['/admin']);
      },
      error: err => {
        console.error('Erro ao avaliar candidato', err);

        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Não foi possível avaliar o candidato. Tente novamente.',
        });
      }
    });
  }
}
