import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { LayoutComponent } from './layout.component';
import { LoginComponent } from './login.component';
import { RegisterComponent } from './register.component';
import { MatSelectModule } from '@angular/material/select';
import { PasswordComponent } from './password.component';


const routes: Routes = [
    {
        path: '', // component: LayoutComponent,
        children: [
            { path: 'login', component: LoginComponent },
            { path: 'signup', component: RegisterComponent },
            { path: 'change-password', component: PasswordComponent }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes), MatSelectModule],
    exports: [RouterModule]
})
export class AccountRoutingModule { }