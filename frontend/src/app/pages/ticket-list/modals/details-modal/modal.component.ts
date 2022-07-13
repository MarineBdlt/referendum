import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { TicketModalService } from '../../../../services/ticket-modal.service';
import { Ticket } from '../../../../modele/Ticket';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { HttpClient } from '@angular/common/http';
import { BASE_URL } from 'src/app/base_url';
import { AccountService } from "../../../../services/account.service";

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.sass']
})

export class ModalComponent implements OnInit {

  @Input() public ticket: any
  public modalRef!: BsModalRef
  public ticketParent: Ticket[]=[]
  public ticketTest: Ticket[]=[] // a quoi sert cette variable
  public ticketParentTitle:string=""
  public ticketParentContent:string=""
  public ticketParentArchived:boolean=false
  public ticketParentNumberId:number=0
  public ticketParentProductId:number=0
  
  public is_Admin : any = null
  
  constructor(private ticketModalService: TicketModalService,
              private http:HttpClient, 
              private accountService: AccountService) {}
  
  ngOnInit(): void {
    // show title depends_of
    this.getTitleParent(this.ticket.depends_of)

    this.accountService.isAdmin().subscribe(data => {
      this.is_Admin = data
      console.log("Check admin", this.is_Admin)
    })
  }

  public openModalService(template: TemplateRef<any>, ticket:any) {
    this.ticketModalService.openModal(template, ticket)
  }
  public openModalBisService(templateBis: TemplateRef<any>, ticket:any) {
    this.ticketModalService.openModal(templateBis, ticket)
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

  // function to open modal depends_of
  public openModalParentService(parentTemplate: TemplateRef<any>, ticket: any, id:number) {
    this.http.get < Ticket[] > (BASE_URL + `/tickets/detail/${id}`, {
      withCredentials: true
    })
    .subscribe((response: Ticket[]) => {
      this.ticketParent = response
      this.ticketParentTitle = this.ticketParent[0].title
      this.ticketParentContent = this.ticketParent[0].content
      this.ticketParentArchived = this.ticketParent[0].archived
      this.ticketParentNumberId = this.ticketParent[0].number_id
      this.ticketParentProductId = this.ticketParent[0].product_id
      this.ticketModalService.openModalParent(parentTemplate, this.ticketParent[0])
    })
  }
//function get title of depends_of
  getTitleParent(id:number){
    this.http.get < Ticket[] > (BASE_URL + `/tickets/detail/${id}`, {
      withCredentials: true
    })
    .subscribe((response: Ticket[])=>{
      this.ticketParent= response
      this.ticketParentTitle = this.ticketParent[0].title
    })
  }
  public closeModalService(){
    this.ticketModalService.closeModal()
  }

}
