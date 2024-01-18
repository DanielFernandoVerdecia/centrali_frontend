import { AbstractControl, ValidatorFn } from '@angular/forms';

export function dineroInputValidador(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const inputValue = control.value;

    const sanitizedValue = String(inputValue).replace(/[^\d.]/g, '');

    let valor_final = sanitizedValue

    if (sanitizedValue.includes(".")){

      valor_final  = sanitizedValue.slice(0, sanitizedValue.indexOf(".") + 3)

    }

    if (inputValue !== valor_final) {
      control.setValue(valor_final, { emitEvent: false });
    }



    // Valida el formato del número
    if (/^\d*\.?\d+$/.test(sanitizedValue)) {
      return null; // Válido
    } else {
      return { 'invalidNumberFormat': true }; // No válido
    }
  };


}