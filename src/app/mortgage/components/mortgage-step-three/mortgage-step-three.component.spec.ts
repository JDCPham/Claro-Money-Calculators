import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MortgageStepThreeComponent } from './mortgage-step-three.component';

describe('MortgageStepThreeComponent', () => {
  let component: MortgageStepThreeComponent;
  let fixture: ComponentFixture<MortgageStepThreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MortgageStepThreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MortgageStepThreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
