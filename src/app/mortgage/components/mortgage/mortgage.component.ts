import { AbstractType, Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { MortgageStepThree } from 'src/app/shared';
import { MortgageStepOne } from 'src/app/shared/models/mortgage-step-one-output.model';
import { MortgageStepTwo } from 'src/app/shared/models/mortgage-step-two-output.model';
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
    public stepTwo: MortgageStepTwo = new MortgageStepTwo();
    public stepThree: MortgageStepThree = new MortgageStepThree();


    constructor() { }

    ngOnInit() {
    }

    /** Submissions **/
    public submitStepOne(data: MortgageStepOne): void {
        this.stepOne = data;
        this.step++;
    }

    public submitStepTwo(data: MortgageStepTwo): void {
        this.stepTwo = data;
        this.step++;
    }

    public submitStepThree(data: MortgageStepThree): void {
        this.stepThree = data;
        this.step++;
    }

}