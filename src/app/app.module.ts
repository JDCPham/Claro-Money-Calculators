// Module Imports
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms'
import { CompoundInterest1Module } from './compound-interest-1/compound-interest-1.module';
import { CompoundInterest2Module } from './compound-interest-2/compound-interest-2.module';
import { MonthlySavingsModule } from './monthly-savings/monthly-savings.module';
import { MortgageModule } from './mortgage/mortgage.module';
import { SharedModule } from './shared/shared.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Material
import { MatSliderModule } from '@angular/material/slider';
import { AlertModule } from 'ngx-bootstrap/alert';

// ECharts
import { NgxEchartsModule } from 'ngx-echarts';
import { HomeModule } from './home/home.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSliderModule,
    ReactiveFormsModule,
    HomeModule.forRoot(),
    MonthlySavingsModule.forRoot(),
    CompoundInterest1Module.forRoot(),
    CompoundInterest2Module.forRoot(),
    AlertModule.forRoot(),
    MortgageModule.forRoot(),
    SharedModule.forRoot(),
    NgxEchartsModule.forRoot({ echarts: loadECharts})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function loadECharts() {
  return import('echarts')
}
