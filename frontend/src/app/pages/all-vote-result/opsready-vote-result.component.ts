
import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs/operators';
import { AccountService } from 'src/app/services/account.service';
import { TicketsService } from 'src/app/services/tickets.service';
import { VotesService } from 'src/app/services/votes.service';
import { Ticket } from 'src/app/modele/Ticket';
import { Vote } from 'src/app/modele/Vote';
import { combineLatest, Observable } from 'rxjs';
import { AccountRoutingModule } from '../account/account-routing.module';


// creer bouton maquette
// trier tickets par montant
// separer les tickets des produits par components (Opsready, opsready)
// lier la page à celle de boris et à la nav


@Component({
  selector: 'app-opsready-vote-result',
  templateUrl: './opsready-vote-result.component.html',
  styleUrls: ['./opsready-vote-result.component.sass']
})
export class OpsreadyVoteResultComponent implements OnInit {

  public tickets: Ticket[] = []
  public all_votes: any
  public votes_list: any
  public amounts: any
  public current_ticket_votes: any
  public opsready: number=1
  public isAdmin = false


  constructor(
    private ticketsService: TicketsService,
    private votesService: VotesService,
    private accountService:AccountService
  ) {}

  ngOnInit(): void {

    this.isAdmin = this.accountService.user?.is_admin ?? false

    this.ticketsService.printListTicketsByProductService(this.opsready)
    .subscribe((response: Ticket[]) => {
      this.tickets = response
      const res:Observable<Vote[]>[]=[] //a refactoriser en backend avec une seule route
      for (let ticket of this.tickets) {
        res.push(this.getAmount(ticket))
      }
      combineLatest(res)
        .subscribe(n => {this.tickets.sort(function (b, a) {
          return a.vote_amount - b.vote_amount; // On fait le tri après avoir attendu qu'ils se téléchargent tous
        })})
    })

    this.votesService.getAllVotes()
    .subscribe((response: Vote[]) => {
      this.all_votes = response
      console.log("votes", this.all_votes)
    })

  }

  public getAmount(ticket: any) {

    return this.votesService.getVotesByTicket(ticket.number_id)
    .pipe(
      tap((response) => {
      this.current_ticket_votes = response
      var vote_amount = 0
      for (let vote of this.current_ticket_votes)
      {
        vote_amount += vote.amount
      }
      ticket.vote_amount = vote_amount
    }))
  }


  public getListVotes(ticket: any) {
    this.votesService.getVotesByTicket(ticket.number_id)
    .subscribe((response) => {
      this.current_ticket_votes = response
    })
    return this.current_ticket_votes
  }
}



