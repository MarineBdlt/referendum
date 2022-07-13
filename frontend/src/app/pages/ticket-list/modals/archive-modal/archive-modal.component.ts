import { Component, OnInit, Input,TemplateRef } from '@angular/core';
// import { Ticket } from '../../../../modele/Ticket';
import { TicketModalService } from '../../../../services/ticket-modal.service';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { HttpClient } from '@angular/common/http';
import { BASE_URL } from '../../../../base_url'
import { Router } from '@angular/router';

@Component({
  selector: 'app-archive-modal',
  templateUrl: './archive-modal.component.html',
  styleUrls: ['./archive-modal.component.sass']
})
export class ArchiveModalComponent implements OnInit {

  @Input() public ticket: any
  public modalRef3!: BsModalRef

  constructor(private ticketModalService: TicketModalService, private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
  }

  public openArchiveModalService(archiveTemplate: TemplateRef<any>, ticket:any) {
    this.ticketModalService.openModal(archiveTemplate, ticket)
  }
  archiveTicket(number_id: number) {
    this.http.put(BASE_URL + `/tickets/archived/${number_id}`, undefined, {
        withCredentials: true
      })
      .subscribe(() => {
        this.closeModalService()
        this.router.navigateByUrl('/ticketList') // pourquoi ne fonctionne pas ?
      })
  }
  public closeModalService(){
    this.ticketModalService.closeModal()
  }
}
