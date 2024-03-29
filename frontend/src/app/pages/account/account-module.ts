import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { LoginComponent } from './login.component';
import { MatSelectModule } from '@angular/material/select';
import { PasswordComponent } from './password.component';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        AccountRoutingModule,
        MatSelectModule,
        FormsModule,
        BrowserAnimationsModule,
        MatSelectModule
    ],
    declarations: [
        PasswordComponent,
    ]
})
export class AccountModule { }
