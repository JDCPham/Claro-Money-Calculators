import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MortgageStepOne, ValidateNumber } from 'src/app/shared';
import { MortgageStepThree } from 'src/app/shared/models/mortgage-step-three-output.model';
import { MortgageStepTwo } from 'src/app/shared/models/mortgage-step-two-output.model';
import { ErrorMessageService } from 'src/app/shared/services/error-message.service';
import { FieldFormatterService } from 'src/app/shared/services/field-formatter.service';
import * as CurrJS from 'currency.js';

@Component({
  selector: 'mortgage-step-three',
  templateUrl: './mortgage-step-three.component.html',
  styleUrls: ['./mortgage-step-three.component.scss']
})
export class MortgageStepThreeComponent implements OnInit {

  /* Patterns */
  private currencyPattern: string = '^[0-9,]+([\.][0-9]{1,2})?$';

  /** Previous Data **/
  @Input()
  public stepOne: MortgageStepOne;

  @Input()
  public stepTwo: MortgageStepTwo;

  /** Form **/
  public form: FormGroup;

  /** Flags **/
  public isLoading: boolean = false;
  public monthlySavingsKnown: boolean = null;

  /** Error **/
  public error: string = null;

  /** Outputs **/
  @Output()
  public submit: EventEmitter<MortgageStepThree> = new EventEmitter<MortgageStepThree>();

  /** **/
  public defaultValues: any = {

  };

  constructor(
    private formBuilder: FormBuilder,
    private errorMessageService: ErrorMessageService,
    private fieldFormatterService: FieldFormatterService
  ) {}

  ngOnInit() {
    this.form = this.buildForm();
  }


  private buildForm(): FormGroup {

    return this.formBuilder.group({
      income: [{ value: null, disabled: false }, [Validators.required, Validators.pattern(this.currencyPattern)]],
      rent: [{ value: null, disabled: false }, [Validators.required, Validators.pattern(this.currencyPattern)]],
      utilities: [{ value: null, disabled: false }, [Validators.required, Validators.pattern(this.currencyPattern)]],
      subscriptions: [{ value: null, disabled: false }, [Validators.required, Validators.pattern(this.currencyPattern)]],
      family: [{ value: null, disabled: false }, [Validators.required, Validators.pattern(this.currencyPattern)]],
      leisure: [{ value: null, disabled: false }, [Validators.required, Validators.pattern(this.currencyPattern)]],
      other: [{ value: null, disabled: false }, [Validators.required, Validators.pattern(this.currencyPattern)]]
    })

  }

  /** Sets Monthly Savings Known Flag. Sets default values if set to False. **/
  public setMonthlySavingsKnown(value: boolean = false): void {

    // If including other fees, user will enter own values, so remove default.
    if (value) this.form.patchValue({ })

    // If not including other fees, prefill with defaults.
    else this.form.patchValue(this.defaultValues)

    // Set flag.
    this.monthlySavingsKnown = value;

    // Set untouched
    this.form.markAsUntouched();

  }


  public errorMessage(errors: any): string {
    return this.errorMessageService.getErrorMessage(errors);
  };


  public next(): void {

    // Set loading flag.
    this.isLoading = true;

    try {

      // Set specified flag.
      let specified: boolean = this.monthlySavingsKnown == null ? null : !this.monthlySavingsKnown;

      // Create result object.
      const result: MortgageStepThree = new MortgageStepThree(
        CurrJS(this.income.value).value,
        CurrJS(this.rent.value).value,
        CurrJS(this.utilities.value).value,
        CurrJS(this.subscriptions.value).value,
        CurrJS(this.family.value).value,
        CurrJS(this.leisure.value).value,
        CurrJS(this.other.value).value,
        specified
      );

      // Check if expenses greater than income.
      if (!result.enoughIncome) {

        // Set error message.
        this.error = "Expenses are greater than income."

        // Return from function.
        return;

      } else {

        // Remove any existing error message.
        this.error = null;

      }

      // Emit output.
      this.submit.emit(result);


    } catch (error) {

      // Set error.
      this.error = 'There was an error, please check your input fields';

      // Set loading flag.
      this.isLoading = false; 

    }
  }


  /* Field Formatters */
  public formatCurrency(field: string): void {

    const patch: Object = new Object();

    patch[field] = this.fieldFormatterService.currency(this.form.get(field).value);

    this.form.patchValue(patch)
  }


  /* Getters & Setters */
  get isFormValid(): boolean {

    // Check form is valid if toggle is false.
    if (this.monthlySavingsKnown === false && this.form.valid) return true;

    // Check form is valid if toggle is true.
    if (this.monthlySavingsKnown === true) return true;

    // Otherwise return false.
    return false;

  }


  /* Form Validity */
  get incomeInvalid(): boolean {
    return this.income.invalid && this.income.touched
  }

  get rentInvalid(): boolean {
    return this.rent.invalid && this.rent.touched
  }

  get utilitiesInvalid(): boolean {
    return this.utilities.invalid && this.utilities.touched
  }

  get subscriptionsInvalid(): boolean {
    return this.subscriptions.invalid && this.subscriptions.touched
  }

  get familyInvalid(): boolean {
    return this.family.invalid && this.family.touched
  }

  get leisureInvalid(): boolean {
    return this.leisure.invalid && this.leisure.touched
  }

  get otherInvalid(): boolean {
    return this.other.invalid && this.other.touched
  }


  /* Form Getters */
  get income(): AbstractControl {
    return this.form.get('income');
  }

  get rent(): AbstractControl {
    return this.form.get('rent');
  }

  get utilities(): AbstractControl {
    return this.form.get('utilities');
  }

  get subscriptions(): AbstractControl {
    return this.form.get('subscriptions');
  }

  get family(): AbstractControl {
    return this.form.get('family');
  }

  get leisure(): AbstractControl {
    return this.form.get('leisure');
  }

  get other(): AbstractControl {
    return this.form.get('other');
  }



}
