import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleVsCompoundInterestComponent } from './simple-vs-compound-interest.component';

describe('SimpleVsCompoundInterestComponent', () => {
  let component: SimpleVsCompoundInterestComponent;
  let fixture: ComponentFixture<SimpleVsCompoundInterestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimpleVsCompoundInterestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimpleVsCompoundInterestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
