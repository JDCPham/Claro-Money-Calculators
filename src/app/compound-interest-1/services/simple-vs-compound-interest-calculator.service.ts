import { Injectable } from '@angular/core';
import { InterestRate } from '../models/interest-rate.model';
import { MonthlyInterestResult } from '../models/monthly-interest-result.model';
import { SavingsPeriod } from '../models/savings-period.model';
import { MonthInterestAmount } from '../models/month-interest.model';
import * as CurrJS from 'currency.js';
import { CompoundInterest1Component } from '../components';
import { SimpleCompoundInterestResult } from '../models';
import { SimpleCompoundInput } from '../models/simple-compound-input.model';

@Injectable({
    providedIn: 'root'
})
export class SimpleVsCompoundInterestCalculatorService {

    // Results
    public results: SimpleCompoundInterestResult = {
        detailed: new Array<MonthlyInterestResult>(),
        interest: { compound: null, simple: null },
        amount: { compound: null, simple: null }
    };

    // Input
    public input: SimpleCompoundInput = {
        interest: new InterestRate(),
        savingsPeriod: new SavingsPeriod()
    }


    constructor() {

        // Set Default Interest (AER) Rate.
        this.updateInterestRate(3);

        // Set Default Time Period.
        this.updateTimePeriod(2);

    }


    /** Given an annual interest rate (AER) > 1, sets the interest rate for other periods. */
    public updateInterestRate(annualRate: number): void {

        // Transform annual rate into percentage/decimal.
        annualRate = annualRate / 100;

        this.input.interest = {
            annually: annualRate,
            quarterly: annualRate / 4,
            monthly: annualRate / 12,
            daily: annualRate / 365
        };
    }


    /** Given the savings period in years, sets the time period in years and months. */
    public updateTimePeriod(years: number): void {
        this.input.savingsPeriod.years = years;
        this.input.savingsPeriod.months = years * 12;
    }


    /** Performs interest calculation given all available input data. */
    public calculateInterest(initialAmount: number = 0, monthlyDeposit: number = 0): void {

        // Initialise empty array to store calculation results for each month.
        this.results.detailed = new Array<MonthlyInterestResult>();

        // Add Initial Month (Month 0).
        this.results.detailed.push(SimpleVsCompoundInterestCalculatorService.generateInitialMonthResult(initialAmount));

        // Calculate for each month for number of months specified by user.
        for (let i = 1; i <= this.input.savingsPeriod.months; i++) {

            // Gather required data.
            const previousRow: MonthlyInterestResult = this.results.detailed[i - 1];
            const monthlyInterest: number = this.input.interest.monthly;

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
            const interest: any = {
                compound: {
                    monthly: CurrJS(interestResult.monthlyInterestAmount.compound).value,
                    total: CurrJS(this.results.detailed[i - 1].interest.compound.total + interestResult.monthlyInterestAmount.compound).value
                },
                simple: {
                    monthly: CurrJS(interestResult.monthlyInterestAmount.simple).value,
                    total: CurrJS(this.results.detailed[i - 1].interest.simple.total + interestResult.monthlyInterestAmount.simple).value
                }
            }

            // Generate result row object.
            const monthRow: MonthlyInterestResult = {
                month: i,
                amount: amount,
                interest: interest
            };

            // Add row to array.
            this.results.detailed.push(monthRow)
        }

        // Get Last Row.
        const lastRow: MonthlyInterestResult = this.results.detailed[this.results.detailed.length - 1];

        // Set Final Results.
        this.results.amount = {
            compound: lastRow.amount.compound,
            simple: lastRow.amount.simple
        }

        this.results.interest = {
            compound: lastRow.interest.compound,
            simple: lastRow.interest.simple
        }

    }


    /** Helper method: returns an empty row object. */
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


    // Getters & Setters
    get resultsExist(): boolean {
        try {
            if (this.results.detailed.length <= 0) return false;
            if (this.results.amount.compound == null || this.results.amount.simple == null) return false;
            if (this.results.interest.compound == null || this.results.interest.simple == null) return false;
            return true;
        } catch (error) {
            return false;
        }
    }


}
