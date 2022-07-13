import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpteamVoteResultComponent } from './opteam-vote-result.component';

describe('OpteamVoteResultComponent', () => {
  let component: OpteamVoteResultComponent;
  let fixture: ComponentFixture<OpteamVoteResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpteamVoteResultComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OpteamVoteResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
