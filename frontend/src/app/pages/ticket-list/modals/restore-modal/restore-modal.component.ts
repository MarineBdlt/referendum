import { Component, OnInit, Input,TemplateRef } from '@angular/core';
import { TicketModalService } from '../../../../services/ticket-modal.service';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { HttpClient } from '@angular/common/http';
import { Ticket } from 'src/app/modele/Ticket';
import {BASE_URL} from '../../../../base_url'
import { Router } from '@angular/router';

@Component({
  selector: 'app-restore-modal',
  templateUrl: './restore-modal.component.html',
  styleUrls: ['./restore-modal.component.sass']
})
export class RestoreModalComponent implements OnInit {

  @Input() public ticket: any
  public modalRef4!: BsModalRef

  constructor(private ticketModalService: TicketModalService, private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
  }

  public openRestoreModalService(restoreTemplate: TemplateRef<any>, ticket:any) {
    this.ticketModalService.openModal(restoreTemplate, ticket)
  }
  restoreTicket(number_id: number) {
    this.http.put(BASE_URL + `/tickets/restored/${number_id}`, undefined, {
        withCredentials: true
      })
      .subscribe(() => {
        this.closeModalService()
        this.router.navigate(['ticketList'])
      })
  }
  public closeModalService(){
    this.ticketModalService.closeModal()
  }
}
