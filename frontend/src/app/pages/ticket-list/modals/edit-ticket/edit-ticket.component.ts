import { Component, OnInit, Input, TemplateRef } from '@angular/core';
import { TicketModalService } from '../../../../services/ticket-modal.service';
import { Ticket } from '../../../../modele/Ticket';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { HttpClient } from '@angular/common/http';
import { BASE_URL } from 'src/app/base_url';
import { Product } from 'src/app/modele/Product';
import {FormBuilder,FormGroup, Validators} from '@angular/forms';


@Component({
  selector: 'app-edit-ticket',
  templateUrl: './edit-ticket.component.html',
  styleUrls: ['./edit-ticket.component.sass']
})
export class EditTicketComponent implements OnInit {

  @Input() public ticket: any
  public modalRef!: BsModalRef
  public tickets: Ticket[] = []
  public products: Product[] = []
  public changeTextParent :boolean = false
  public complexityOne: boolean = true
  public complexityTwo: boolean = true
  public complexityThree: boolean = true
  public complexityFive: boolean = true
  public complexityEight: boolean = true
  public complexityThirteen: boolean = true
  public complexityZero: boolean = true
  public formEdit: FormGroup
  public name:string=""
  public productSelected: number = 0
  public textProductDefaut :boolean = true
  public changeTextProduct :boolean = false
  public depends_of: number = 0
  public textParentDefaut :boolean = true
  public displaySelection: boolean = false
  public error: boolean = false
  public title: string = ""
  public content: string = ""
  public complexity: number = 0
  public number_id: string = ""

  constructor(
    private ticketModalService: TicketModalService, 
    private http:HttpClient,
    private formBuilder: FormBuilder,

    ) {
      this.formEdit = this.formBuilder.group({
        title: ['', Validators.required],
        number_id: ['', Validators.required],
        content: ['', Validators.required],
        complexity: ['', Validators.required],
        depends_of: [''],
        product_id: ['', Validators.required],
      })
     }

  ngOnInit(): void {
    this.printListTickets()
    this.printProduct()
  }

  public openModalService(editTemplate: TemplateRef<any>, ticket:any) {
    this.ticketModalService.openModal(editTemplate, ticket)
  }
  public closeModalService(){
    this.ticketModalService.closeModal()
  }
    // save value of product selected
    public clickProduct(id: number, name:string) {
      this.name = name
      this.productSelected = id
      this.textProductDefaut = false
      this.changeTextProduct = true
      this.printTicketsListByProduct(this.productSelected)
    }

      // see ticket list by product
  public printTicketsListByProduct(id: number) {
    this.http.get < Ticket[] > (BASE_URL + `/tickets/${id}`, {
        withCredentials: true
      })
      .subscribe((response: Ticket[]) => {
        this.tickets = response
      })
  }
    // save value of depends_of
    public clickDependsOf(id: number) {
      this.depends_of = id
      this.textParentDefaut = false
      this.changeTextParent = true
    }

  // display tickets list in option select depends_of
  public printListTickets() {
    this.http.get < Ticket[] > (BASE_URL + '/tickets/', {
        withCredentials: true
      })
      .subscribe((response: Ticket[]) => {
        this.tickets = response
      })
  }
// see product
  public printProduct() {
    this.http.get < Product[] > (BASE_URL + `/product/`, {
        withCredentials: true
      })
      .subscribe((response: Product[]) => {
        this.products = response
      })
  }
    // see dropdown
    public toggleSelection(): void {
      this.displaySelection = !this.displaySelection
    }
// edit ticket
    public modifTickets(id:number) {
      this.http.put(BASE_URL +  `/ticket/modif_ticket/${id}`, {
          title:this.title ||this.ticket.title,
          number_id: this.number_id ||this.ticket.number_id,
          content: this.content ||this.ticket.content,
          complexity: this.complexity ||this.ticket.complexity,
          depends_of: this.depends_of || this.ticket.depends_of,
          product_id: this.productSelected||this.ticket.product_id,
          archived: false
        }, {
          withCredentials: true
        })
        .subscribe({
          next: () => this.closeModalService(),
          error: (e) => this.error = true
        })
    }
    submit(): void {
      if (this.formEdit.valid) {
        this.modifTickets(this.ticket.number_id)
      }
      else{
        this.error = true
      }
    }
    cancel(){
        this.ticket.title = this.ticket.title
        this.closeModalService()
    }
    public valueComplexitySelected(value: number) {
    // save value complexity in var
    this.complexity = value

    // add filter of buton not selected
    if (this.complexity == 1) {
      this.complexityOne = true
    }
    else {
    this.complexityOne = false
    }
    if (this.complexity == 2) {
      this.complexityTwo = true
    }
    else {
    this.complexityTwo = false
    }
    if (this.complexity == 3) {
      this.complexityThree = true
    }
    else {
    this.complexityThree = false
    }
    if (this.complexity == 5) {
      this.complexityFive = true
    }
    else {
    this.complexityFive = false
    }
    if (this.complexity == 8) {
      this.complexityEight = true
    }
    else {
    this.complexityEight = false
    }
    if (this.complexity == 13) {
      this.complexityThirteen = true
    }
    else {
    this.complexityThirteen = false
    }
    if (this.complexity == 0) {
      this.complexityZero = true
    }
    else {
    this.complexityZero = false
    }
  }
  }

