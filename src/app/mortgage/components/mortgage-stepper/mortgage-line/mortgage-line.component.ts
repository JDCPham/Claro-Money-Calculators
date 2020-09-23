import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'mortgage-line',
  templateUrl: './mortgage-line.component.html',
  styleUrls: ['./mortgage-line.component.scss']
})
export class MortgageLineComponent implements OnInit {

  @Input()
  public active: boolean = false;

  constructor() { }

  ngOnInit() {
  }

}
