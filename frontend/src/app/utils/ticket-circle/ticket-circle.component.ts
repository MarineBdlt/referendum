import { Component, Input, OnInit } from '@angular/core';
import { Ticket } from 'src/app/modele/Ticket';


@Component({
  selector: 'app-ticket-circle',
  templateUrl: './ticket-circle.component.html',
  styleUrls: ['./ticket-circle.component.sass']
})
export class TicketCircleComponent implements OnInit {

  @Input() public ticket:Ticket | null = null
  constructor() { }

  ngOnInit(): void {

  }


  public getStyle(ticket:Ticket | null){
    if (ticket == null){
      return ""
    }
    return {
      'ticket-hard-13' : ticket.complexity===13,
      'ticket-hard-8' : ticket.complexity===8, 
      'ticket-medium-5' : ticket.complexity===5, 
      'ticket-medium-3' : ticket.complexity===3, 
      'ticket-easy-2' : ticket.complexity===2,
      'ticket-easy-1' : ticket.complexity===1,
      'ticket-nr': ticket.complexity===0
    
    }
    
  }
}
