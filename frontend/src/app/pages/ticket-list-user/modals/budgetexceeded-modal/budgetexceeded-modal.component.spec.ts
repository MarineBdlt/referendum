import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetexceededModalComponent } from './budgetexceeded-modal.component';

describe('BudgetexceededModalComponent', () => {
  let component: BudgetexceededModalComponent;
  let fixture: ComponentFixture<BudgetexceededModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BudgetexceededModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BudgetexceededModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
