import { Routes } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { CandidatoPageComponent } from './pages/home-page/candidato-page.component';
import { AuthGuard } from './guards/auth.guard';
import { CadastroUsuarioPageComponent } from './pages/cadastro-usuario-page/cadastro-usuario-page.component';
import { AdminGuard } from './guards/admin.guard';
import { AdminPageComponent } from './pages/admin-page/admin-page.component';
import { CurriculoAvaliacaoPageComponent } from './pages/curriculo-avaliacao-page/curriculo-avaliacao-page.component';
import { RelatoriosComponent } from './pages/relatorios/relatorios.component';

export const routes: Routes = [
  {
    path: 'candidato',
    component: CandidatoPageComponent,
    canActivate: [AuthGuard]
  },

  {
    path: 'admin',
    component: AdminPageComponent,
    canActivate: [AuthGuard, AdminGuard]
  },

  {
    path: 'relatorios',
    component: RelatoriosComponent,
    canActivate: [AuthGuard, AdminGuard]
  },

  {
    path: 'avaliacao/:id',
    component: CurriculoAvaliacaoPageComponent
  },

  {
    path: 'login',
    component: LoginPageComponent
  },

  {
    path: 'cadastro',
    component: CadastroUsuarioPageComponent
  },

  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  }
  
];
