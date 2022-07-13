import {
  Component,
  OnInit
} from '@angular/core';
import {
  HttpClient
} from '@angular/common/http';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';

import {
  Router
} from '@angular/router';
import {
  BASE_URL
} from '../../base_url'
import { Ticket } from '../../modele/Ticket';
import { Product } from 'src/app/modele/Product';




@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.sass']
})
export class FormComponent implements OnInit {
  public tickets: Ticket[] = []
  public products: Product[] = []
  public error: boolean = false
  public displaySelection: boolean = false
  public product_id: number = 0
  public title: string = ""
  public content: string = ""
  public complexity: number = 0
  public number_id: string = ""
  public archived: boolean = false
  public depends_of: number = 0
  public formcreation: FormGroup
  public productSelected: number = 0
  public dependsOfSelected: number = 0
  public ticketNull: any = null
  isSubmitted = false
  public textParentDefaut :boolean = true
  public changeTextParent :boolean = false
  public textProductDefaut :boolean = true
  public changeTextProduct :boolean = false
  public complexityOne: boolean = true
  public complexityTwo: boolean = true
  public complexityThree: boolean = true
  public complexityFive: boolean = true
  public complexityEight: boolean = true
  public complexityThirteen: boolean = true
  public complexityZero: boolean = true
  public name:string=""



  constructor(
    private http: HttpClient, private formBuilder: FormBuilder, private router: Router
  ) {
    this.formcreation = this.formBuilder.group({
      title: ['', Validators.required],
      number_id: ['', Validators.required],
      content: ['', Validators.required],
      complexity: ['', Validators.required],
      depends_of: [''],
      product_id: ['', Validators.required],
    })
  }

  ngOnInit() {
    this.printListTickets()
    this.printProduct()
  }

  // save complexity of ticket
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
  // buton for input number
  public increment() {
    this.number_id += 1
  }
  // save value of product selected
  public clickProduct(id: number, name:string) {
    this.name = name
    this.productSelected = id
    this.textProductDefaut = false
    this.changeTextProduct = true
    this.printTicketsListByProduct(this.productSelected)
  }
  // save value of depends_of
  public clickDependsOf(id: number) {
    this.depends_of = id
    this.textParentDefaut = false
    this.changeTextParent = true
  }
  // send data from form to api
  public addTickets() {
    this.http.post(BASE_URL + '/ticket/add_ticket/', {
        title: this.title,
        number_id: this.number_id,
        content: this.content,
        complexity: this.complexity,
        depends_of: this.depends_of || this.ticketNull,
        product_id: this.productSelected,
        archived: false
      }, {
        withCredentials: true
      })
      .subscribe({
        next: () => this.router.navigateByUrl("/ticketList"),
        error: (e) => this.error = true
      })
  }
  submit(): void {
    if (this.formcreation.valid) {
      this.addTickets()
    }
    else{
      this.error = true
    }
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
  // see ticket list by product
  public printTicketsListByProduct(id: number) {
    this.http.get < Ticket[] > (BASE_URL + `/tickets/${id}`, {
        withCredentials: true
      })
      .subscribe((response: Ticket[]) => {
        this.tickets = response
      })
  }
  // display product in option select product
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


}
