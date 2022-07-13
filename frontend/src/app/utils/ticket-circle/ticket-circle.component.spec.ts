import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketCircleComponent } from './ticket-circle.component';

describe('TicketCircleComponent', () => {
  let component: TicketCircleComponent;
  let fixture: ComponentFixture<TicketCircleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TicketCircleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketCircleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
