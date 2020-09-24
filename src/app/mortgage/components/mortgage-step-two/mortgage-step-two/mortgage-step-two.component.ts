import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { MortgageStepOne } from 'src/app/shared';

@Component({
  selector: 'mortgage-step-two',
  templateUrl: './mortgage-step-two.component.html',
  styleUrls: ['./mortgage-step-two.component.scss']
})
export class MortgageStepTwoComponent implements OnInit {

  /** Previous Data **/
  @Input()
  public stepOne: MortgageStepOne;

  /** Form **/ 
  public form: FormGroup;

  constructor(
    private formBuilder: FormBuilder
  ) { }


  ngOnInit() {
    this.form = this.buildForm();
  }


  private buildForm(): FormGroup {

    return this.formBuilder.group({
    })

  }

}
