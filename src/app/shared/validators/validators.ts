import { FormControl } from '@angular/forms';

export function ValidatePercentage(formControl: FormControl) {
    
    // Get value.
    let value: any = formControl.value;

    // Get value as number.
    let valueAsNumber: number = parseFloat(value);

    // Check value is between 0 and 100.
    if (valueAsNumber >= 0 && valueAsNumber <= 100) return null;

    // Return error.
    return { percentage: false }
}

export function ValidateNumber(formControl: FormControl) {

    // Get value.
    let value: any = formControl.value;

    // Determine if not a number.
    let notNumber: boolean = isNaN(value);

    // Check.
    if (notNumber === false) return null;

    // Return error.
    return { number: false }
}