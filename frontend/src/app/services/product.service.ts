import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../modele/Product';
import { BASE_URL } from '../base_url';
import {Ticket} from "../modele/Ticket";
import {ProductChoiceComponent} from "../pages/product-choice/product-choice.component";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  getProductListService(idCompany: number) {
    return this.http.get< Product[] >(BASE_URL + `/company_product/product/${idCompany}`, {
      withCredentials: true
    })
  }


}
