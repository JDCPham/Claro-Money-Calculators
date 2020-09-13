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
import { CompoundInterestComponent } from './components/compound-interest/compound-interest.component';
import { CompoundInterestGraphComponent } from './components/compound-interest-graph/compound-interest-graph.component';

/* Service Imports */

/* Router Imports */
import { CompoundInterestRoutingModule } from './compound-interest-routing.module';
;


@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatSliderModule,
        AlertModule,
        NgxEchartsModule,
        CompoundInterestRoutingModule
    ],
    declarations: [
        CompoundInterestComponent,
        CompoundInterestGraphComponent
    ],
    exports: [
        CommonModule,
        CompoundInterestComponent
    ],
    providers: [
        
    ],
    entryComponents: [
        
    ],
})
export class CompoundInterestModule {

    constructor(@Optional() @SkipSelf() parentModule: CompoundInterestModule) {
        if (parentModule) throw new Error('CompoundInterestModule is already loaded.')
    }

    static forRoot(): ModuleWithProviders {
        return {
            ngModule: CompoundInterestModule,
            providers: []
        }
    }

}
