import {
  Component,
  ContentChildren,
  ViewChild,
  OnInit,
  TemplateRef
} from '@angular/core';
import {
  HttpClient
} from '@angular/common/http';
import {
  BASE_URL
} from '../../base_url'
import {
  Ticket
} from '../../modele/Ticket';
import {
  TicketModalService
} from 'src/app/services/ticket-modal.service';
import {
  TicketsService
} from 'src/app/services/tickets.service';
import {
  Vote
} from 'src/app/modele/Vote';
import {

  ActivatedRoute,
  Router
} from '@angular/router';

import {
  Budget
} from 'src/app/modele/Budget'
import {
  combineLatest
} from 'rxjs';
import { mergeMap, tap, first, map } from 'rxjs/operators';

import { AccountService } from "../../services/account.service";
import { VotesService } from 'src/app/services/votes.service';
import { ModalService } from 'src/app/services/modal.service';
//import { VotesuccessModalComponent } from './modals/votesuccess-modal/votesuccess-modal.component';
import { Template } from '@angular/compiler/src/render3/r3_ast';

// import { NumberValueAccessor } from '@angular/forms';

export interface Amount {
  budgetUsed: number
}
export interface TicketWithVote extends Ticket {
  vote: Vote
}
@Component({
  selector: 'app-ticket-list-user',
  templateUrl: './ticket-list-user.component.html',
  providers: [TicketsService],
  styleUrls: ['./ticket-list-user.component.sass']
})

export class TicketListUserComponent implements OnInit {
  public tickets: TicketWithVote[] = []
  public votes: Vote[] = []
  public budget : any
  public vote_ticket_id: number = 0
  public vote_amount: number = 0
  public totalBudget: number = 0
  public budget_id: number = 0
  public amount: number = 0
  public company_id: any
  public product_id: any
  public date: Date = new Date
  public number_id: number = 0
  public ticket_id: number = 0
  public budgetUsed: any
  public input: number = 0
  public id: number = 1

  @ViewChild('votesuccessTemplate')
  public successTemplate: TemplateRef<any> | null = null
  @ViewChild('budgetexceededTemplate')
  public failTemplate: TemplateRef<any> | null = null

  constructor(
    private http: HttpClient,
    private ticketModalService: TicketModalService,
    private ticketsService: TicketsService,
    public route: ActivatedRoute,
    private accountService: AccountService,
    private votesService: VotesService,
    private ModalService: ModalService
  ) {}

  ngOnInit(): void {
    // call function load component for show total budget, list ticket and budget used
    this.company_id = this.accountService.user?.company_id
    this.product_id = this.route.snapshot.params.id

    //send id Product from url to printListTicketsByProduct()
    this.reloadDataFromServer()
  }

  private reloadDataFromServer()
  {
    this
      .getBudget(this.company_id, this.product_id)
      .pipe(mergeMap(_ => this.getListTicketsByProduct(this.product_id)))
      .subscribe()
    this.getBudgetUsed(this.company_id, this.product_id)
  }

  updateBudgetUsed(event:any){
    this.budgetUsed =0;
    for (let i=0; i<this.tickets.length; i++) {
      this.budgetUsed +=  this.tickets[i].vote.amount;
    }
  }

  // function to print list ticket with vote
  public getListTicketsByProduct(idProduct: number) {

    const tickets$ = this
      .ticketsService
      .printListTicketsByProductService(idProduct)

    const votes$ = this
      .votesService
      .getVotesByCompany(this.company_id)

    return combineLatest([tickets$, votes$])
      .pipe(
        first(),
        map(([tickets, votes]: [Ticket[],Vote[]]) => {

          const byTicketId: Record<number, Vote> = {}
          votes.forEach(v => byTicketId[v.number_ticket_id] = v)

          this.tickets = tickets.map(t => {
            let vote: Vote = byTicketId[t.number_id]
            if (vote == null) {
              vote = {
                budget_id: this.budget_id,
                amount: 0,
                company_id: this.company_id,
                product_id: this.product_id,
                date: new Date(),
                number_ticket_id: t.number_id
              }
              console.log(this.company_id)
            }

            return {
              ...t,
              vote: vote
            }
          })
        })
      )
  }

  // function to open modal for detail ticket
  public openModalService(template: TemplateRef < any > , ticket: any) {
    this.ticketModalService.openModal(template, ticket)
  }
  public openVoteSuccessModalService(votesuccessTemplate: TemplateRef<any>) {
    this.ModalService.openModal(votesuccessTemplate)
  }

  // function for budget
  getBudget(idCompany: number, idProduct: number) {
    return this
      .http
      .get<Budget[]>(`${BASE_URL}/budget/${idCompany}/${idProduct}`, {
        withCredentials: true
      })
      .pipe(
        tap((response:Budget[]) => {
          this.budget = response
          this.totalBudget = this.budget.total_budget || 0
          this.budget_id = this.budget.budget_id
          console.log("this.budget=",this.budget)
          console.log("this.budget_id=",this.budget_id)
        })
      )
  }

  // function get budget used
  getBudgetUsed(idCompany: number, idProduct: number) {
    this.http.get(BASE_URL + `/vote/budget_used/${idCompany}/${idProduct}`, {
        withCredentials: true
      })
      .subscribe((response) => {
        this.budgetUsed = response
      })
  }

  //function for vote
  public addVote() {
    if(this.budgetUsed>this.totalBudget){
      this.ModalService.openModal(this.failTemplate as TemplateRef<any>)
    } else {
      this.http.post(BASE_URL + '/vote/add_votes/',
                     this.tickets.map(t => t.vote), {
        withCredentials: true
      })
      .subscribe({
        next: () => {
          this.ModalService.openModal(this.successTemplate as TemplateRef<any>)
          this.reloadDataFromServer()
        },
        error: (e) => console.log("erreur", e)
      })
    }
  }
}
