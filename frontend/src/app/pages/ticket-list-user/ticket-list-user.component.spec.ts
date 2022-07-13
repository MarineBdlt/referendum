import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketListUserComponent } from './ticket-list-user.component';

describe('TicketListUserComponent', () => {
  let component: TicketListUserComponent;
  let fixture: ComponentFixture<TicketListUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TicketListUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketListUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
