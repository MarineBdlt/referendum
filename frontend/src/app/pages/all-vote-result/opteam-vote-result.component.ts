
import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs/operators'
import { TicketsService } from 'src/app/services/tickets.service';
import { VotesService } from 'src/app/services/votes.service';
import { Ticket } from 'src/app/modele/Ticket';
import { Vote } from 'src/app/modele/Vote';
import { combineLatest, Observable } from 'rxjs';


// creer bouton maquette
// trier tickets par montant
// separer les tickets des produits par components (opteam, opsready)
// lier la page à celle de boris et à la nav


@Component({
  selector: 'app-opteam-vote-result',
  templateUrl: './opteam-vote-result.component.html',
  styleUrls: ['./opteam-vote-result.component.sass']
})
export class OpteamVoteResultComponent implements OnInit {

  public tickets: Ticket[] = []
  public all_votes: any
  public votes_list: any
  public amounts: any
  public current_ticket_votes: any
  public opteam: number=2


  constructor(
    private ticketsService: TicketsService,
    private votesService: VotesService
  ) {}

  ngOnInit(): void {

    this.ticketsService.printListTicketsByProductService(this.opteam)
    .subscribe((response: Ticket[]) => {
      this.tickets = response
      const res:Observable<Vote[]>[]=[]     // a refactoriser en backend avec une seule route
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



