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
import { CompoundInterest2Component } from './components/compound-interest-2/compound-interest-2.component';
import { CompoundInterest2GraphComponent } from './components/compound-interest-2-graph/compound-interest-2-graph.component';

/* Service Imports */

/* Router Imports */
import { CompoundInterest2RoutingModule } from './compound-interest-2-routing.module';
;


@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatSliderModule,
        AlertModule,
        NgxEchartsModule,
        CompoundInterest2RoutingModule
    ],
    declarations: [
        CompoundInterest2Component,
        CompoundInterest2GraphComponent
    ],
    exports: [
        CommonModule,
        CompoundInterest2Component
    ],
    providers: [
        
    ],
    entryComponents: [
        
    ],
})
export class CompoundInterest2Module {

    constructor(@Optional() @SkipSelf() parentModule: CompoundInterest2Module) {
        if (parentModule) throw new Error('CompoundInterest2Module is already loaded.')
    }

    static forRoot(): ModuleWithProviders {
        return {
            ngModule: CompoundInterest2Module,
            providers: []
        }
    }

}
