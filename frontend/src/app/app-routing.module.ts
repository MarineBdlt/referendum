import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BudgetComponent } from './pages/budget/budget.component';
import { TicketListUserComponent } from './pages/ticket-list-user/ticket-list-user.component';
import { TicketListComponent } from './pages/ticket-list/ticket-list.component';
import { FormComponent } from "./pages/form/form.component";
import { LoginComponent } from "./pages/account/login.component";
import { RegisterComponent } from "./pages/account/register.component";
import { VoteResultComponent } from './pages/vote-result/vote-result.component';
import { PasswordComponent } from './pages/account/password.component';
import { AuthGuardService } from './guards/auth-guard.service';
import { IsAdminGuard } from './guards/is-admin.guard';
import { ProductChoiceComponent } from "./pages/product-choice/product-choice.component";
import { ProductChoiceForResultsComponent } from "./pages/product-choice/product-choice-for-results.component";
import { OpteamVoteResultComponent } from './pages/all-vote-result/opteam-vote-result.component';
import { OpsreadyVoteResultComponent } from './pages/all-vote-result/opsready-vote-result.component';



const routes: Routes = [
  { path: 'listUser/:id', component: TicketListUserComponent,canActivate:[AuthGuardService]},
  { path: 'budget', component: BudgetComponent,canActivate:[AuthGuardService, IsAdminGuard]},
  { path: 'form', component: FormComponent,canActivate:[AuthGuardService, IsAdminGuard]},
  { path: 'ticketList', component: TicketListComponent,canActivate:[AuthGuardService, IsAdminGuard]},
  { path: 'voteResult', component: VoteResultComponent,canActivate:[AuthGuardService, IsAdminGuard]},
  { path: 'opteamResult', component: OpteamVoteResultComponent,canActivate:[AuthGuardService, IsAdminGuard]},
  { path: 'opsreadyResult', component: OpsreadyVoteResultComponent,canActivate:[AuthGuardService, IsAdminGuard]}, 
  { path: 'signup', component: RegisterComponent, canActivate:[AuthGuardService, IsAdminGuard]},
  { path: 'productChoiceForResults', component: ProductChoiceForResultsComponent, canActivate:[AuthGuardService, IsAdminGuard]},

  { path: '', component: LoginComponent},
 
  { path: 'change-password', component: PasswordComponent, canActivate:[AuthGuardService]},
  { path: 'auth', loadChildren: () => import('./pages/account/account-module').then(m=>m.AccountModule)},
  
  { path: 'productChoice', component: ProductChoiceComponent, canActivate:[AuthGuardService]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
