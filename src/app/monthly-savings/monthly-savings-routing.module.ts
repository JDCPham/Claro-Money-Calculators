/* Angular Imports */
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MonthlySavingsComponent } from './components';

@NgModule({
  imports: [
    RouterModule.forChild([

        {  path: 'savings', component: MonthlySavingsComponent}

    ]),
  ],
  exports: [RouterModule]
})

export class MonthlySavingsRoutingModule {}
