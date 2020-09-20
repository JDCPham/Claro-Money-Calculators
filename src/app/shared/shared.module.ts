/* Angular Imports */
import { CommonModule } from '@angular/common'
import { ModuleWithProviders } from '@angular/core';
import { NgModule } from '@angular/core';
import { Optional } from '@angular/core';
import { SkipSelf } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { ReactiveFormsModule } from '@angular/forms';
import { CompoundInterestService } from './services/compound-interest.service';

/* Component Imports */

/* Service Imports */

/* Router Imports */
;


@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule
    ],
    declarations: [
    ],
    exports: [
        CommonModule    ],
    providers: [
        
    ],
    entryComponents: [
        
    ],
})
export class SharedModule {

    constructor(@Optional() @SkipSelf() parentModule: SharedModule) {
        if (parentModule) throw new Error('SharedModule is already loaded.')
    }

    static forRoot(): ModuleWithProviders {
        return {
            ngModule: SharedModule,
            providers: []
        }
    }

}
