import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { FloatLabel } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ToastModule } from 'primeng/toast';
import { AuthService } from '../../services/auth.service';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario';
import { senhasIguaisValidator } from '../../validators/senhasIguaisValidator';

@Component({
  selector: 'cadastro-usuario-form',
  standalone: true,
  imports: [
    FloatLabel,
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    PasswordModule,
    ButtonModule,
    ToastModule
  ],
  templateUrl: './cadastro-usuario-form.component.html',
  styleUrl: './cadastro-usuario-form.component.css'
})
export class CadastroUsuarioFormComponent {

  cadastroForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private messageService: MessageService,
    private router: Router
  ) {
    this.cadastroForm = this.fb.group({
      nome: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]],
      confirmaSenha: ['', [Validators.required, Validators.minLength(6)]]
    }, { validators: senhasIguaisValidator('senha', 'confirmaSenha') });
  }

  onSubmit(): void {
    if (this.cadastroForm.invalid) {
      this.messageService.add({
        severity: 'error',
        summary: 'Erro',
        detail: 'Preencha todos os campos corretamente.'
      });
      return;
    }

    const usuario: Usuario = this.cadastroForm.value;

    this.usuarioService.cadastro(usuario);
  }


  toLogin() {
    this.router.navigate(['/login']);
  }
}
