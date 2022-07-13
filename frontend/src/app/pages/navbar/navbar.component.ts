import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router'
import { AccountService } from "../../services/account.service"
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.sass']
})
export class NavbarComponent implements OnInit {

  constructor(
    private router: Router,
    private accountService: AccountService
  ) { }  

  public changeCollaps = false
  public isAdmin = false
  public userName = ""
  public companyName = ""

  ngOnInit(): void {

    this.isAdmin = this.accountService.user?.is_admin ?? false
    this.userName = this.accountService.user?.user_name ?? ""
    this.companyName = this.accountService.user?.company.company_name ?? ""

  }

  public logout()
  {
    this
      .accountService
      .logout()
      .subscribe()
  }
}
