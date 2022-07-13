import { Component, OnInit,Input,TemplateRef } from '@angular/core';
import { TicketModalService } from '../../../../services/ticket-modal.service';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { HttpClient } from '@angular/common/http';
import { BASE_URL } from '../../../../base_url'
import { Router } from '@angular/router';
// import { tick } from '@angular/core/testing';

@Component({
  selector: 'app-alldelete-modal',
  templateUrl: './alldelete-modal.component.html',
  styleUrls: ['./alldelete-modal.component.sass']
})
export class AlldeleteModalComponent implements OnInit {

  @Input() public ticket: any
  public modalRef2!: BsModalRef

  constructor(private ticketModalService: TicketModalService, private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
  }

  public openAlldeleteModalService(AlldeleteTemplate: TemplateRef<any>, ticket:any) {
    this.ticketModalService.openModal(AlldeleteTemplate, ticket)
  }
  confirmDelete(number_id: number) {
    this.http.delete(BASE_URL + `/tickets/delete/${number_id}`, {
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

  multipleDelete() {
    for(let t in this.ticket){
      if(this.ticket[t].checked){
        this.confirmDelete(this.ticket[t].number_id)
      }
    }

  }
}
