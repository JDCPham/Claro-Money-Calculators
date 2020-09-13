import { Component, OnInit } from '@angular/core';
import { AbstractControl, Validators } from '@angular/forms';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SimpleVsCompoundInterestCalculatorService } from '../../services/simple-vs-compound-interest-calculator.service';

@Component({
  selector: 'app-simple-vs-compound-interest',
  templateUrl: './simple-vs-compound-interest.component.html',
  styleUrls: ['./simple-vs-compound-interest.component.scss']
})
export class SimpleVsCompoundInterestComponent implements OnInit {

  // Form
  private form: FormGroup;


  constructor(
    private formBuilder: FormBuilder,
    private calculatorService: SimpleVsCompoundInterestCalculatorService
  ) { }


  ngOnInit() {
    this.form = this.buildForm();
    this.setEventListeners();
  }


  private buildForm(): FormGroup {

    return this.formBuilder.group({
      existingSavings: [{ value: 0, disabled: false }, [Validators.required]],
      monthlyDeposit: [{ value: 0, disabled: false }, [Validators.required]],
      interestRate: [{ value: this.calculatorService.input.interest.annually * 100, disabled: false }, [Validators.required]],
      savingsPeriod: [{ value: this.calculatorService.input.savingsPeriod.years, disabled: false }, [Validators.required]]
    })

  }


  private setEventListeners(): void {
    this.setInterestRateEventListener();
    this.setSavingsPeriodEventListener();
  }

  public calculateInterest(): void {
    this.calculatorService.calculateInterest(this.existingSavings, this.monthlyDeposit);
  }

  private setInterestRateEventListener(): void {
    this.form.get('interestRate').valueChanges.subscribe(value => {
      this.calculatorService.updateInterestRate(value);
      this.calculatorService.calculateInterest(this.existingSavings, this.monthlyDeposit)
    })
  }

  private setSavingsPeriodEventListener(): void {
    this.form.get('savingsPeriod').valueChanges.subscribe(value => {
      this.calculatorService.updateTimePeriod(value);
      this.calculatorService.calculateInterest(this.existingSavings, this.monthlyDeposit)
    })
  }

  // Getters & Setters
  get existingSavings(): any {
    return this.form.get('existingSavings').value;
  }

  get monthlyDeposit(): any {
    return this.form.get('monthlyDeposit').value;
  }

  get compoundInterestEarned(): any {
    try { return this.calculatorService.results.interest.compound.total; }
    catch (error) { return error; }
  }

  get simpleInterestEarned(): any {
    try { return this.calculatorService.results.interest.simple.total; }
    catch (error) { return error; }
  }

  get compoundTotalAmount(): any {
    try { return this.calculatorService.results.amount.compound.rounded; }
    catch (error) { return error; }
  }

  get simpleTotalAmount(): any {
    try { return this.calculatorService.results.amount.simple.rounded; }
    catch (error) { return error; }
  }

  get resultsExist(): boolean {
    return this.calculatorService.resultsExist;
  }



}
