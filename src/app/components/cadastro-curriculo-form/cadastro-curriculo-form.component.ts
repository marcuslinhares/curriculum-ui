import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { EscolaridadeEnum } from '../../models/enums/escolaridadeEnum';
import { NivelCompetenciaEnum } from '../../models/enums/nivelCompetenciaEnum';

import { CurriculoService } from '../../services/curriculo.service';
import { Curriculo } from '../../models/curriculo';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'cadastro-curriculo-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    DropdownModule,
    ButtonModule,
    FloatLabelModule
  ],
  templateUrl: './cadastro-curriculo-form.component.html'
})
export class CadastroCurriculoFormComponent {
  etapa = 1;

  curriculoForm: FormGroup;
  novaCompetencia: FormGroup;

  escolaridades = Object.keys(EscolaridadeEnum)
    .filter(k => isNaN(Number(k)))
    .map(k => ({ label: k.replaceAll('_', ' '), value: EscolaridadeEnum[k as keyof typeof EscolaridadeEnum] }));

  nivelCompetenciaOptions = Object.keys(NivelCompetenciaEnum)
    .filter(k => isNaN(Number(k)))
    .map(key => ({
      label: key.charAt(0).toUpperCase() + key.slice(1).toLowerCase(),
      value: NivelCompetenciaEnum[key as keyof typeof NivelCompetenciaEnum]
    }));

  constructor(
    private fb: FormBuilder,
    private curriculoService: CurriculoService,
    private messageService: MessageService
  ) {
    this.curriculoForm = this.fb.group({
      escolaridade: [null, Validators.required],
      funcao: ['', Validators.required],
      competencias: this.fb.array([])
    });

    this.novaCompetencia = this.fb.group({
      descricao: ['', Validators.required],
      nivel: [null, Validators.required]
    });
  }

  get competencias(): FormArray {
    return this.curriculoForm.get('competencias') as FormArray;
  }

  get descricaoCompetenciaControl(): FormControl {
    return this.novaCompetencia.get('descricao') as FormControl;
  }

  get nivelCompetenciaControl(): FormControl {
    return this.novaCompetencia.get('nivel') as FormControl;
  }

  adicionarCompetencia(): void {
    if (this.novaCompetencia.valid) {
      this.competencias.push(this.fb.group({
        descricao: this.novaCompetencia.value.descricao,
        nivel: this.novaCompetencia.value.nivel
      }));

      this.novaCompetencia.reset();
    }
  }

  removerCompetencia(index: number): void {
    this.competencias.removeAt(index);
  }

  getNivelLabel(valor: string | number): string {
    const option = this.nivelCompetenciaOptions.find(opt => opt.value === String(valor));
    return option ? option.label : '';
  }

  irParaEtapa(etapa: number): void {
    this.etapa = etapa;
  }

  onSubmit(): void {
    if (this.curriculoForm.invalid) {
      this.messageService.add({
        severity: 'error',
        summary: 'Erro',
        detail: 'Preencha todos os campos corretamente.'
      });
      return;
    }
  
    const curriculo: Curriculo = this.curriculoForm.value;
  
    this.curriculoService.cadastro(curriculo);
  }
  
}
