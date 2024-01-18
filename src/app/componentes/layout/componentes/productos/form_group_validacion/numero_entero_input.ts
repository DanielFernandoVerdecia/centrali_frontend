import { AbstractControl, ValidatorFn } from '@angular/forms';

export function numeroEnteroInput(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const inputValue = control.value;

    const sanitizedValue = String(inputValue).replace(/[^\d]/g, '');


    if (inputValue !== sanitizedValue) {
      control.setValue(sanitizedValue, { emitEvent: false });
    }


    // Valida el formato del número
    if (/^\d*\.?\d+$/.test(sanitizedValue)) {
      return null; // Válido
    } else {
      return { 'invalidNumberFormat': true }; // No válido
    }
  };


}