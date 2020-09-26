import { Injectable } from '@angular/core';
import * as CurrJS from 'currency.js';

@Injectable({
  providedIn: 'root'
})
export class FieldFormatterService {

  constructor() { }

  public currency(value: any): string {
    try {
      if (!this.checkFloat(value)) throw Error();
      return CurrJS(value, { symbol: '', separator: ',' }).format();
    } catch (error) {
      return null;
    }
  }

  public percentage(value: any): string {

    try {

      // Check is a number, otherwise throw error.
      if (!this.checkFloat(value)) throw Error();

      // Parse value into float.
      const parsed: number = parseFloat(value);

      // If value is less than 0, set to 0.
      if (parsed < 0) return '0';

      // If value is greater than 100, set to 100.
      if (parsed < 0 || parsed > 100) return '100';

      // Return value as a string.
      return parsed.toString();

    } catch (error) {

      // Return null.
      return null;

    }

  }


  private checkFloat(value: any): boolean {
    try { if (isNaN(parseFloat(value))) return false; else return true; }
    catch (error) { return false; }
  }

}
