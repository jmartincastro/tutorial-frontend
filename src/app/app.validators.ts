import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function validDate(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    console.log('control ' + control.value);
    const date = control.value;
    return !date || date === '' ? { inValidDate: true } : null;
  };
}

export const validateDate: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const startCtrl = control.get('start');
  const endCtrl = control.get('end');
  const dtStart = new Date(startCtrl.value);
  const dtEnd = new Date(endCtrl.value);
  const msInDay = 24 * 60 * 60 * 1000;
  const diffDays = Math.round(
    Math.abs(Number(dtEnd) - Number(dtStart)) / msInDay
  );

  var isValid = null;

  if (dtStart > dtEnd) {
    isValid = { invalidRange: true };
  } else if (!isNaN(diffDays) && diffDays > 14) {
    console.log('diffDays: ' + diffDays);
    isValid = { maxDaysLoan: true };
  }

  return isValid;
};
