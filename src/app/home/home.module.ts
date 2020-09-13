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
import { HomeComponent } from './components/home/home.component';

/* Service Imports */

/* Router Imports */
import { HomeRoutingModule } from './home-routing.module';



@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatSliderModule,
        AlertModule,
        NgxEchartsModule,
        HomeRoutingModule
    ],
    declarations: [
        HomeComponent
    ],
    exports: [
        CommonModule,
        HomeComponent
    ],
    providers: [
        
    ],
    entryComponents: [
        
    ],
})
export class HomeModule {

    constructor(@Optional() @SkipSelf() parentModule: HomeModule) {
        if (parentModule) throw new Error('HomeModule is already loaded.')
    }

    static forRoot(): ModuleWithProviders {
        return {
            ngModule: HomeModule,
            providers: []
        }
    }

}
