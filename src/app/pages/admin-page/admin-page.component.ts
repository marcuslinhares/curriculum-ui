import { Component, OnInit } from '@angular/core';
import { CurriculoResponseDTO } from '../../models/DTOs/responses/CurriculoResponseDTO';
import { ActivatedRoute } from '@angular/router';
import { CurriculoService } from '../../services/curriculo.service';
import { CommonModule } from '@angular/common';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { MainLayoutComponent } from '../../layouts/main-layout/main-layout.component';
import { CurriculoCardComponent } from '../../components/curriculo-card/curriculo-card.component';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'admin-page',
  standalone: true,
  imports: [
    InfiniteScrollModule, CommonModule,
    MainLayoutComponent, CurriculoCardComponent
  ],
  templateUrl: './admin-page.component.html',
  styleUrl: './admin-page.component.css'
})
export class AdminPageComponent implements OnInit{
  curriculos: CurriculoResponseDTO[] = [];
  page = 0;
  isLoading = false;
  hasMore = true;

  screenSize: 'sm' | 'md' | 'lg' | 'xl' = 'lg';

  constructor(
    private route: ActivatedRoute,
    private curriculoService: CurriculoService,
    private breakpointObserver: BreakpointObserver
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.page = 0;
      this.curriculos = [];
      this.hasMore = true;
      this.loadCurriculos();
    });

    this.breakpointObserver.observe([
      Breakpoints.XSmall,
      Breakpoints.Small,
      Breakpoints.Medium,
      Breakpoints.Large,
      Breakpoints.XLarge,
    ]).subscribe(result => {
      if (result.breakpoints[Breakpoints.XSmall] || result.breakpoints[Breakpoints.Small]) {
        this.screenSize = 'sm';
      } else if (result.breakpoints[Breakpoints.Medium]) {
        this.screenSize = 'md';
      } else if (result.breakpoints[Breakpoints.Large]) {
        this.screenSize = 'lg';
      } else if (result.breakpoints[Breakpoints.XLarge]) {
        this.screenSize = 'xl';
      }
    });
  }

  onScroll(): void {
    if (this.isLoading || !this.hasMore) return;
    this.page++;
    this.loadCurriculos();
  }

  loadCurriculos(): void {
    this.isLoading = true;
    this.curriculoService.getCurriculos(this.page).subscribe(
      (response) => {
        this.curriculos.push(...response.content);
        this.hasMore = this.page < response.totalPages;
        this.isLoading = false;
      }
    );
  }
}
