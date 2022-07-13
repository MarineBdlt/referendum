import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AccountService } from 'src/app/services/account.service';
import { MatSnackBar} from '@angular/material/snack-bar'; // module issu d'angular/material pour afficher un toaster (fenetre d'alerte)


// import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'change-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.sass']
})
export class PasswordComponent implements OnInit {
    form!: FormGroup;
    loading = false;
    submitted = false;
    returnUrl!: string;
    message:string = ''
    

    constructor(
        private formBuilder: FormBuilder,
        private accountService: AccountService,
        private router: Router,
        private snackBar: MatSnackBar, // intelligent service to do the requests to the back
    ) { }

    ngOnInit() {
        this.form = this.formBuilder.group({
            oldPassword: ['', Validators.required],
            newPassword: ['', Validators.required],
            confirmPassword: ['', Validators.required] 
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

        if (this.f.newPassword.value != this.f.confirmPassword.value) {
            console.log("Les deux mots de passe ne sont pas identiques")
            this.message = 'Les deux mots de passe ne sont pas identiques, veuillez les réécrire.'
            return;
        } // afficher un message

        this.loading = true;
        this
            .accountService // appel du service account et souscription à l'observable 
            .updatePassword(this.f.oldPassword.value, this.f.newPassword.value)
            .pipe(first()) 
            .subscribe({
                next: ok_change => {
                    
                    if (!ok_change) {
                        this.message = "Le changement a échoué, l'ancien mot de passe ne correspond pas."
                    }
                    else {
                        this.snackBar.open("Mot de passe changé avec succès !", "OK") // ouvrir un toaster 
                        this.accountService.logout().subscribe()
                        this.router.navigate([''])
                    }
                    this.loading = false;
                    
                },
                error: (error: any) => { 
                    console.log("hello error=", error) 
                }
            });
    }
}

        

