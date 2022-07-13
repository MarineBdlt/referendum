import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Ticket } from '../modele/Ticket';
import { Vote } from "../modele/Vote";
import { BASE_URL } from '../base_url';

@Injectable({
  providedIn: 'root'
})
export class TicketsService {
  public tickets: Ticket[] = []

  constructor(private http: HttpClient) { }


  public printListTicketsService() {
    return this.http.get < Ticket[] > (BASE_URL + '/tickets/', {

      withCredentials: true
    })
  }

  printListTicketsByProductService(idProduct: number){
    return this.http.get < Ticket[] > (BASE_URL + `/product/tickets/${idProduct}`,{
      withCredentials: true
    })
  }

  public getVotes(idCompany: number) {
    return this.http.get<Vote[]>(BASE_URL + `/vote/get_votes/${idCompany}`, {
      withCredentials: true
    })
  }


  public printListVotes(number_ticket_id: number) {
    return this.http.get<Vote[]>(BASE_URL + `/vote/amount_ticket/${number_ticket_id}`, {
      withCredentials: true
    })
  }

}

