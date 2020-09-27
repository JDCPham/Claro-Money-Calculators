import * as CurrJS from 'currency.js';

export class MortgageStepThree {

    constructor(
        income: number = null,
        rent: number = null,
        utilities: number = null,
        subscriptions: number = null,
        family: number = null,
        leisure: number = null,
        other: number = null,
        specified: boolean = null) {

        this.income = income;
        this.rent = rent;
        this.utilities = utilities;
        this.subscriptions = subscriptions;
        this.family = family;
        this.leisure = leisure;
        this.other = other;

    }

    specified: boolean;

    income: number;
    rent: number;
    utilities: number;
    subscriptions: number;
    family: number;
    leisure: number;
    other: number;

    get monthlySavings(): number {
        return CurrJS(this.income - this.expenses).value;
    }

    get expenses(): number {
        return CurrJS(this.rent + this.utilities + this.subscriptions + this.family + this.leisure + this.other).value;
    }

    get enoughIncome(): boolean {
        try {

            if (this.monthlySavings < 0) return false;
            else return true;

        } catch (error) {

            return false;

        }
    }
}