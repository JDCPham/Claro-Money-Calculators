import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompoundInterestGraphComponent } from './compound-interest-graph.component';

describe('CompoundInterestGraphComponent', () => {
  let component: CompoundInterestGraphComponent;
  let fixture: ComponentFixture<CompoundInterestGraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompoundInterestGraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompoundInterestGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
