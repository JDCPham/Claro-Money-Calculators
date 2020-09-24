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
      return CurrJS(value, { symbol: '', separator: '' }).format();
    } catch (error) {
      return null;
    }
  }

  public percentage(value: any): string {
    try {
      if (!this.checkFloat(value)) throw Error();
      const parsed: number = parseFloat(value);
      if (parsed < 0 || parsed > 100) return '0';
      return parsed.toString();
    } catch (error) {
      return null;
    }
  }


  private checkFloat(value: any): boolean {
    try { if (isNaN(parseFloat(value))) return false; else return true; }
    catch (error) { return false; }
  }

}
