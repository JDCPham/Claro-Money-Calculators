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

  @Input()
  public active: boolean = false;

  @Input()
  public current: boolean = false;

  constructor() { }

  ngOnInit() {
    console.log(this.value + " " + this.current)
  }
}
