export class CompoundInterestRow {
   month: number;
   amount: {
      compound: {
         rounded: number;
         raw: number;
      },
      simple: {
         rounded: number;
         raw: number;
      }
   };
   interest: {
      compound: {
         monthly: number;
         total: number;
      },
      simple: {
         monthly: number;
         total: number;
      }
   }
}