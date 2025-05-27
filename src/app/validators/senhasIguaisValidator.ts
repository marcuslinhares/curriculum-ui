import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function senhasIguaisValidator(senha: string, confirmaSenha: string): ValidatorFn {
  return (formGroup: AbstractControl): ValidationErrors | null => {
    const senhaControl = formGroup.get(senha);
    const confirmaSenhaControl = formGroup.get(confirmaSenha);

    if (!senhaControl || !confirmaSenhaControl) {
      return null;
    }

    const senhasIguais = senhaControl.value === confirmaSenhaControl.value;

    return senhasIguais ? null : { senhasDiferentes: true };
  };
}
