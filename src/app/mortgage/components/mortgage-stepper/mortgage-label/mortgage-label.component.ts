import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'mortgage-label',
  templateUrl: './mortgage-label.component.html',
  styleUrls: ['./mortgage-label.component.scss']
})
export class MortgageLabelComponent implements OnInit {

  @Input()
  public value: any;

  public styles: any = {
    width: "150px"
  };

  constructor() { }

  ngOnInit() {
  }

}
