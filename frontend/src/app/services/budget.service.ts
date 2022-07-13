import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Budget } from '../modele/Budget';
import { BASE_URL } from '../base_url';

@Injectable({
  providedIn: 'root'
})
export class BudgetService {
  public budget: Budget[]= []

  constructor(private http: HttpClient) { }

    public getBudget(idCompany: number) {
      return this.http.get < Budget[] > (BASE_URL + `/budget/${idCompany}/`, {
          withCredentials: true
        })
    }

    public getAllBudgets() {
      return this.http.get < Budget[] > (BASE_URL + `/budgets/`, {
        withCredentials: true
      })
    }

}
