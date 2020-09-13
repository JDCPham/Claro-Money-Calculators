/* Angular Imports */
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CompoundInterestComponent } from './components';

@NgModule({
  imports: [
    RouterModule.forChild([

        {  path: 'compound-interest', component: CompoundInterestComponent }

    ]),
  ],
  exports: [RouterModule]
})

export class CompoundInterestRoutingModule {}
