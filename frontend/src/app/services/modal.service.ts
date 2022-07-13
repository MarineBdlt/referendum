import { Injectable, TemplateRef } from '@angular/core';
import { ModalComponent } from '../pages/ticket-list/modals/details-modal/modal.component';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Injectable({
    providedIn: 'root'
  })
export class ModalService {

    public simplemodalRef! : BsModalRef
    modal = ModalComponent

    constructor(private modalService: BsModalService) {}

    public openModal(template: TemplateRef<any>) {
        this.simplemodalRef = this.modalService.show(template)
      }
    public openVoteSuccessModal(template: TemplateRef<any>) {
        this.simplemodalRef = this.modalService.show(template)
    }
    public openBudgetExceededModal(template: TemplateRef<any>) {
        this.simplemodalRef = this.modalService.show(template)
    }

    public closeModal(){
        this.modalService.hide()
        window.location.reload()
    }
}