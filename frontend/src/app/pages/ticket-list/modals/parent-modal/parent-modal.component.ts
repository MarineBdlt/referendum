import { Component, OnInit, Input, TemplateRef } from '@angular/core';
import { TicketModalService } from '../../../../services/ticket-modal.service';

@Component({
  selector: 'app-parent-modal',
  templateUrl: './parent-modal.component.html',
  styleUrls: ['./parent-modal.component.sass']
})
export class ParentModalComponent implements OnInit {

  @Input() public ticket: any
  

  constructor(private ticketModalService: TicketModalService) { }

  ngOnInit(): void {
  }

  public openDeleteModalService(deleteTemplate: TemplateRef<any>, ticket: any) {
    this.ticketModalService.openModal(deleteTemplate, ticket)
  }
  public openArchiveModalService(archiveTemplate: TemplateRef<any>, ticket: any) {
    this.ticketModalService.openModal(archiveTemplate, ticket)
  }
  public openRestoreModalService(restoreTemplate: TemplateRef<any>, ticket: any) {
    this.ticketModalService.openModal(restoreTemplate, ticket)
  }
  public closeModalService(){
    this.ticketModalService.closeModal()
  }
}
