import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorMessageService {

  constructor() { }

  public getErrorMessage(errors: any): string {

    try {
    
      // Required
      if ('required' in errors) return "Field is empty.";

      // Pattern
      if ('pattern' in errors) return "Field must contain a valid monetary value."

      // Number
      if ('number' in errors) return "Field must contain a valid number."

      // Percentage
      if ('percentage' in errors) return "Field must contain a value between 0 and 100."

      // Unknown
      return "Field is invalid."

    } catch (error) {

      // Return unknown message.
      return "Field is invalid."
      
    }
  };

}
