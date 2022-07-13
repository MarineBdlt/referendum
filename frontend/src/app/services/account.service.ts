import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, skip, catchError } from 'rxjs/operators';
import { Observable, of, BehaviorSubject, Observer } from 'rxjs';
import { BASE_URL } from '../base_url';
import { User } from '../modele/User';
import { Company } from '../modele/Company';


@Injectable({ providedIn: 'root' })
export class AccountService {
    private stateConnexion : BehaviorSubject< boolean >= new BehaviorSubject< boolean >(false)
    private stateAdmin : BehaviorSubject< boolean >= new BehaviorSubject< boolean >(false)
    private initialized : boolean  = false
    public user : User | null = null
    public is_admin : boolean = false
    public company : User | null = null
  
    constructor(private http: HttpClient) { 
      this.http.get<User | false>(BASE_URL+"/logged_in/",{
        withCredentials: true
      }).pipe(
        catchError(_err => of<false>(false))
      ).pipe(
        tap(r => {
          
          this.initialized = true
          this.user = r ? r : null
          this.is_admin = r ? r.is_admin : false
          this.stateConnexion.next(r != false)
          this.stateAdmin.next(r!=null? (r as User).is_admin: false) 
          // console.log("user in accountservice", this.user)           
        })
      )
      .subscribe()
    }

    // add user on local storage and call login function in back
    public login(username_or_email: string, password: string) {
        return this.http.post<User | false >(`${BASE_URL}/users/login/`, {
          "username_or_email": username_or_email, 
          "password": password
        })
        .pipe(
            tap(r => {
              this.stateConnexion.next(r != false)
              this.stateAdmin.next(r!=null? (r as User).is_admin: false)
              this.user = r ? r : null                             
              // return this.user            
          }) 
          )          
    }

    public isAdmin(): Observable<boolean>{
      if (!this.initialized)
      { 
        return this.stateAdmin.pipe(skip(1))
      }
      return this.stateAdmin
    }
      
    public isConnected(): Observable<boolean>{
        if (!this.initialized)
        { 
          return this.stateConnexion.pipe(skip(1))
        }
       return this.stateConnexion
    }

    public logout() {
        return this
        .http
        .post(`${BASE_URL}/logout/`, null,{
            withCredentials: true
          })
          .pipe(
            tap(_=>{ 
              this.stateConnexion.next(false)
              this.user = null 
            })
          )
      
          
    }
    
    public signup(user: User) {
        return this.http.post(`${BASE_URL}/users/signup/`, user);
    }


    updatePassword(oldPassword : string, newPassword : string) {
        return this.http.post(`${BASE_URL}/change_password/`, {"old_password": oldPassword, "new_password": newPassword});
    }

    // get all users on the API users
    getUsers() {
        return this.http.get<User[]>(`${BASE_URL}/users/`);
    }

    getCompanies() {
        return this.http.get<Company[]>(`${BASE_URL}/company/`);
    }

}
