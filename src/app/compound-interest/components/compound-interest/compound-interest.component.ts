import { EventEmitter } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { SimpleCompoundInterestResult } from 'src/app/simple-vs-compound-interest/models/simple-compound-interest-result.model';
import { SimpleVsCompoundInterestCalculatorService } from 'src/app/simple-vs-compound-interest/services/simple-vs-compound-interest-calculator.service';

@Component({
  selector: 'app-compound-interest',
  templateUrl: './compound-interest.component.html',
  styleUrls: ['./compound-interest.component.scss']
})
export class CompoundInterestComponent implements OnInit {

  
  // Form.
  public form: FormGroup;

  // Event Emitters.
  public updated: EventEmitter<SimpleCompoundInterestResult> = new EventEmitter<SimpleCompoundInterestResult>();


  constructor(
    private formBuilder: FormBuilder,
    private calculatorService: SimpleVsCompoundInterestCalculatorService
  ) { }


  ngOnInit() {
    this.form = this.buildForm();
    this.setEventListeners();
    this.calculateInterest();
    this.updated.emit();
  }


  private buildForm(): FormGroup {

    return this.formBuilder.group({
      existingSavings: [{ value: 100, disabled: false }, [Validators.required]],
      monthlyDeposit: [{ value: 0, disabled: false }, [Validators.required]],
      interestRate: [{ value: this.calculatorService.input.interest.annually * 100, disabled: false }, [Validators.required]],
      savingsPeriod: [{ value: this.calculatorService.input.savingsPeriod.years, disabled: false }, [Validators.required]]
    })

  }


  public setInterestRate(value: number = 1): void {
    this.form.patchValue({
      interestRate: value
    })
  }


  private setEventListeners(): void {
    this.setInterestRateEventListener();
    this.setSavingsPeriodEventListener();
  }

  public calculateInterest(): void {
    this.calculatorService.calculateInterest(this.existingSavings, this.monthlyDeposit);
    this.updated.emit(this.data);
  }

  private setInterestRateEventListener(): void {
    this.form.get('interestRate').valueChanges.subscribe(value => {
      this.calculatorService.updateInterestRate(value);
      this.calculateInterest();
    })
  }

  private setSavingsPeriodEventListener(): void {
    this.form.get('savingsPeriod').valueChanges.subscribe(value => {
      this.calculatorService.updateTimePeriod(value);
      this.calculateInterest();
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

  get data(): SimpleCompoundInterestResult {
    return this.calculatorService.results;
  }

}
