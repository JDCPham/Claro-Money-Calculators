import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MortgageStepOne } from 'src/app/shared';
import * as CurrJS from 'currency.js';

@Component({
  selector: 'mortgage-step-two-output',
  templateUrl: './mortgage-step-two-output.component.html',
  styleUrls: ['./mortgage-step-two-output.component.scss']
})
export class MortgageStepTwoOutputComponent implements OnInit {

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

}
