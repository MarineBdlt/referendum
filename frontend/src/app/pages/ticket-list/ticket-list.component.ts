import {
  Component,
  OnInit,
  TemplateRef
} from '@angular/core';
import {
  HttpClient
} from '@angular/common/http';
import { BASE_URL } from '../../base_url'
import { Ticket } from '../../modele/Ticket';
import { TicketModalService } from 'src/app/services/ticket-modal.service';
import { TicketsService } from 'src/app/services/tickets.service';
import { tick } from '@angular/core/testing';

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.sass'],
  providers: [TicketsService]
})

  export class TicketListComponent implements OnInit {
    public tickets: any
    public ticketParent: Ticket[] = []
    public content: string = ""
    public ticketSelectedContent: string = ""
    public ticketTitle: string = ""
    public ticketParentTitle: string = ""

    public isAllChecked = false


    // public choix = checkbox.value

    selectAll(){
      this.isAllChecked = !this.isAllChecked;
      for(let t in this.tickets){
        if(this.isAllChecked){
          this.tickets[t].checked = true;
        }
        else{
          this.tickets[t].checked = false;
        }
      }
    }

    checkboxValue(ticket: any){
      ticket.checked = !ticket.checked;
      this.isAllChecked = false;
    }


  constructor(
    private http: HttpClient,
    private ticketModalService: TicketModalService,
    private ticketsService: TicketsService,
    ) {}

  ngOnInit(): void {

    this.printListTickets()
  }

  // FUNCTION PRINT TOTAL LIST TICKETS
  public printListTickets(){

    this.ticketsService.printListTicketsService()
    .subscribe((response: Ticket[]) => {
     this.tickets = response
    })
 }

  // FUNCTION TO FILTER BY SOMETHING
  public filterBy(filtre: string) {
    this.http.get < Ticket[] > (BASE_URL + `/tickets/filter/${filtre}`, {
      withCredentials: true
    })
    .subscribe((response: Ticket[]) => {
      this.tickets = response
    })
  }

// call ticketModalService for open Modals
  public openModalService(template: TemplateRef<any>, ticket: any) {
    this.ticketModalService.openModal(template, ticket)
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
  public openEditModalService(editTemplate: TemplateRef<any>, ticket: any) {
    this.ticketModalService.openModal(editTemplate, ticket)
  }
  public openAllarchiveModalService(allarchiveTemplate: TemplateRef<any>, ticket: any) {
    this.ticketModalService.openModal(allarchiveTemplate, ticket)
  }
  public openAllrestoreModalService(allrestoreTemplate: TemplateRef<any>, ticket: any) {
    this.ticketModalService.openModal(allrestoreTemplate, ticket)
  }
  public openAlldeleteModalService(alldeleteTemplate: TemplateRef<any>, ticket: any) {
    this.ticketModalService.openModal(alldeleteTemplate, ticket)
  }

}
