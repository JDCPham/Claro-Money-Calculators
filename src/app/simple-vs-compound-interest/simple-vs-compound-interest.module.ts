/* Angular Imports */
import { CommonModule } from '@angular/common'
import { ModuleWithProviders } from '@angular/core';
import { NgModule } from '@angular/core';
import { Optional } from '@angular/core';
import { SkipSelf } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { ReactiveFormsModule } from '@angular/forms';

/* Material */
import { MatSliderModule } from '@angular/material/slider';

/* Component Imports */
import { SimpleVsCompoundInterestComponent } from './components/simple-vs-compound-interest/simple-vs-compound-interest.component';

/* Service Imports */

/* Router Imports */
import { SimpleVsCompoundInterestRoutingModule } from './simple-vs-compound-interest-routing.module';



@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatSliderModule,
        SimpleVsCompoundInterestRoutingModule
    ],
    declarations: [
        SimpleVsCompoundInterestComponent
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
