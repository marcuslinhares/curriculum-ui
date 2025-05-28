import { Component, OnInit } from '@angular/core';
import { CandidatoService } from '../../services/candidato.service';
import { RelatorioSituacao } from '../../models/relatorioSituacoes';
import { ChartModule } from 'primeng/chart';

@Component({
  selector: 'grafico-pizza-situacao',
  standalone: true,
  imports: [ChartModule],
  templateUrl: './grafico-pizza-situacao.component.html',
  styleUrl: './grafico-pizza-situacao.component.css'
})
export class GraficoPizzaSituacaoComponent implements OnInit {
  data: any;
  options: any;

  constructor(private candidatoService: CandidatoService) { }

  ngOnInit() {
    this.candidatoService.getRelatorioSituacao().subscribe((situacoes: RelatorioSituacao[]) => {
      this.data = {
        labels: situacoes.map(s => s.situacao),
        datasets: [
          {
            data: situacoes.map(s => s.quantidade),
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
            hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0']
          }
        ]
      };

      this.options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'bottom'
          }
        }
      };
    });
  }
}
