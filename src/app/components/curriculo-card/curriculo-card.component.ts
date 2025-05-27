import { Component, Input } from '@angular/core';
import { CurriculoResponseDTO } from '../../models/DTOs/responses/CurriculoResponseDTO';
import { NivelCompetenciaEnum } from '../../models/enums/nivelCompetenciaEnum';
import { SituacaoEnum } from '../../models/enums/situacaoEnum';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';
import { Router } from '@angular/router';

@Component({
  selector: 'curriculo-card',
  standalone: true,
  imports: [
    CommonModule,
    CardModule,
    TagModule
  ],
  templateUrl: './curriculo-card.component.html',
  styleUrl: './curriculo-card.component.css'
})
export class CurriculoCardComponent {
  @Input() curriculo!: CurriculoResponseDTO;

  constructor(private router: Router){}

  getSeveritySituacao(value: SituacaoEnum | string | undefined): string | undefined {
    switch(value) {
      case SituacaoEnum.APROVADO:
        return 'success';
      case SituacaoEnum.REPROVADO:
        return 'danger';
      case SituacaoEnum.AGUARDANDO_ANALISE:
        return 'warning';
      case SituacaoEnum.SEM_CURRICULO:
        return 'info';
      default:
        return undefined;
    }
  }  

  getSeverityNivel(nivel?: NivelCompetenciaEnum): string {
    switch (nivel) {
      case NivelCompetenciaEnum.INICIANTE: return 'info';
      case NivelCompetenciaEnum.INTERMEDIARIO: return 'warning';
      case NivelCompetenciaEnum.AVANCADO: return 'success';
      default: return 'default';
    }
  }

  getSituacaoString(value: SituacaoEnum | undefined): string {
    return value ?? 'Indefinido';
  }

  goToAvaliacao() {
    this.router.navigate(['/avaliacao', this.curriculo.id]);
  }
}
