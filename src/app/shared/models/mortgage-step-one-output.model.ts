import * as CurrJS from 'currency.js';

export class MortgageStepOne {
    propertyValue: number;
    depositValue: number;
    stampDuty: number;
    legalFees: number;
    mortgageBrokerFees: number;
    mortgageCosts: number;

    get fees(): number {
        return CurrJS(this.legalFees + this.stampDuty + this.mortgageBrokerFees + this.mortgageCosts).value;
    }

    get costOfBuying(): number {
        return CurrJS(this.depositValue + this.fees).value;
    }
}