import { Component, Input, OnInit } from '@angular/core';
import { MortgageStep } from '../../../enums';

@Component({
  selector: 'mortgage-stepper',
  templateUrl: './mortgage-stepper.component.html',
  styleUrls: ['./mortgage-stepper.component.scss']
})
export class MortgageStepperComponent implements OnInit {

  @Input()
  public step: MortgageStep;

  public labels: any = {
    step1: "Cost of buying",
    step2: "Savings",
    step3: "Monthly Savings",
    step4: "Savings, time of purchase & risk"
  }

  constructor() { }

  ngOnInit() {
  }
  

  /** Return True iff given step is current step or earlier. **/
  public isCurrentStep(value: number): boolean {

    // Reduce step by 1 to allow comparison with MortgageStep Enum.
    value -= 1;

    // Activate dot only if current step or previous step.
    if (value == this.step) return true;

    // Otherwise leave as false.
    else return false;

  }


  /** Return True iff given step is current step or earlier. **/
  public isLineActive(value: number): boolean {

    // Activate line only if current step or previous step.
    if (value <= this.step) return true;

    // Otherwise leave as false.
    else return false;

  };


  /** Return True iff given step is current step or earlier. **/
  public isDotActive(value: number): boolean {

    // Reduce step by 1 to allow comparison with MortgageStep Enum.
    value -= 1;

    // Activate dot only if current step or previous step.
    if (value <= this.step) return true;

    // Otherwise leave as false.
    else return false;
    
  }

}
