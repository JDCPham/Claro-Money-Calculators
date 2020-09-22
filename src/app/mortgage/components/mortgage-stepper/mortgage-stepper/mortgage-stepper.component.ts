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

}
