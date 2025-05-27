import { Component } from '@angular/core';
import { AutenticationLayoutComponent } from '../../layouts/autentication-layout/autentication-layout.component';
import { CadastroUsuarioFormComponent } from '../../components/cadastro-usuario-form/cadastro-usuario-form.component';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'cadastro-usuario-page',
  standalone: true,
  imports: [AutenticationLayoutComponent, CadastroUsuarioFormComponent],
  templateUrl: './cadastro-usuario-page.component.html',
  styleUrl: './cadastro-usuario-page.component.css'
})
export class CadastroUsuarioPageComponent {
  constructor(private authService: AuthService, private router: Router){}

  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      this.authService.redirectIfAuthenticated();
    }
  }
}
