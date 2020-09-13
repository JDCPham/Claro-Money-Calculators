/* Angular Imports */
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './components';

@NgModule({
  imports: [
    RouterModule.forChild([

        {  path: '', component: HomeComponent }

    ]),
  ],
  exports: [RouterModule]
})

export class HomeRoutingModule {}
