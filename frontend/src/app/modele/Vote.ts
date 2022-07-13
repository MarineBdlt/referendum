export interface Vote {
    vote_id?: number 
    budget_id: number
    amount: number
    date: Date 
    number_ticket_id: number
    company_id: number | string
    product_id: number | string
  }