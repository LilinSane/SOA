import { AbstractControl, ValidationErrors } from '@angular/forms';


export function FloatValidator(control: AbstractControl): ValidationErrors | null {
  if(!control.value) {return null;}
  return !isNaN(control.value) || control.value.toString() === parseFloat(control.value).toString() ? null : { error: { value: control.value } };
}
