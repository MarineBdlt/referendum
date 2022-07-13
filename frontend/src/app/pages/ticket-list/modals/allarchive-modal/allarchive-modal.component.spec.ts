import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllarchiveModalComponent } from './allarchive-modal.component';

describe('AllarchiveModalComponent', () => {
  let component: AllarchiveModalComponent;
  let fixture: ComponentFixture<AllarchiveModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllarchiveModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllarchiveModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
