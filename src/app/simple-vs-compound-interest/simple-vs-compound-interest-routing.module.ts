/* Angular Imports */
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SimpleVsCompoundInterestComponent } from './components';

@NgModule({
  imports: [
    RouterModule.forChild([

        {  path: 'simple-vs-compound-interest', redirectTo: '' },
        {  path: '', component: SimpleVsCompoundInterestComponent }

    ]),
  ],
  exports: [RouterModule]
})

export class SimpleVsCompoundInterestRoutingModule {}
