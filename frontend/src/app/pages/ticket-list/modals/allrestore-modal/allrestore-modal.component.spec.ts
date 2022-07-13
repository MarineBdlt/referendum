import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllrestoreModalComponent } from './allrestore-modal.component';

describe('AllrestoreModalComponent', () => {
  let component: AllrestoreModalComponent;
  let fixture: ComponentFixture<AllrestoreModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllrestoreModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllrestoreModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
