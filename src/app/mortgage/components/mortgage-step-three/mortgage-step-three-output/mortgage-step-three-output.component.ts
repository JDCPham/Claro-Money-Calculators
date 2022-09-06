import { Component, Input, OnInit } from '@angular/core';
import * as CurrJS from 'currency.js';

@Component({
  selector: 'mortgage-step-three-output',
  templateUrl: './mortgage-step-three-output.component.html',
  styleUrls: ['./mortgage-step-three-output.component.scss']
})
export class MortgageStepThreeOutputComponent implements OnInit {

  @Input()
  public fees: number = null;

  @Input()
  public deposit: number = null;

  @Input()
  public costOfBuying: number = null;

  @Input()
  public goalSavingAmount: number = null;

  constructor() { }

  ngOnInit() {
  }

  // Getters
  get feesFormatted(): string {
    return CurrJS(this.fees, { symbol: '' }).format()
  }

  get depositFormatted(): string {
    return CurrJS(this.deposit, { symbol: '' }).format()
  }

  get costOfBuyingFormatted(): string {
    return CurrJS(this.costOfBuying, { symbol: '' }).format()
  }

  get goalSavingAmountFormatted(): string {
    return CurrJS(this.goalSavingAmount, { symbol: '' }).format()
  }

}
