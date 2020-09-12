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
  }


  private buildForm(): FormGroup {

    return this.formBuilder.group({
      existingSavings: [{ value: 0, disabled: false }, [Validators.required]],
      monthlyDeposit: [{ value: 0, disabled: false }, [Validators.required]],
      interestRate: [{ value: 5, disabled: false }, [Validators.required]],
      savingsPeriod: [{ value: 0, disabled: false }, [Validators.required]]
    })

  }


  // Getters & Setters
  get existingSavings(): AbstractControl {
    return this.form.get('existingSavings');
  }

  get monthlyDeposit(): AbstractControl {
    return this.form.get('monthlyDeposit')
  }

  get interestRate(): AbstractControl {
    return this.form.get('interestRate')
  }

  get savingsPeriod(): AbstractControl {
    return this.form.get('savingsPeriod');
  }

}
