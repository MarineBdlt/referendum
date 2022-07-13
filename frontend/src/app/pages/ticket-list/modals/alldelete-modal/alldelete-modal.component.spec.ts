import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlldeleteModalComponent } from './alldelete-modal.component';

describe('AlldeleteModalComponent', () => {
  let component: AlldeleteModalComponent;
  let fixture: ComponentFixture<AlldeleteModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlldeleteModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlldeleteModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
