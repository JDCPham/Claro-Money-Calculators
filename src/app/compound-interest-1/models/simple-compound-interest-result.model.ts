import { MonthlyInterestResult } from './monthly-interest-result.model';

export class SimpleCompoundInterestResult {
   detailed: Array<MonthlyInterestResult>;
   interest: {
      compound: {
         monthly: number;
         total: number;
      };
      simple: {
         monthly: number;
         total: number;
      }
   };
   amount: {
      compound: {
         rounded: number;
         raw: number;
      };
      simple: {
         rounded: number;
         raw: number;
      }
   }
}