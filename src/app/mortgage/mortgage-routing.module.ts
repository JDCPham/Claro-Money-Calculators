/* Angular Imports */
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MortgageComponent } from './components/mortgage/mortgage.component';

@NgModule({
  imports: [
    RouterModule.forChild([

        {  path: 'mortgage', component: MortgageComponent}

    ]),
  ],
  exports: [RouterModule]
})

export class MortgageRoutingModule {}
