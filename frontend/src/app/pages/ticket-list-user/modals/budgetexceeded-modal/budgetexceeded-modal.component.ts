import { Component, OnInit, Input, TemplateRef } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-budgetexceeded-modal',
  templateUrl: './budgetexceeded-modal.component.html',
  styleUrls: ['./budgetexceeded-modal.component.sass']
})
export class BudgetexceededModalComponent implements OnInit {

  @Input()
  public modalRef3!: BsModalRef
  
  constructor(private ModalService: ModalService) { }

  ngOnInit(): void {
  }

  public openBudgetExceededModalService(budgetexceededTemplate: TemplateRef<any>) {
    this.ModalService.openModal(budgetexceededTemplate) 
  }

  public closeModalService(){
    this.ModalService.closeModal()
  }

}
