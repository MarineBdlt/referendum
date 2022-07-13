import { Injectable, TemplateRef } from '@angular/core';
import { ModalComponent } from '../pages/ticket-list/modals/details-modal/modal.component';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { TicketListComponent } from '../pages/ticket-list/ticket-list.component';



@Injectable({
  providedIn: 'root'
})
export class TicketModalService {

  public tickets = TicketListComponent
  public modalRef!: BsModalRef 
  public modalRef2!: BsModalRef 
  public modalRef3!: BsModalRef 
  public modalRef4!: BsModalRef 
  public modalRef5!: BsModalRef 
  modal = ModalComponent

  constructor(private modalService: BsModalService) { }

  public openModal(template: TemplateRef<any>, ticket: any) {
    this.modalRef = this.modalService.show(template, ticket)
  }
  public openModalBis(templateBis: TemplateRef<any>, ticket: any) {
    this.modalRef = this.modalService.show(templateBis, ticket)
  }
  public openDeleteModal(deleteTemplate: TemplateRef<any>, ticket: any) {
    this.modalRef2 = this.modalService.show(deleteTemplate, ticket)
  }
  public openArchiveModal(archiveTemplate: TemplateRef<any>, ticket: any) {
    this.modalRef3 = this.modalService.show(archiveTemplate, ticket)
  }
  public openRestoreModal(restoreTemplate: TemplateRef<any>, ticket: any) {
    this.modalRef4 = this.modalService.show(restoreTemplate, ticket)
  }
  public openModalParent(parentTemplate: TemplateRef<any>, ticket: any) {
    this.modalRef5 = this.modalService.show(parentTemplate, ticket)
  }
  public openModalEdit(editTemplate: TemplateRef<any>, ticket: any) {
    this.modalRef = this.modalService.show(editTemplate, ticket)
  }

  public closeModal(){
    this.modalService.hide()
    window.location.reload()
  }
}
