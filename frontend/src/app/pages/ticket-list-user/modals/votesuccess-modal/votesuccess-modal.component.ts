import { Component, OnInit, Input, TemplateRef } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ModalService } from 'src/app/services/modal.service';


@Component({
  selector: 'app-votesuccess-modal',
  templateUrl: './votesuccess-modal.component.html',
  styleUrls: ['./votesuccess-modal.component.sass']
})
export class VotesuccessModalComponent implements OnInit {

  @Input()
  public modalRef3!: BsModalRef

  constructor(private ModalService: ModalService) { }

  ngOnInit(): void {
  }

  public openVoteSuccessModalService(votesuccessTemplate: TemplateRef<any>) {
    this.ModalService.openModal(votesuccessTemplate) 
  }

  public closeModalService(){
    this.ModalService.closeModal()
  }

}
