import { Injectable } from '@angular/core';
import { Period } from '../models/period.model';
import { MonthlySavingsInput } from '../models/monthly-savings-input.model';
import { CompoundInterestCalculatorService } from './compound-interest-calculator.service';
import { MonthlySavingsResult } from '../models/monthly-savings-result.model';

@Injectable({
    providedIn: 'root'
})
export class MonthlySavingsCalculatorService {

    // Result 
    public result: MonthlySavingsResult = {
        monthlyDeposit: null
    };


    // Input
    public input: MonthlySavingsInput = {
        initialAmount: 1000,
        goalAmount: 1000000,
        goalPeriod: new Period()
    };


    constructor(
        private compoundInterestCalculator: CompoundInterestCalculatorService
    ) {

        // Set Default Goal Time Period.
        this.updateGoalPeriod(10);

    }


    public updateGoalPeriod(years: number = 0): void {
        this.input.goalPeriod.years = years;
        this.input.goalPeriod.months = years * 12;
    }

    public calculateMonthlySavings(): number {

        try {

            // Calculate Monthly Savings Accurate to £10.
            for (let i = 0; i <= this.input.goalAmount; i += 10) {
                let result = this.compoundInterestCalculator.calculateInterest(this.input.initialAmount, i, 3, this.input.goalPeriod.years);
                if (result.rounded >= this.input.goalAmount) {
                    const lowerBound: number = i - 10;
                    const upperBound: number = i + 10;
                    for (let j = lowerBound; j <= upperBound; j += 0.01) {
                        let accurateResult = this.compoundInterestCalculator.calculateInterest(this.input.initialAmount, j, 3, this.input.goalPeriod.years);
                        if (accurateResult.rounded >= this.input.goalAmount) {
                            console.log(j);
                            return j;
                            break;
                        }
                    }
                    break;
                }
            }
            return null;

        } catch (error) {
            return null;
        }
    }


    // Getters & Setters
    get resultsExist(): boolean {
        try {
            if (this.result.monthlyDeposit == null) return false;
            return true;
        } catch (err) { return false; }

    }

}
