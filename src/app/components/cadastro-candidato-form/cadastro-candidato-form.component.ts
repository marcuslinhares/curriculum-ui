import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Candidato } from '../../models/candidato';
import { CandidatoService } from '../../services/candidato.service';
import { cpfValidator } from '../../validators/cpfValidator';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { InputMaskModule } from 'primeng/inputmask'
import { CalendarModule } from 'primeng/calendar';

@Component({
  selector: 'cadastro-candidato-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    FloatLabelModule,
    InputTextModule,
    InputMaskModule,
    PasswordModule,
    ButtonModule,
    CalendarModule
  ],
  templateUrl: './cadastro-candidato-form.component.html',
  styleUrl: './cadastro-candidato-form.component.css'
})
export class CadastroCandidatoFormComponent {
  cadastroCompletoForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private candidatoService: CandidatoService,
    private messageService: MessageService
  ) {
    this.cadastroCompletoForm = this.fb.group({
      cpf: ['', [Validators.required, cpfValidator]],
      dataNasc: ['', Validators.required],
      telefone: ['', [Validators.required, Validators.minLength(14)]],
    });
  }

  onSubmit(): void {
    if (this.cadastroCompletoForm.invalid) {
      this.messageService.add({
        severity: 'error',
        summary: 'Erro',
        detail: 'Preencha todos os campos corretamente.'
      });
      return;
    }
  
    const formValue = this.cadastroCompletoForm.value;
  
    const candidato: Candidato = {
      ...formValue,
      cpf: formValue.cpf.replace(/\D/g, ''),
      telefone: formValue.telefone.replace(/\D/g, ''),
      dataNasc: this.formatarData(formValue.dataNasc)
    };
  
    this.candidatoService.cadastro(candidato);
  }

  formatarData(data: Date | string): string {
    if (!data) return '';
    const d = new Date(data);
    return d.toISOString().split('T')[0];
  }
    
}
