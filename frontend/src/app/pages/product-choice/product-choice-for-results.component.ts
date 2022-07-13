import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import { Router } from "@angular/router";
import { AccountService } from "../../services/account.service";
import { ProductService } from "../../services/product.service";
import {Product} from "../../modele/Product";
import {combineLatest} from "rxjs";


@Component({
  selector: 'app-product-choice-for-results',
  templateUrl: './product-choice-for-results.component.html',
  styleUrls: ['./product-choice-for-results.component.sass']
})
export class ProductChoiceForResultsComponent implements OnInit {

  product_id: Array<any> = []
  private company_id: number = 0
  private user_id: number = 0


  constructor(
    private router: Router,
    private accountService: AccountService,
    private productService: ProductService
) { }

  ngOnInit(): void {
    this.company_id = this.accountService.user?.company_id ?? 0
    this.user_id = this.accountService.user?.user_id ?? 0
    this.getProductList(this.company_id)
      .subscribe(data => {
      this.product_id = data
        console.log(this.product_id)
    })
  }

  getProductList(id_company: number){
    return this.productService.getProductListService(id_company)
  }

}
