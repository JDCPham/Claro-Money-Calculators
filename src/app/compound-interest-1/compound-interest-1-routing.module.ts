/* Angular Imports */
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CompoundInterest1Component } from './components';

@NgModule({
  imports: [
    RouterModule.forChild([

        {  path: 'simple-vs-compound-interest', component: CompoundInterest1Component }

    ]),
  ],
  exports: [RouterModule]
})

export class CompoundInterest1RoutingModule {}
