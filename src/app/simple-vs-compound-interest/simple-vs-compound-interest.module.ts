/* Angular Imports */
import { CommonModule } from '@angular/common'
import { ModuleWithProviders } from '@angular/core';
import { NgModule } from '@angular/core';
import { Optional } from '@angular/core';
import { SkipSelf } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { ReactiveFormsModule } from '@angular/forms';
import { AlertModule } from 'ngx-bootstrap/alert';

/* Material */
import { MatSliderModule } from '@angular/material/slider';

/* ECharts */
import { NgxEchartsModule } from 'ngx-echarts';

/* Component Imports */
import { SimpleVsCompoundInterestComponent } from './components/simple-vs-compound-interest/simple-vs-compound-interest.component';

/* Service Imports */

/* Router Imports */
import { SimpleVsCompoundInterestRoutingModule } from './simple-vs-compound-interest-routing.module';
import { SimpleVsCompoundInterestGraphComponent } from './components/simple-vs-compound-interest-graph/simple-vs-compound-interest-graph.component';



@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatSliderModule,
        AlertModule,
        NgxEchartsModule,
        SimpleVsCompoundInterestRoutingModule
    ],
    declarations: [
        SimpleVsCompoundInterestComponent,
        SimpleVsCompoundInterestGraphComponent
    ],
    exports: [
        CommonModule,
        SimpleVsCompoundInterestComponent
    ],
    providers: [
        
    ],
    entryComponents: [
        
    ],
})
export class SimpleVsCompoundInterestModule {

    constructor(@Optional() @SkipSelf() parentModule: SimpleVsCompoundInterestModule) {
        if (parentModule) throw new Error('SimpleVsCompoundInterestModule is already loaded.')
    }

    static forRoot(): ModuleWithProviders {
        return {
            ngModule: SimpleVsCompoundInterestModule,
            providers: []
        }
    }

}
