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
    SimpleVsCompoundInterestModule.forRoot(),
    AlertModule.forRoot(),
    NgxEchartsModule.forRoot({ echarts: () => import('echarts') })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
