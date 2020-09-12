import { Injectable } from '@angular/core';
import { InterestRateModel } from '../models/interest-rate.model';
import * as CurrJS from 'currency.js';
import { CompoundInterestRow } from '../models/compound-interest-row.model';
import { SavingsTimePeriod } from '../models/savings-time-period.model';

@Injectable({
  providedIn: 'root'
})
export class SimpleVsCompoundInterestCalculatorService {

  public rate: InterestRateModel = new InterestRateModel();
  public timePeriod: SavingsTimePeriod = new SavingsTimePeriod();

  private interest: Array<CompoundInterestRow> = new Array<CompoundInterestRow>();

  constructor() { 

    // Set Default Interest (AER) Rate.
    this.updateInterestRate(3);

    // Set Default Time Period.
    this.updateTimePeriod(2);


  }

  public updateInterestRate(annualRate: number): void {
    this.rate.annually = annualRate / 100;
    this.rate.quarterly = this.rate.annually / 4;
    this.rate.monthly = this.rate.annually / 12;
    this.rate.daily = this.rate.annually / 365;
    console.log(this.rate)
  }


  public updateTimePeriod(years: number): void {
    this.timePeriod.years = years;
    this.timePeriod.months = years * 12;
    console.log(this.timePeriod)
  }

  public calculateInterest(
    initialAmount: number = 0,
    monthlyDeposit: number = 0): void {

    this.interest = new Array<CompoundInterestRow>();

    // Add Initial Month
    this.interest.push({
      month: 0,
      monthInterest: null,
      totalInterest: 0,
      roundedAmount: CurrJS(initialAmount).value,
      amount: CurrJS(initialAmount).value
    });

    for (let i = 1; i <= this.timePeriod.months; i++) {

      const interestResult: {amount: number, monthlyInterest: number} = this.calculateMonthlyInterest(this.interest[i - 1].amount, this.rate.monthly, monthlyDeposit);

      this.interest.push({
        month: i,
        monthInterest: CurrJS(interestResult.monthlyInterest).value,
        totalInterest: CurrJS(this.interest[i-1].totalInterest + interestResult.monthlyInterest).value,
        roundedAmount: CurrJS(interestResult.amount).value,
        amount: interestResult.amount
      })
    }

    console.log(this.interest)


  }

  private calculateMonthlyInterest(
    initialAmount: number = 0,
    interestRate: number = 0,
    monthlyDeposit: number = 0): {amount: number, monthlyInterest: number } {

    const amount: number = (initialAmount + monthlyDeposit) * (1 + interestRate);
    const monthlyInterest: number = amount - monthlyDeposit - initialAmount;

    return {
      amount: amount,
      monthlyInterest: monthlyInterest
    }

  }


}
