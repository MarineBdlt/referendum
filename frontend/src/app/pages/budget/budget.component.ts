import {
  HttpClient
} from '@angular/common/http';
import {
  Component,
  OnInit
} from '@angular/core';
import {
  Budget
} from 'src/app/modele/Budget'
import {
  BASE_URL
} from 'src/app/base_url';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import {
  Product
} from 'src/app/modele/Product';
import {
  Company
} from 'src/app/modele/Company';
import {
  DatePipe
} from '@angular/common'
import { BudgetService } from 'src/app/services/budget.service';
import { combineLatest } from 'rxjs';
import { tap } from 'rxjs/operators';

interface BudgetDetail extends Budget {
  companyName: string
  productName: string
}

@Component({
  selector: 'app-budget',
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.sass']
})
export class BudgetComponent implements OnInit {

  public products: Product[] = []
  public budget: any
  public companies: Company[] = []
  public budget_id: number = 0
  public total_budget: number = 0
  public company_id: number = 0
  public product_id: number = 0
  public start_time: Date = new Date
  public end_time: Date = new Date
  public formBudget: FormGroup
  public confirm: boolean = false
  public error: boolean = false
  public warning_budget: boolean = false
  public error_date: boolean = false
  public totalBudget: number = 0
  public budgetId: number = 0
  public companySelected: number = 0
  public productList: number[] = []
  public end_timeList: Date[] = []
  public checkDate: boolean = false

  public budgetsList: Budget[] = []
  public budgetsDetailList: BudgetDetail[] = []


  constructor(
    private http: HttpClient,
    private formBuilder: FormBuilder,
    public datepipe: DatePipe,
    public budgetService: BudgetService,
    )
    {
    this.formBudget = this.formBuilder.group({
      total_budget: ['', Validators.required],
      company_id: ['', Validators.required],
      product_id: ['', Validators.required],
      start_time: ['', Validators.required],
      end_time: ['', Validators.required],
    })

  }

  public ngOnInit(): void {
    this.getAllBudgets()
  }


  // send data from form to api
  public addBudget() {
    this.http.post(BASE_URL + '/budget/add_budget/', {
        total_budget: this.total_budget,
        company_id: this.company_id,
        product_id: this.product_id,
        start_time: this.start_time,
        end_time: this.end_time,
      }, {
        withCredentials: true
      })
      .subscribe({
        next: () => {
          this.confirm = true
          this.getAllBudgets()
        },
        error: (e) => {
          console.error(e)
          this.error = true
        }
      })
  }

  submit(): void {
    this.productList = []
    this.end_timeList = []
    this.checkDate = true
    this.confirm = false
    this.error = false
    this.warning_budget = false
    this.error_date = false

    this.budgetService.getBudget(this.company_id)
    .subscribe((response: Budget[]) => {
      this.budget = response
      let string_start_time = this.datepipe.transform(this.start_time, 'yyyy-MM-dd')
      let string_end_time = this.datepipe.transform(this.end_time, 'yyyy-MM-dd')  //in case nothing is choose in date, change the format to string for the if bellow

      for(let t in this.budget){
        this.productList.push(this.budget[t].product_id)    //filling list with the product_id associated with the budget already in db
        this.end_timeList.push(this.budget[t].end_time)     //same with all the end_time in db
        if(this.product_id == this.budget[t].product_id &&  //filter by product
          string_start_time! <= this.budget[t].end_time    //if the start_time given is before any end_time saved
          ){
              this.checkDate = false
        }
      }
      let p_id: number = +this.product_id //Variable created to convert this.produc_id to a type number

      this.totalBudget = this.budget.total_budget
      this.budgetId = this.budget.budget_id
      this.companySelected = this.budget.company_id

      if (this.formBudget.valid && (!this.productList.includes(p_id) || this.checkDate==true) && (string_end_time! > string_start_time! )) {//check if product_id is already in db or if the date are conflicting, finally check if start date is well before end date
        this.addBudget()
      }
      else{
        if(string_end_time! > string_start_time!) {
          this.warning_budget = true
        }
        else {
          this.error_date = true
        }
      }
    })
  }

  // display product in option select product
  public getProducts() {
    return this.http.get < Product[] > (BASE_URL + `/product/`, {
        withCredentials: true
      })
  }
  public getCompanies() {
    return this.http.get < Company[] > (BASE_URL + '/company/', {
        withCredentials: true
      })
  }

  public getAllBudgets() {
    combineLatest(
      [
        this.getProducts(),
        this.getCompanies(),
        this.budgetService.getAllBudgets(),
      ]
    )
    .subscribe(([_products, _companies, _budgets]) => {
      this.products = _products
      this.companies = _companies
      this.budgetsList = _budgets
      let mapped_list = this.budgetsList.map(b => {
      let comp_name = this.companies.find(comp => comp.company_id == b.company_id)?.company_name
      let prod_name = this.products.find(comp => comp.product_id == b.product_id)?.name
        return {
          ...b,
          companyName: comp_name ?? "",
          productName: prod_name ?? "",
        }
      })
      this.budgetsDetailList = mapped_list
    })
  }
}
