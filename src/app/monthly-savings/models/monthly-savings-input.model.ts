import { Period } from '../../shared/models';

export class MonthlySavingsInput {
    initialAmount: number;
    goalAmount: number;
    goalPeriod: Period;
}