import { Component, Input, OnInit } from '@angular/core';
import { CurriculoResponseDTO } from '../../models/DTOs/responses/CurriculoResponseDTO';
import { CurriculoService } from '../../services/curriculo.service';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';
import { NivelCompetenciaEnum } from '../../models/enums/nivelCompetenciaEnum';
import { EscolaridadeEnum } from '../../models/enums/escolaridadeEnum';
import { SituacaoEnum } from '../../models/enums/situacaoEnum';

@Component({
  selector: 'curriculo-view',
  standalone: true,
  imports: [
    CommonModule, CardModule, TagModule
  ],
  templateUrl: './curriculo-view.component.html',
  styleUrl: './curriculo-view.component.css'
})
export class CurriculoViewComponent {
  @Input() curriculo!: CurriculoResponseDTO;

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
  
  getEscolaridadeString(value: EscolaridadeEnum): string {
    return value;
  }

  getSituacaoString(value: SituacaoEnum | undefined): string {
    return value ?? 'Indefinido';
  }

  formatCPF(cpf?: string): string {
    if (!cpf) return '';
    return cpf.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, '$1.$2.$3-$4');
  }
  
  formatTelefone(telefone?: string): string {
    if (!telefone) return '';
    if (telefone.length === 10) {
      return telefone.replace(/^(\d{2})(\d{4})(\d{4})$/, '($1) $2-$3');
    } else if (telefone.length === 11) {
      return telefone.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3');
    }
    return telefone;
  }

}
