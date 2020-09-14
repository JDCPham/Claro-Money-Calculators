import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { MonthlySavingsResult } from '../../models/monthly-savings-result.model';
import { MonthlySavingsCalculatorService } from '../../services/monthly-savings-calculator.service';
import * as CurrJS from 'currency.js'

@Component({
    selector: 'app-monthly-savings',
    templateUrl: './monthly-savings.component.html',
    styleUrls: ['./monthly-savings.component.scss']
})
export class MonthlySavingsComponent implements OnInit {

    // Form.
    public form: FormGroup;

    // Results
    public result: MonthlySavingsResult = {
        monthlyDeposit: null
    };
    


    constructor(
        private formBuilder: FormBuilder,
        private calculatorService: MonthlySavingsCalculatorService
    ) { }


    ngOnInit() {
        this.form = this.buildForm();
        this.setEventListeners();
    }


    private buildForm(): FormGroup {

        return this.formBuilder.group({
            goalAmount: [{ value: this.calculatorService.input.goalAmount, disabled: false }, [Validators.required]],
            currentSavings: [{ value: this.calculatorService.input.initialAmount, disabled: false }, [Validators.required]],
            goalPeriod: [{ value: this.calculatorService.input.goalPeriod.years, disabled: false }, [Validators.required]]
        })

    }


    public setGoalPeriod(years: number): void {
        this.form.patchValue({
            goalPeriod: years
        });
    }


    private setEventListeners(): void {
        this.setGoalPeriodEventListener();
    }

    public calculateMonthlySavings(): number {
        this.calculatorService.input.initialAmount = this.currentSavings;
        this.calculatorService.input.goalAmount = this.goalAmount;
        this.result.monthlyDeposit = this.calculatorService.calculateMonthlySavings();
        return this.result.monthlyDeposit;
    }

    private setGoalPeriodEventListener(): void {
        this.form.get('goalPeriod').valueChanges.subscribe(value => {
            this.calculatorService.updateGoalPeriod(value);
            this.calculateMonthlySavings();
        })
    }

    // Getters & Setters
    get monthlyDepositFormatted(): string {
        try { return CurrJS(this.result.monthlyDeposit).format() } catch (error) { }
    }

    get goalAmount(): number {
        return this.form.get('goalAmount').value;
    }

    get currentSavings(): number {
        return this.form.get('currentSavings').value;
    }


}
