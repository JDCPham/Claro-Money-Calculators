import { Injectable } from '@angular/core';
import { InterestRate } from '../models/interest-rate.model';
import { MonthlyInterestResult } from '../models/monthly-interest-result.model';
import { Period } from '../models/period.model';
import * as CurrJS from 'currency.js';
import { MonthInterestAmount } from '../models/month-interest-amount.model';

@Injectable({
  providedIn: 'root'
})
export class CompoundInterestService {

  constructor() { }


  public calculateInterestByMonth(
    initialAmount: number = 0,
    monthlyDeposit: number = 0,
    interestRate: number = 1,
    months: number = 1
  ): any {

    // Convert Interest Rate into Decimal.
    interestRate = interestRate / 100;

    // Generate interest rate object.
    const interest: InterestRate = {
      annually: interestRate,
      quarterly: interestRate / 4,
      monthly: interestRate / 12,
      daily: interestRate / 365
    };

    // Generate number of years.
    const savingsPeriod: Period = {
      years: months / 12,
      months: months
    };

    // Create empty array to store results.
    const results: Array<MonthlyInterestResult> = new Array<MonthlyInterestResult>();

    // Add Initial Month (Month 0).
    results.push(CompoundInterestService.generateInitialMonthResult(initialAmount));

    for (let i = 1; i <= savingsPeriod.months; i++) {

      // Gather required data.
      const previousRow: MonthlyInterestResult = results[i - 1];
      const monthlyInterest = interest.monthly;

      // Calculate monthly interest.
      const interestResult: MonthInterestAmount = this.calculateMonthlyInterest(previousRow, initialAmount, monthlyInterest, monthlyDeposit);

      // Generate and round this month's total savings (inc. interest accrued & monthly deposit)
      const amount: any = {
        compound: {
          rounded: CurrJS(interestResult.endAmount.compound).value,
          raw: interestResult.endAmount.compound
        },
        simple: {
          rounded: CurrJS(interestResult.endAmount.simple).value,
          raw: interestResult.endAmount.simple
        }
      }

      // Generate and round only this (and total) monthly interest amounts.
      const accruedInterest: any = {
        compound: {
          monthly: CurrJS(interestResult.monthlyInterestAmount.compound).value,
          total: CurrJS(results[i - 1].interest.compound.total + interestResult.monthlyInterestAmount.compound).value
        },
        simple: {
          monthly: CurrJS(interestResult.monthlyInterestAmount.simple).value,
          total: CurrJS(results[i - 1].interest.simple.total + interestResult.monthlyInterestAmount.simple).value
        }
      }

      // Generate result row object.
      const monthRow: MonthlyInterestResult = {
        month: i,
        amount: amount,
        interest: accruedInterest
      };

      // Add row to array.
      results.push(monthRow)
    }

    console.log(results)

    return results;

    // Get Last Row.
    const lastRow: MonthlyInterestResult = results[results.length - 1];

    return lastRow.amount.compound;

  }


  public calculateInterest(initialAmount: number = 0, monthlyDeposit: number = 0, interestRate: number = 1, years: number = 0): any {

    return this.calculateInterestByMonth(initialAmount, monthlyDeposit, interestRate, years * 12);

  }


  public static generateInitialMonthResult(initialAmount: number = 0): MonthlyInterestResult {
    return {
      month: 0,
      amount: {
        compound: {
          rounded: CurrJS(initialAmount).value,
          raw: CurrJS(initialAmount).value
        },
        simple: {
          rounded: CurrJS(initialAmount).value,
          raw: CurrJS(initialAmount).value
        }
      },
      interest: {
        compound: {
          monthly: 0,
          total: 0
        },
        simple: {
          monthly: 0,
          total: 0
        }
      }
    }
  }

  /** Calculates compound and simple interest for one month */
  private calculateMonthlyInterest(
    previousRow: MonthlyInterestResult,
    initialAmount: number = 0,
    interestRate: number = 0,
    monthlyDeposit: number = 0
  ): MonthInterestAmount {

    // Get Necessary Data.
    const startCompoundAmount: number = previousRow.amount.compound.raw;
    const startSimpleAmount: number = previousRow.amount.simple.raw;

    // Calculate Compound Amount & Interest Rates.
    const compoundAmount: number = (startCompoundAmount + monthlyDeposit) * (1 + interestRate);
    const compoundInterestAmount: number = compoundAmount - monthlyDeposit - startCompoundAmount;

    // Calculate Simple Amount & Interest Rates.
    const simpleInterestAmount: number = (initialAmount * (1 + interestRate)) - initialAmount;
    const simpleAmount: number = startSimpleAmount + simpleInterestAmount + monthlyDeposit

    // Return results.
    return {
      endAmount: {
        compound: compoundAmount,
        simple: simpleAmount
      },
      monthlyInterestAmount: {
        compound: compoundInterestAmount,
        simple: simpleInterestAmount
      }
    }
  }
}
