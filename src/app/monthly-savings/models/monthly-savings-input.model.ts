import { Period } from './period.model';

export class MonthlySavingsInput {
    initialAmount: number;
    goalAmount: number;
    goalPeriod: Period;
}