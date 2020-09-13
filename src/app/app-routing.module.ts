import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { RouterModule } from '@angular/router';
import { CompoundInterestComponent } from './compound-interest';
import { HomeComponent } from './home';
import { SimpleVsCompoundInterestComponent } from './simple-vs-compound-interest';


const routes: Routes = [

  
  { path: 'calculator/simple-compound', component: SimpleVsCompoundInterestComponent, pathMatch: 'full'},
  { path: 'calculator/compound', component: CompoundInterestComponent, pathMatch: 'full'},
  { path: '**', component: HomeComponent, pathMatch: 'full' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
