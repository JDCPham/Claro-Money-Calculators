/* Angular Imports */
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CompoundInterest2Component } from './components';

@NgModule({
  imports: [
    RouterModule.forChild([

        {  path: 'compound-interest-2', component: CompoundInterest2Component }

    ]),
  ],
  exports: [RouterModule]
})

export class CompoundInterest2RoutingModule {}
