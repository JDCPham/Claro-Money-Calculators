// Module Imports
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms'
import { SimpleVsCompoundInterestModule } from './simple-vs-compound-interest/simple-vs-compound-interest.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Material
import { MatSliderModule } from '@angular/material/slider';
import { AlertModule } from 'ngx-bootstrap/alert';

// ECharts
import { NgxEchartsModule } from 'ngx-echarts';
import { CompoundInterestComponent } from './compound-interest/components/compound-interest/compound-interest.component';
import { CompoundInterestGraphComponent } from './compound-interest/components/compound-interest-graph/compound-interest-graph.component';
import { CompoundInterestModule } from './compound-interest/compound-interest.module';
import { HomeComponent } from './home/components/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSliderModule,
    ReactiveFormsModule,
    SimpleVsCompoundInterestModule.forRoot(),
    CompoundInterestModule.forRoot(),
    AlertModule.forRoot(),
    NgxEchartsModule.forRoot({ echarts: loadECharts})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function loadECharts() {
  return import('echarts')
}
