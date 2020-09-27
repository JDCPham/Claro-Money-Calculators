import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MortgageStepOne, MortgageStepThree, MortgageStepTwo } from 'src/app/shared';

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

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.form = this.buildForm();
  }


  private buildForm(): FormGroup {

    // Monthly savings.
    let monthlySavings: number;

    // Get monthly savings if exists.
    try {
      if (this.stepThree.specified) monthlySavings = this.stepThree.monthlySavings;
      else monthlySavings = 500;
      if (monthlySavings == null || isNaN(monthlySavings)) throw Error();
    } catch (error) {
      monthlySavings = 500;
    }

    return this.formBuilder.group({
      affordToSaveMonthly: [{ value: monthlySavings, disabled: false }, [Validators.required, Validators.pattern(this.currencyPattern)]],
      rent: [{ value: null, disabled: false }, [Validators.required, Validators.pattern(this.currencyPattern)]]
    })

  }


  /* Form Getters */
  get affordToSaveMonthly(): AbstractControl {
    return this.form.get('affordToSaveMonthly');
  }

}
