import { AbstractType, Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { MortgageStepOne } from 'src/app/shared/models/mortgage-step-one-output.model';
import { MortgageStep } from '../../enums/mortgage-step.enum';

@Component({
    selector: 'app-mortgage',
    templateUrl: './mortgage.component.html',
    styleUrls: ['./mortgage.component.scss']
})
export class MortgageComponent implements OnInit {

    /** Stepper **/
    public step: MortgageStep = MortgageStep.STEP1;

    /** Step Data **/
    public stepOne: MortgageStepOne = new MortgageStepOne();


    constructor() { }

    ngOnInit() {
    }

    /** Submissions **/
    public submitStepOne(data: MortgageStepOne): void {
        this.stepOne = data;
        this.step++;
    }

}