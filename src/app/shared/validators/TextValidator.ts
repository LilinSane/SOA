import { AbstractControl, ValidationErrors } from '@angular/forms';


export function TextValidator(control: AbstractControl): ValidationErrors | null {
  if(!control.value) {return null;}
  return /^[a-zA-Zа-яА-ЯёЁ]+$/.test(control.value) ? null : { error: { value: control.value } };
}
