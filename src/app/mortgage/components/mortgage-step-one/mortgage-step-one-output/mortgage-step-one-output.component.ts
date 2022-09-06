import { Component, Input, OnInit } from '@angular/core';
import * as CurrJS from 'currency.js';

@Component({
  selector: 'mortgage-step-one-output',
  templateUrl: './mortgage-step-one-output.component.html',
  styleUrls: ['./mortgage-step-one-output.component.scss']
})
export class MortgageStepOneOutputComponent implements OnInit {

  @Input()
  public fees: number = null;

  @Input()
  public deposit: number = null;

  @Input()
  public costOfBuying: number = null;

  constructor() { }

  ngOnInit() {
  }

  // Getters & Setters
  get feesFormatted(): string {

    try {

      // If no fee exists, return empty string.
      if (this.fees == null) throw new Error();

      // Otherwise, format fee to currency and return.
      return CurrJS(this.fees, { symbol: '' }).format();

    } catch (error) { 
      
      // Return empty string if no fee exists.
      return ''; 
    
    }

  }

  get depositFormatted(): string {
    
    try {

      // If no deposit exists, return empty string.
      if (this.deposit == null) throw new Error();

      // Otherwise, format deposit to currency and return.
      return CurrJS(this.deposit, { symbol: '£' }).format();

    } catch (error) { 
      
      // Return empty string if no depsoit exists.
      return ''; 
    
    }

  }


  get costOfBuyingFormatted(): string {
    
    try {

      // If no costOfBuying exists, return empty string.
      if (this.costOfBuying == null) throw new Error();

      // Otherwise, format costOfBuying to currency and return.
      return CurrJS(this.costOfBuying, { symbol: '£' }).format();

    } catch (error) { 
      
      // Return empty string if no costOfBuying exists.
      return ''; 
    
    }

  }

}
