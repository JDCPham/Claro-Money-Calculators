import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MortgageStepTwoComponent } from './mortgage-step-two.component';

describe('MortgageStepTwoComponent', () => {
  let component: MortgageStepTwoComponent;
  let fixture: ComponentFixture<MortgageStepTwoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MortgageStepTwoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MortgageStepTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
