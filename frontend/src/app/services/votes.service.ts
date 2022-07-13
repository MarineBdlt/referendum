
import { Injectable } from '@angular/core';
import { BASE_URL } from '../base_url';
import { Vote } from '../modele/Vote';
import { HttpClient } from '@angular/common/http';
import { Company } from '../modele/Company';

@Injectable({
providedIn: 'root'
})
export class VotesService {
public tickets: Vote[] = []

constructor(private http: HttpClient) { }

    public getAllVotes() {
        return this.http.get<Vote[]>(BASE_URL + `/vote/all_votes/`, {
            withCredentials: true
            })
    }

    public getVotesByCompany(idCompany: number | string) {
        console.log(idCompany)
        return this.http.get<Vote[]>(BASE_URL + `/vote/get_votes/${idCompany}`, {
        withCredentials: true
        })
    }   


    public getVotesByTicket(number_ticket_id: number) {
        return this.http.get<Vote[]>(BASE_URL + `/vote/company_name/${number_ticket_id}`, {
        withCredentials: true
        })
    
    }
    public getCompaniesById(idCompany: number | string) {
        return this.http.get<Company[]>(BASE_URL + `/company/${idCompany}`, {
        withCredentials: true
        })
    }
  }

