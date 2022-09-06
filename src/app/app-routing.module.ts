import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { RouterModule } from '@angular/router';
import { CompoundInterest2Component } from './compound-interest-2';
import { HomeComponent } from './home';
import { MonthlySavingsComponent } from './monthly-savings';
import { CompoundInterest1Component } from './compound-interest-1';
import { MortgageComponent } from './mortgage';


const routes: Routes = [

  
  { path: 'calculator/compound-interest-1', component: CompoundInterest1Component, pathMatch: 'full' },
  { path: 'calculator/compound-interest-2', component: CompoundInterest2Component, pathMatch: 'full' },
  { path: 'calculator/monthly-savings', component: MonthlySavingsComponent, pathMatch: 'full' },
  { path: 'calculator/mortgage', component: MortgageComponent, pathMatch: 'full' },
  { path: '**', component: HomeComponent, pathMatch: 'full' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
