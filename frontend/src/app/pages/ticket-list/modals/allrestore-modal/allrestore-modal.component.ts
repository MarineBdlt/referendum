import { Component, OnInit,Input,TemplateRef } from '@angular/core';
import { TicketModalService } from '../../../../services/ticket-modal.service';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { HttpClient } from '@angular/common/http';
import { BASE_URL } from '../../../../base_url'
import { Router } from '@angular/router';
import { tick } from '@angular/core/testing';

@Component({
  selector: 'app-allrestore-modal',
  templateUrl: './allrestore-modal.component.html',
  styleUrls: ['./allrestore-modal.component.sass']
})
export class AllrestoreModalComponent implements OnInit {

  @Input() public ticket: any
  public modalRef3!: BsModalRef

  constructor(private ticketModalService: TicketModalService, private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
  }

  public openAllrestoreModalService(allrestoreTemplate: TemplateRef<any>, ticket:any) {
    this.ticketModalService.openModal(allrestoreTemplate, ticket)
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

  multipleRestore() {
    for(let t in this.ticket){
      if(this.ticket[t].checked){
        this.restoreTicket(this.ticket[t].number_id)
      }
    }
  }

}
