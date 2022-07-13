import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VotesuccessModalComponent } from './votesuccess-modal.component';

describe('VotesuccessModalComponent', () => {
  let component: VotesuccessModalComponent;
  let fixture: ComponentFixture<VotesuccessModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VotesuccessModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VotesuccessModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
