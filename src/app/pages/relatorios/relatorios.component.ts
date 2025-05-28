import { Component } from '@angular/core';
import { GraficoPizzaSituacaoComponent } from '../../components/grafico-pizza-situacao/grafico-pizza-situacao.component';
import { MainLayoutComponent } from '../../layouts/main-layout/main-layout.component';
import { GraficoBarraEscolaridadeComponent } from '../../components/grafico-barras-escolaridade/grafico-barras-escolaridade.component';

@Component({
  selector: 'relatorios',
  standalone: true,
  imports: [MainLayoutComponent, GraficoPizzaSituacaoComponent, GraficoBarraEscolaridadeComponent],
  templateUrl: './relatorios.component.html',
  styleUrl: './relatorios.component.css'
})
export class RelatoriosComponent {

}
