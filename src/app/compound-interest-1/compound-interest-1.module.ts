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
import { CompoundInterest1Component } from './components/compound-interest-1/compound-interest-1.component';

/* Service Imports */

/* Router Imports */
import { CompoundInterest1RoutingModule } from './compound-interest-1-routing.module';
import { CompoundInterest1GraphComponent } from './components/compond-interest-1-graph/compound-interest-1-graph.component'



@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatSliderModule,
        AlertModule,
        NgxEchartsModule,
        CompoundInterest1RoutingModule
    ],
    declarations: [
        CompoundInterest1Component,
        CompoundInterest1GraphComponent
    ],
    exports: [
        CommonModule,
        CompoundInterest1Component
    ],
    providers: [
        
    ],
    entryComponents: [
        
    ],
})
export class CompoundInterest1Module {

    constructor(@Optional() @SkipSelf() parentModule: CompoundInterest1Module) {
        if (parentModule) throw new Error('CompoundInterest1Module is already loaded.')
    }

    static forRoot(): ModuleWithProviders {
        return {
            ngModule: CompoundInterest1Module,
            providers: []
        }
    }

}
