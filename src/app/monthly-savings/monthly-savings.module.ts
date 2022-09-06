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
import { MonthlySavingsComponent } from './components/monthly-savings/monthly-savings.component';

/* Service Imports */

/* Router Imports */
import { MonthlySavingsRoutingModule } from './monthly-savings-routing.module';
;


@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatSliderModule,
        AlertModule,
        NgxEchartsModule,
        MonthlySavingsRoutingModule
    ],
    declarations: [
        MonthlySavingsComponent
    ],
    exports: [
        CommonModule,
        MonthlySavingsComponent
    ],
    providers: [
        
    ],
    entryComponents: [
        
    ],
})
export class MonthlySavingsModule {

    constructor(@Optional() @SkipSelf() parentModule: MonthlySavingsModule) {
        if (parentModule) throw new Error('MonthlySavingsModule is already loaded.')
    }

    static forRoot(): ModuleWithProviders {
        return {
            ngModule: MonthlySavingsModule,
            providers: []
        }
    }

}
