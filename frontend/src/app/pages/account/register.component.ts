import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AccountService } from 'src/app/services/account.service';
import { Company } from 'src/app/modele/Company';
import { MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass']
})

export class RegisterComponent implements OnInit {
    form!: FormGroup;
    loading = false;
    submitted = false;
    public companies: Company [] = []
    selectedCompany: string="";


    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private accountService: AccountService,
        private snackBar: MatSnackBar,
        
    ) { }

    ngOnInit() {
        this.printCompanies()
        this.form = this.formBuilder.group({
            user_email: ['', Validators.required],
            user_name: ['', Validators.required],
            user_password: ['', [Validators.required, Validators.minLength(6)]],
            company_id: ['', Validators.required],
        });
    }


    // fullfill company list to iterate on html
    printCompanies() {
        this.accountService.getCompanies().subscribe((response: Company[]) => {
        this.companies = response

        })
    }

    // convenience getter for easy access to form fields
    get f() { return this.form.controls; }

    onSubmit() {

        this.submitted = true;

        // stop here if form is invalid
        if (this.form.invalid) {
            return;
        }

        this.loading = true;

        this.accountService.signup(this.form.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.snackBar.open("Utilisateur créé avec succès !", "OK");
                    this.router.navigate(['/ticketList'], { relativeTo: this.route });
                },
                error => {
                    this.loading = false;
                }
        );
    }

}
