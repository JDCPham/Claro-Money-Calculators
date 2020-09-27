import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CompoundInterestService, FieldFormatterService, MortgageStepOne, MortgageStepThree, MortgageStepTwo } from 'src/app/shared';
import * as CurrJS from 'currency.js';

@Component({
    selector: 'mortgage-step-four',
    templateUrl: './mortgage-step-four.component.html',
    styleUrls: ['./mortgage-step-four.component.scss']
})
export class MortgageStepFourComponent implements OnInit {

    /* Patterns */
    private currencyPattern: string = '^[0-9,]+([\.][0-9]{1,2})?$';

    /** Previous Data **/
    @Input()
    public stepOne: MortgageStepOne;

    @Input()
    public stepTwo: MortgageStepTwo;

    @Input()
    public stepThree: MortgageStepThree;

    /** Form **/
    public form: FormGroup;

    /** Flags **/
    public isLoading: boolean = false;


    /* Constructor */
    constructor(
        private formBuilder: FormBuilder,
        private fieldFormatterService: FieldFormatterService,
        private compoundInterestService: CompoundInterestService
    ) { }


    ngOnInit() {
        this.form = this.buildForm();
        this.setEventListeners();
    }


    private buildForm(): FormGroup {

        let monthlySavings: number;

        try {

            // If Monthly Savings Specified, then set initial value.
            if (this.stepThree.specified) {

                // Set initial monthly savings value.
                monthlySavings = this.stepThree.monthlySavings;

            }

            // Otherwise, set default at £500.
            else monthlySavings = 500;

            // Check if monthly savings is a number.
            if (monthlySavings == null || isNaN(monthlySavings)) throw Error();

        } catch (error) {

            // Set default monthly savings value.
            monthlySavings = 500;

        }

        // Build form.
        return this.formBuilder.group({
            affordToSaveMonthly: [{ value: monthlySavings, disabled: false }, [Validators.required, Validators.pattern(this.currencyPattern)]],
            desiredTimeOfPurchase: [{ value: null, disabled: false }, [Validators.required]]
        })

    }

    public updateAffordToSaveMonthly(event: FocusEvent): void {
        let formattedValue: string = this.fieldFormatterService.currency(event.target['value']);
        if (formattedValue == null) formattedValue = '1';
        this.form.patchValue({ affordToSaveMonthly: formattedValue })
    }

    public updateDesiredTimeOfPurchase(event: FocusEvent): void {
        this.form.patchValue({ desiredTimeOfPurchase: this.fieldFormatterService.currency(event.target['value']) })
    }

    public setEventListeners(): void {

        this.affordToSaveMonthly.valueChanges.subscribe((data: any) => {

            // Calculate minimum amount of months.
            let minimumNumberOfMonths: number = this.stepTwo.goalSavingAmount / parseFloat(data);

            // 
            let found: boolean = false;
            let currentMonths: number = minimumNumberOfMonths;

            while (!found) {
                let interest = this.compoundInterestService.calculateInterestByMonth(CurrJS(data).value, CurrJS(data).value, 1, currentMonths)
                console.log("Months: " + currentMonths + ", Interest: " + interest.rounded)
                currentMonths++;
                if (interest.rounded > this.stepTwo.goalSavingAmount) {
                    found = true;
                    this.desiredTimeOfPurchase.patchValue(Math.ceil(parseInt(currentMonths.toString())));
                }

            }
        })

    }

    public patchDesiredTimeOfPurchase(value: any): void {
        this.desiredTimeOfPurchase.patchValue(value);
    }


    /* Form Getters */
    get affordToSaveMonthly(): AbstractControl {
        return this.form.get('affordToSaveMonthly');
    }

    get desiredTimeOfPurchase(): AbstractControl {
        return this.form.get('desiredTimeOfPurchase');
    }

}
