import { Component, OnInit } from '@angular/core';
import { CurriculoService } from '../../services/curriculo.service';
import { RelatorioEscolaridade } from '../../models/relatorioEscolaridade';
import { ChartModule } from 'primeng/chart';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'grafico-barra-escolaridade',
  standalone: true,
  imports: [ChartModule, CommonModule],
  templateUrl: './grafico-barras-escolaridade.component.html',
  styleUrl: './grafico-barras-escolaridade.component.css'
})
export class GraficoBarraEscolaridadeComponent implements OnInit {
  data: any;
  options: any;

  constructor(private curriculoService: CurriculoService) { }

  ngOnInit(): void {
    this.curriculoService.getRelatorioEscolaridade().subscribe({
      next: (relatorio: RelatorioEscolaridade[]) => {
        const labels = relatorio.map(r => r.escolaridade);
        const valores = relatorio.map(r => r.quantidade);

        this.data = {
          labels,
          datasets: [
            {
              label: 'Quantidade',
              backgroundColor: '#42A5F5',
              data: valores
            }
          ]
        };

        this.options = {
          responsive: true,
          plugins: {
            legend: { display: false },
            tooltip: { enabled: true }
          },
          scales: {
            y: { beginAtZero: true }
          }
        };
      },
      error: err => console.error('Erro ao carregar relatorio escolaridade:', err)
    });
  }
}
