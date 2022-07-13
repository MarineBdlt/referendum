import { Component } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})

export class AppComponent {
  constructor(
    private accountService: AccountService
  ) { } 

  title = 'frontend';
  public isConnected : boolean = false

  ngOnInit(): void {
    this.accountService.isConnected().subscribe(
      data => {
        this.isConnected = data 
      },
    )    
  }

}

