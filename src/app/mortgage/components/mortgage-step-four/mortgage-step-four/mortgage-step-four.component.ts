import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FieldFormatterService, MortgageStepOne, MortgageStepThree, MortgageStepTwo } from 'src/app/shared';
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

  constructor(
    private formBuilder: FormBuilder,
    private fieldFormatterService: FieldFormatterService
  ) { }

  ngOnInit() {
    this.form = this.buildForm();
    this.setEventListeners();
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
      desiredTimeOfPurchase: [{ value: null, disabled: false }, [Validators.required]]
    })

  }

  public updateAffordToSaveMonthly(event: FocusEvent): void {

    const value: any = event.target['value'];

    try {
      this.form.patchValue({ affordToSaveMonthly: this.fieldFormatterService.currency(value)})
    } catch (error) {
      this.form.patchValue({ affordToSaveMonthly: 0 })
    }
    console.log(event.target['value'])
  }

  public setEventListeners(): void {
    this.affordToSaveMonthly.valueChanges.subscribe(data => {
      console.log(data);
      this.patchDesiredTimeOfPurchase(CurrJS(data).multiply(2).value)
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
