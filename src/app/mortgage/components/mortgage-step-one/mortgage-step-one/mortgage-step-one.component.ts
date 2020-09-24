import { Component, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ErrorMessageService } from 'src/app/shared/services/error-message.service';
import { ValidatePercentage, ValidateNumber } from '../../../../shared';
import * as CurrJS from 'currency.js';
import { FieldFormatterService } from 'src/app/shared/services/field-formatter.service';
import { EventEmitter } from '@angular/core';
import { MortgageStepOne } from 'src/app/shared/models/mortgage-step-one-output.model';

@Component({
  selector: 'mortgage-step-one',
  templateUrl: './mortgage-step-one.component.html',
  styleUrls: ['./mortgage-step-one.component.scss']
})
export class MortgageStepOneComponent implements OnInit {

  // Form
  public form: FormGroup;

  // Flags
  public otherFees: boolean = null;
  public isLoading: boolean = false;

  // Errors
  public error: string = null;

  // Other
  public defaultFees: any = {
    stampDuty: '2000.00',
    legalFees: '3000.00',
    mortgageBrokerFees: '4000.00',
    mortgageCosts: '5000.00'
  };

  // Outputs
  @Output()
  public submit: EventEmitter<MortgageStepOne> = new EventEmitter<MortgageStepOne>();


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
      propertyValue: [{ value: null, disabled: false }, [Validators.required, Validators.pattern('^[0-9]+([\.][0-9]{1,2})?$'), ValidateNumber]],
      depositValue: [{ value: null, disabled: false }, [Validators.required, ValidatePercentage]],
      stampDuty: [{ value: this.defaultFees.stampDuty, disabled: false }, [Validators.required, Validators.pattern('^[0-9]+([\.][0-9]{1,2})?$'), ValidateNumber]],
      legalFees: [{ value: this.defaultFees.legalFees, disabled: false }, [Validators.required, Validators.pattern('^[0-9]+([\.][0-9]{1,2})?$'), ValidateNumber]],
      mortgageBrokerFees: [{ value: this.defaultFees.mortgageBrokerFees, disabled: false }, [Validators.required, Validators.pattern('^[0-9]+([\.][0-9]{1,2})?$'), ValidateNumber]],
      mortgageCosts: [{ value: this.defaultFees.mortgageCosts, disabled: false }, [Validators.required, Validators.pattern('^[0-9]+([\.][0-9]{1,2})?$'), ValidateNumber]],
    })

  }


  /** Sets Other Fees Flag. Sets default values if set to False. **/
  public setOtherFees(value: boolean = false): void {

    // If including other fees, user will enter own values, so remove default.
    if (value) this.form.patchValue({ stampDuty: null, legalFees: null, mortgageBrokerFees: null, mortgageCosts: null })

    // If not including other fees, prefill with defaults.
    else this.form.patchValue(this.defaultFees)

    // Set flag.
    this.otherFees = value;

    // Set untouched
    this.form.markAsUntouched();

  }

  public errorMessage(errors: any): string {

    return this.errorMessageService.getErrorMessage(errors);

  };

  /** Field Formatters **/

  public formatPropertyValue(): void { this.form.patchValue({ propertyValue: this.fieldFormatterService.currency(this.propertyValue.value) }) }
  public formatDepositValue(): void { this.form.patchValue({ depositValue: this.fieldFormatterService.percentage(this.depositValue.value) }) }
  public formatStampDuty(): void { this.form.patchValue({ stampDuty: this.fieldFormatterService.currency(this.stampDuty.value) }) }
  public formatLegalFees(): void { this.form.patchValue({ legalFees: this.fieldFormatterService.currency(this.legalFees.value) }) }
  public formatMortgageBrokerFees(): void { this.form.patchValue({ mortgageBrokerFees: this.fieldFormatterService.currency(this.mortgageBrokerFees.value) }) }
  public formatMortgageCosts(): void { this.form.patchValue({ mortgageCosts: this.fieldFormatterService.currency(this.mortgageCosts.value) }) }

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



  // Getters & Setters

  get showOtherFeeFields(): boolean {
    if (this.otherFees === true) return true;
    return false;
  }

  get isFormValid(): boolean {
    return this.form.valid;
  }

  // Form Validity
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


  // Form Getters
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
