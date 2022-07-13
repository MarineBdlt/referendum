import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestoreModalComponent } from './restore-modal.component';

describe('RestoreModalComponent', () => {
  let component: RestoreModalComponent;
  let fixture: ComponentFixture<RestoreModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RestoreModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RestoreModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
