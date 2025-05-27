import { Component, OnInit } from '@angular/core';
import { LoginFormComponent } from '../../components/login-form/login-form.component';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { AutenticationLayoutComponent } from '../../layouts/autentication-layout/autentication-layout.component';

@Component({
  selector: 'login-page',
  standalone: true,
  imports: [AutenticationLayoutComponent, LoginFormComponent],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css',
  providers: []
})
export class LoginPageComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      this.authService.redirectIfAuthenticated();
    }
  }
}
