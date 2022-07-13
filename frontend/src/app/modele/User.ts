import { Company } from "./Company"

export class User {
    user_id: number =0
    user_name: string=""
    user_password: string=""  //why save user_password???
    user_email: string =""
    is_admin: boolean = false
    company_id: number =0 // suprimer company_id
    company: any
  }
