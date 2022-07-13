import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AccountService } from 'src/app/services/account.service';
import { User } from 'src/app/modele/User';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
    form!: FormGroup;
    loading = false;
    submitted = false;
    returnUrl!: string;
    message:string = ''

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private accountService: AccountService, // intelligent service to do the requests to the back
    ) { }

    public isConnected : boolean = false

    ngOnInit() {
        this.accountService.logout().subscribe()
        this.form = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required],
        })
    }

    // convenience getter for easy access to form fields
    get f() { return this.form.controls; }

    onSubmit() {
        this.submitted = true;
        this.message = ''

        // stop here if form is invalid
        if (this.form.invalid) {
            console.log("Formulaire invalide")
            return;
        }

        this.loading = true;
        this
            .accountService // appel du service account
            .login(this.f.username.value, this.f.password.value) // utilisation du getter pour lire les champs
            .pipe(first())
            .subscribe({
                next: (logged_in: User | false) => {
                    if (logged_in)
                    {
                        if (logged_in.is_admin) { 
                            this.router.navigate(['/ticketList']) 
                        }
                        else {
                            this.router.navigate(['/productChoice']) 
                        } // si connexion, redirection vers page ticket-list
                    }
                    else
                    {
                        this.message = 'Connexion échouée, vérifiez vos identifiants.' // sinon message à la vue
                    }
                    this.loading = false
                },
                error: (error: any) => {
                    console.log("hello error=", error)
                    this.loading = false;
                }
            });
    }
}

