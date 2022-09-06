import { Component, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { MortgageStepOne, ValidateNumber } from 'src/app/shared';
import { ErrorMessageService } from 'src/app/shared/services/error-message.service';
import { FieldFormatterService } from 'src/app/shared/services/field-formatter.service';
import * as CurrJS from 'currency.js';
import { MortgageStepTwo } from 'src/app/shared/models/mortgage-step-two-output.model';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'mortgage-step-two',
  templateUrl: './mortgage-step-two.component.html',
  styleUrls: ['./mortgage-step-two.component.scss']
})
export class MortgageStepTwoComponent implements OnInit {

  /* Patterns */
  private currencyPattern: string = '^[0-9,]+([\.][0-9]{1,2})?$';

  /** Previous Data **/
  @Input()
  public stepOne: MortgageStepOne;

  /** Form **/
  public form: FormGroup;

  /** Flags **/
  public isLoading: boolean = false;

  /** Errors **/
  public error: string = null;

  /** Event Emitters **/
  @Output()
  public submit: EventEmitter<MortgageStepTwo> = new EventEmitter<MortgageStepTwo>();

  constructor(
    private formBuilder: FormBuilder,
    private errorMessageService: ErrorMessageService,
    private fieldFormatterService: FieldFormatterService
  ) { }


  ngOnInit() {
    this.form = this.buildForm();
  }


  private buildForm(): FormGroup {

    return this.formBuilder.group({
      savings: [{ value: null, disabled: false }, [Validators.required, Validators.pattern(this.currencyPattern)]],
    })

  }

  public next(): void {

    // Set loading flag.
    this.isLoading = true;

    try {

      // Create result object.
      const result: MortgageStepTwo = new MortgageStepTwo();

      // Get Property Value.
      result.savings = CurrJS(this.savings.value).value;

      // Calculate Goal Saving Amount.
      result.goalSavingAmount = CurrJS(this.stepOne.costOfBuying).subtract(this.savings.value).value;

      // Check if goal saving amount is negative.
      if (result.goalSavingAmount < 0) {

        // Set error.
        this.error = "You've already got enough to put down a deposit!"

        return;
      };

      // Emit event.
      this.submit.emit(result)

    } catch (error) {

      // Set error.
      this.error = "An error occurred, please check your input values and try again."

      // Set loading flag.
      this.isLoading = false;

    }

  }


  public errorMessage(errors: any): string {
    return this.errorMessageService.getErrorMessage(errors);
  };

  /** Field Formatters **/
  public formatSavings(): void { this.form.patchValue({ savings: this.fieldFormatterService.currency(this.savings.value) }) }

  // Getters & Setters
  get isFormValid(): boolean {
    return this.form.valid;
  }

  // Form Validity
  get savingsInvalid(): boolean {
    return this.savings.invalid && this.savings.dirty && this.savings.touched
  }


  // Form Getters
  get savings(): AbstractControl {
    return this.form.get('savings');
  }

}
