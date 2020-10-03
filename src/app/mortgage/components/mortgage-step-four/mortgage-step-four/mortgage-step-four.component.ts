import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CompoundInterestService, FieldFormatterService, MonthlyInterestResult, MortgageStepOne, MortgageStepThree, MortgageStepTwo } from 'src/app/shared';
import * as CurrJS from 'currency.js';
import { InterestRate } from 'src/app/mortgage/enums';

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

    /** Selected Interest Rate **/
    public interestRate: InterestRate = InterestRate.MEDIUM;

    /** Default Values **/
    public defaultMonthlySavings: number = 500;


    /* Constructor */
    constructor(
        private formBuilder: FormBuilder,
        private fieldFormatterService: FieldFormatterService,
        private compoundInterestService: CompoundInterestService
    ) { }


    ngOnInit() {
        this.setDefaultValues();
        this.form = this.buildForm();
        this.updateAffordToSaveMonthly(this.affordToSaveMonthly.value)
    }
    

    private setDefaultValues(): void {

        // Check if values from previously are specified.
        if (this.stepThree.specified === true) {

            // Set default value.
            this.defaultMonthlySavings = this.stepThree.monthlySavings;

            // Check if null.
            if (this.defaultMonthlySavings == null) this.defaultMonthlySavings = 500;

        }
    }


    private buildForm(): FormGroup {

        // Build form.
        return this.formBuilder.group({
            affordToSaveMonthly: [{ value: this.defaultMonthlySavings, disabled: false }, [Validators.required, Validators.pattern(this.currencyPattern)]],
            desiredTimeOfPurchase: [{ value: null, disabled: false }, [Validators.required]]
        })

    }


    public updateAffordToSaveMonthly(value: any): void {

        // Check if target is null.
        if (value == null) return;

        // Format user input.
        let formattedValue: string = this.fieldFormatterService.currency(value);

        // Set default value is £1.
        if (formattedValue == null) formattedValue = '1';

        // Patch value.
        this.affordToSaveMonthly.patchValue(formattedValue);

        // Calculate desired time of purchase.
        const timeOfPurchase: number = this.calculateDesiredTimeOfPurchase();

        // Patch desired time of purchase form.
        this.desiredTimeOfPurchase.patchValue(timeOfPurchase.toString())

    }

    public updateDesiredTimeOfPurchase(value: any): void {

        // Check if target is null.
        if (value == null) return;

        // Format user input.
        let formattedValue: string = this.fieldFormatterService.integer(value);

        // Set default value.
        if (formattedValue == null) formattedValue = '1';

        // Patch value.
        this.desiredTimeOfPurchase.patchValue(formattedValue);

        // Calculate afford to save monthly.
        const monthlySavings: number = this.calculateAffordToSaveMonthly()

        // Patch monthly savings form.
        this.affordToSaveMonthly.patchValue(this.fieldFormatterService.currency(monthlySavings))
    }

    private calculateAffordToSaveMonthly(): number {

        // Get "Afford To Save Monthly" value.
        const desiredTimeOfPurchase: number = parseInt(this.desiredTimeOfPurchase.value);

        // Get "Current Savings" value.
        const currentSavings: number = CurrJS(this.stepTwo.savings).value;

        // Get minimum amount to save each month.
        let maxAmount: number = this.stepTwo.goalSavingAmount / desiredTimeOfPurchase;
        console.log("Maximum amount: " + maxAmount)

        // Round down amount to nearest integer
        maxAmount = Math.ceil(maxAmount)
        console.log("Maximum amount ceil: " + maxAmount)


        // For loop.
        for (let current: number = maxAmount; current >= 1; current--) {

            // Calculate interest.
            const results: any = this.compoundInterestService.calculateInterestByMonth(currentSavings, current, this.interestRate, desiredTimeOfPurchase);

            // Get last row.
            const lastRow: MonthlyInterestResult = results[results.length - 1];

            // Get Interest.
            const interest: any = lastRow.amount.compound;

            // Logging.
            console.log("Amount: " + current + ", Interest: " + interest.rounded)

            // Check if meets target.
            if (interest.rounded < this.stepOne.costOfBuying) {

                // Console log
                console.log("Accept. Final Result: " + current + 1)

                // Return result.
                return current + 1;

            }

        }

        return maxAmount;
    }


    private calculateDesiredTimeOfPurchase(): number {

        // Get "Afford To Save Monthly" value.
        const monthlySavings: number = CurrJS(this.affordToSaveMonthly.value).value

        // Get "Current Savings" value.
        const currentSavings: number = CurrJS(this.stepTwo.savings).value;

        // Get maximum number of months.
        let maxMonths: number = this.stepTwo.goalSavingAmount / monthlySavings;
        console.log("Maximum months: " + maxMonths)

        // Round up number of months.
        maxMonths = Math.ceil(maxMonths);
        console.log("Maximum months ceil: " + maxMonths)

        // For loop from 1 to max months.
        for (let current: number = 1; current <= maxMonths; current++) {

            // Calculate interest.
            const results: any = this.compoundInterestService.calculateInterestByMonth(currentSavings, monthlySavings, this.interestRate, current);

            // Get last row.
            const lastRow: MonthlyInterestResult = results[results.length - 1];

            // Get Interest.
            const interest: any = lastRow.amount.compound;

            // Logging.
            console.log("Month: " + current + ", Interest: " + interest.rounded)

            // Check if meets target.
            if (interest.rounded >= this.stepOne.costOfBuying) {

                // Console log
                console.log("Accept. Final Result: " + current)

                // Return result.
                return current;

            }

        }

        // Return max in case of error.
        return maxMonths

    }

    public setLowRate(): void {
        this.interestRate = InterestRate.LOW;
        this.updateAffordToSaveMonthly(this.affordToSaveMonthly.value)
    }

    public setMediumRate(): void {
        this.interestRate = InterestRate.MEDIUM;
        this.updateAffordToSaveMonthly(this.affordToSaveMonthly.value)
    }

    public setHighRate(): void {
        this.interestRate = InterestRate.HIGH;
        this.updateAffordToSaveMonthly(this.affordToSaveMonthly.value)
    }



    /* Form Getters */
    get affordToSaveMonthly(): AbstractControl {
        return this.form.get('affordToSaveMonthly');
    }

    get affordToSaveMonthlyNumber(): number {
        return CurrJS(this.affordToSaveMonthly.value).value
    }

    get desiredTimeOfPurchase(): AbstractControl {
        return this.form.get('desiredTimeOfPurchase');
    }

    get desiredTimeOfPurchaseNumber(): number {
        return CurrJS(this.desiredTimeOfPurchase.value).value;
    }

    /* Flag Getters */
    get isLowRate(): boolean {
        if (this.interestRate === InterestRate.LOW) return true;
        else return false;
    }

    get isMediumRate(): boolean {
        if (this.interestRate === InterestRate.MEDIUM) return true;
        else return false;
    }

    get isHighRate(): boolean {
        if (this.interestRate === InterestRate.HIGH) return true;
        else return false;
    }

}
