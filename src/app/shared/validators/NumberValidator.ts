import { AbstractControl, ValidationErrors } from '@angular/forms';


export function NumberValidator(control: AbstractControl): ValidationErrors | null {
  if(!control.value) {return null;}
  return /^\d+$/.test(control.value) ? null : { error: { value: control.value } };
}
