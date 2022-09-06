import { EventEmitter } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, Validators } from '@angular/forms';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CompoundInterestService, MonthlyInterestResult } from 'src/app/shared';
import { SimpleCompoundInterestResult } from '../../models';
import { SimpleVsCompoundInterestCalculatorService } from '../../services/simple-vs-compound-interest-calculator.service';

@Component({
  selector: 'app-compound-interest-1',
  templateUrl: './compound-interest-1.component.html',
  styleUrls: ['./compound-interest-1.component.scss']
})
export class CompoundInterest1Component implements OnInit {

  // Form.
  public form: FormGroup;

  // Event Emitters.
  public updated: EventEmitter<Array<MonthlyInterestResult>> = new EventEmitter<Array<MonthlyInterestResult>>();

  // Results.
  public result: MonthlyInterestResult = null;


  constructor(
    private formBuilder: FormBuilder,
    private calculatorService: SimpleVsCompoundInterestCalculatorService,
    private compoundInterestService: CompoundInterestService
  ) { }


  ngOnInit() {
    this.form = this.buildForm();
    this.setEventListeners();
    this.calculateInterest();
    this.updated.emit()
  }


  private buildForm(): FormGroup {

    return this.formBuilder.group({
      existingSavings: [{ value: 100, disabled: false }, [Validators.required]],
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

    // Calculate Interest.
    let results: any = this.compoundInterestService.calculateInterest(this.existingSavings, this.monthlyDeposit, this.interestRate, this.savingsPeriod)

    // Get last row.
    const lastRow: MonthlyInterestResult = results[results.length - 1];

    // Set Result.
    this.result = lastRow;

    // Emit event.
    this.updated.emit(results);
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

  get interestRate(): any {
    return this.form.get('interestRate').value;
  }

  get savingsPeriod(): any {
    return this.form.get('savingsPeriod').value
  }

  get compoundInterestEarned(): any {
    try { return this.result.interest.compound.total; }
    catch (error) { return error; }
  }

  get simpleInterestEarned(): any {
    try { return this.result.interest.simple.total; }
    catch (error) { return error; }
  }

  get compoundTotalAmount(): any {
    try { return this.result.amount.compound.rounded; }
    catch (error) { return error; }
  }

  get simpleTotalAmount(): any {
    try { return this.result.amount.simple.rounded; }
    catch (error) { return error; }
  }

  get resultsExist(): boolean {
    if (this.result == null) return false;
    else return true;
  }

  get data(): SimpleCompoundInterestResult {
    return this.calculatorService.results;
  }



}
