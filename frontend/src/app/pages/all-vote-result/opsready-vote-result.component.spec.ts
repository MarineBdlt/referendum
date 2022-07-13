import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpsreadyVoteResultComponent } from './opsready-vote-result.component';

describe('OpsreadyVoteResultComponent', () => {
  let component: OpsreadyVoteResultComponent;
  let fixture: ComponentFixture<OpsreadyVoteResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpsreadyVoteResultComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OpsreadyVoteResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
