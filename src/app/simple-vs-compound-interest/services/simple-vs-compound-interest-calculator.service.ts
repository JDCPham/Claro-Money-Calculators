import { Injectable } from '@angular/core';
import { InterestRateModel } from '../models/interest-rate.model';
import { CompoundInterestRow } from '../models/compound-interest-row.model';
import { SavingsTimePeriod } from '../models/savings-time-period.model';
import { MonthInterestAmount } from '../models/month-interest.model';
import * as CurrJS from 'currency.js';

@Injectable({
    providedIn: 'root'
})
export class SimpleVsCompoundInterestCalculatorService {

    // Results
    public interest: Array<CompoundInterestRow> = new Array<CompoundInterestRow>();
    public interestEarned: any = {
        compound: null,
        simple: null
    };
    public totalAmount: any = {
        compound: null,
        simple: null
    }


    public rate: InterestRateModel = new InterestRateModel();
    public timePeriod: SavingsTimePeriod = new SavingsTimePeriod();


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
    }


    public updateTimePeriod(years: number): void {
        this.timePeriod.years = years;
        this.timePeriod.months = years * 12;
    }

    public calculateInterest(initialAmount: number = 0, monthlyDeposit: number = 0): void {

        // Initialise empty array to store calculation results for each month.
        this.interest = new Array<CompoundInterestRow>();

        // Add Initial Month (Month 0).
        this.interest.push(this.generateInitialMonthResult(initialAmount));

        // Calculate for each month for number of months specified by user.
        for (let i = 1; i <= this.timePeriod.months; i++) {

            // Gather required data.
            const previousRow: CompoundInterestRow = this.interest[i - 1];
            const monthlyInterest: number = this.rate.monthly;

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
                    total: CurrJS(this.interest[i - 1].interest.compound.total + interestResult.monthlyInterestAmount.compound).value
                },
                simple: {
                    monthly: CurrJS(interestResult.monthlyInterestAmount.simple).value,
                    total: CurrJS(this.interest[i - 1].interest.simple.total + interestResult.monthlyInterestAmount.simple).value
                }
            }

            // Generate result row object.
            const monthRow: CompoundInterestRow = {
                month: i,
                amount: amount,
                interest: interest
            };

            // Add row to array.
            this.interest.push(monthRow)
        }

        // Get Last Row.
        const lastRow: CompoundInterestRow = this.interest[this.interest.length - 1];

        // Set Final Results.
        this.totalAmount = {
            compound: lastRow.amount.compound,
            simple: lastRow.amount.simple
        }

        this.interestEarned = {
            compound: lastRow.interest.compound,
            simple: lastRow.interest.simple
        }

    }

    private generateInitialMonthResult(initialAmount: number = 0): CompoundInterestRow {

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


    private calculateMonthlyInterest(
        previousRow: CompoundInterestRow,
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
            if (this.interest.length <= 0) return false;
            if (this.totalAmount.compound == null || this.totalAmount.simple == null) return false;
            if (this.interestEarned.compound == null || this.interestEarned.simple == null) return false;
            return true;
        } catch (error) {
            return false;
        }
    }


}
