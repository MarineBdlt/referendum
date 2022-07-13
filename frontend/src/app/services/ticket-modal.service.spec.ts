import { TestBed } from '@angular/core/testing';

import { TicketModalService } from './ticket-modal.service';

describe('TicketModalService', () => {
  let service: TicketModalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TicketModalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
