import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AccountService } from '../services/account.service';
import { Observable } from 'rxjs';
import { first, tap } from 'rxjs/operators'


@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(private accountService: AccountService, private router: Router) { }

canActivate(
  next: ActivatedRouteSnapshot,
  state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this
    .accountService
    .isConnected()
    .pipe(
      first(),
      tap(connected => {
        console.log("connected", connected)
        if (!connected)
        {
          this.router.navigateByUrl('')
        }
      })
    )  
  }
}