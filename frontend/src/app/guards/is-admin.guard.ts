import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AccountService } from 'src/app/services/account.service';
import { first, tap } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})

  
export class IsAdminGuard implements CanActivate {
  constructor(private accountService: AccountService, private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return this
      .accountService
      .isAdmin()
      .pipe(
        tap(is_admin => {
          console.log("is_admin", is_admin)
        })
      )
  }
  
}
