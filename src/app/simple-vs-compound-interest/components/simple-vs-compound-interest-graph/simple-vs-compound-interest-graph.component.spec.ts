import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleVsCompoundInterestGraphComponent } from './simple-vs-compound-interest-graph.component';

describe('SimpleVsCompoundInterestGraphComponent', () => {
  let component: SimpleVsCompoundInterestGraphComponent;
  let fixture: ComponentFixture<SimpleVsCompoundInterestGraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimpleVsCompoundInterestGraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimpleVsCompoundInterestGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
