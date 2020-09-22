import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'mortgage-step',
  templateUrl: './mortgage-step.component.html',
  styleUrls: ['./mortgage-step.component.scss']
})
export class MortgageStepComponent implements OnInit {

  @Input()
  public value: any;

  @Input()
  public first: boolean = false;

  @Input()
  public last: boolean = false;

  constructor() { }

  ngOnInit() {
  }
}
