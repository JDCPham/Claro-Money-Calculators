/* Angular Imports */
import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

import { AbstractControl } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';

/* Custom Code Imports */
import { ValidatePercentage } from 'src/app/shared/validators';
import { ValidateNumber } from 'src/app/shared/validators';

import { FieldFormatterService } from 'src/app/shared/services';
import { ErrorMessageService } from 'src/app/shared/services';

import { MortgageStepOne } from 'src/app/shared/models';

/* External Library Imports */
import * as CurrJS from 'currency.js';


@Component({
  selector: 'mortgage-step-one',
  templateUrl: './mortgage-step-one.component.html',
  styleUrls: ['./mortgage-step-one.component.scss']
})
export class MortgageStepOneComponent implements OnInit {

  /* Patterns */
  private currencyPattern: string = '^[0-9,]+([\.][0-9]{1,2})?$';

  /* Form */
  public form: FormGroup;

  /* Flags */
  public otherFees: boolean = null;
  public isLoading: boolean = false;

  /* Errors */
  public error: string = null;

  /* Outputs */
  @Output()
  public submit: EventEmitter<MortgageStepOne> = new EventEmitter<MortgageStepOne>();
 
  /* Other */
  public defaultValues: any = {
    stampDuty: '2,000.00',
    legalFees: '3,000.00',
    mortgageBrokerFees: '4,000.00',
    mortgageCosts: '5,000.00'
  };


  /* Constructor */
  constructor(
    private formBuilder: FormBuilder,
    private errorMessageService: ErrorMessageService,
    private fieldFormatterService: FieldFormatterService
  ) { }


  public ngOnInit(): void {
    
    // Build and set form.
    this.form = this.buildForm();

  }


  private buildForm(): FormGroup {

    // Create reactive form and return.
    return this.formBuilder.group({
      propertyValue: [{ value: null, disabled: false }, [Validators.required, Validators.pattern(this.currencyPattern)]],
      depositValue: [{ value: null, disabled: false }, [Validators.required, ValidatePercentage]],
      stampDuty: [{ value: this.defaultValues.stampDuty, disabled: false }, [Validators.required, Validators.pattern(this.currencyPattern)]],
      legalFees: [{ value: this.defaultValues.legalFees, disabled: false }, [Validators.required, Validators.pattern(this.currencyPattern)]],
      mortgageBrokerFees: [{ value: this.defaultValues.mortgageBrokerFees, disabled: false }, [Validators.required, Validators.pattern(this.currencyPattern)]],
      mortgageCosts: [{ value: this.defaultValues.mortgageCosts, disabled: false }, [Validators.required, Validators.pattern(this.currencyPattern)]],
    })

  }


  public setOtherFees(value: boolean = false): void {

    // If including other fees, user will enter own values, so remove default.
    if (value) this.form.patchValue({ stampDuty: null, legalFees: null, mortgageBrokerFees: null, mortgageCosts: null })

    // If not including other fees, prefill with defaults.
    else this.form.patchValue(this.defaultValues)

    // Set flag.
    this.otherFees = value;

    // Set untouched
    this.form.markAsUntouched();

  }

  
  public errorMessage(errors: any): string {

    // Return error message as string.
    return this.errorMessageService.getErrorMessage(errors);

  };


  /** Go to next step. **/
  public next(): void {

    // Set Loading Flag.
    this.isLoading = true;

    try {

      // Create result object.
      const result: MortgageStepOne = new MortgageStepOne();

      // Get Property Value.
      result.propertyValue = CurrJS(this.propertyValue.value).value;

      // Percentage.
      const percentageAsDecimal: number = (parseFloat(this.depositValue.value) / 100);

      // Calculate deposit value.
      result.depositValue = CurrJS(result.propertyValue).multiply(percentageAsDecimal).value;

      // Get Stamp Duty.
      result.stampDuty = CurrJS(this.stampDuty.value).value;

      // Get Legal Fees.
      result.legalFees = CurrJS(this.legalFees.value).value;

      // Get Mortgage Broker Fees.
      result.mortgageBrokerFees = CurrJS(this.mortgageBrokerFees.value).value;

      // Get Mortgage Costs.
      result.mortgageCosts = CurrJS(this.mortgageCosts.value).value;

      // Emit event.
      this.submit.emit(result)

    } catch (error) {

      // Set error.
      this.error = "An error occurred, please check your input values and try again."

      // Set loading flag.
      this.isLoading = false;

    }

    // Set loading flag.
    this.isLoading = false;

  }


  /** Field Formatters **/
  public formatPropertyValue(): void { this.form.patchValue({ propertyValue: this.fieldFormatterService.currency(this.propertyValue.value) }) }
  public formatDepositValue(): void { this.form.patchValue({ depositValue: this.fieldFormatterService.percentage(this.depositValue.value) }) }
  public formatStampDuty(): void { this.form.patchValue({ stampDuty: this.fieldFormatterService.currency(this.stampDuty.value) }) }
  public formatLegalFees(): void { this.form.patchValue({ legalFees: this.fieldFormatterService.currency(this.legalFees.value) }) }
  public formatMortgageBrokerFees(): void { this.form.patchValue({ mortgageBrokerFees: this.fieldFormatterService.currency(this.mortgageBrokerFees.value) }) }
  public formatMortgageCosts(): void { this.form.patchValue({ mortgageCosts: this.fieldFormatterService.currency(this.mortgageCosts.value) }) }



  /* Getters & Setters */
  get showOtherFeeFields(): boolean {
    if (this.otherFees === true) return true;
    return false;
  }

  get isFormValid(): boolean {
    return this.form.valid;
  }


  /* Form Validity */
  get propertyValueInvalid(): boolean {
    return this.propertyValue.invalid && this.propertyValue.dirty && this.propertyValue.touched
  }

  get depositValueInvalid(): boolean {
    return this.depositValue.invalid && this.depositValue.touched && this.depositValue.dirty;
  }

  get stampDutyInvalid(): boolean {
    return this.stampDuty.invalid && this.stampDuty.touched && this.stampDuty.dirty;
  }

  get legalFeesInvalid(): boolean {
    return this.legalFees.invalid && this.legalFees.touched && this.legalFees.dirty;
  }

  get mortgageBrokerFeesInvalid(): boolean {
    return this.mortgageBrokerFees.invalid && this.mortgageBrokerFees.touched && this.mortgageBrokerFees.dirty;
  }

  get mortgageCostsInvalid(): boolean {
    return this.mortgageCosts.invalid && this.mortgageCosts.touched && this.mortgageCosts.dirty;
  }


  /* Form Getters */
  get propertyValue(): AbstractControl {
    return this.form.get('propertyValue');
  }

  get depositValue(): AbstractControl {
    return this.form.get('depositValue');
  }

  get stampDuty(): AbstractControl {
    return this.form.get('stampDuty');
  }

  get legalFees(): AbstractControl {
    return this.form.get('legalFees');
  }

  get mortgageBrokerFees(): AbstractControl {
    return this.form.get('mortgageBrokerFees');
  }

  get mortgageCosts(): AbstractControl {
    return this.form.get('mortgageCosts');
  }

}
