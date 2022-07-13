import { Component, OnInit, Input,TemplateRef } from '@angular/core';
import { TicketModalService } from '../../../../services/ticket-modal.service';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { HttpClient } from '@angular/common/http';
import { BASE_URL } from '../../../../base_url'
import { Router } from '@angular/router';


@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.sass']
})
export class DeleteModalComponent implements OnInit {
  

  @Input() public ticket: any
  public modalRef2!: BsModalRef

  constructor(private ticketModalService: TicketModalService, private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
  }
  public openDeleteModalService(deleteTemplate: TemplateRef<any>, ticket:any) {
    this.ticketModalService.openModal(deleteTemplate, ticket)
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
}
