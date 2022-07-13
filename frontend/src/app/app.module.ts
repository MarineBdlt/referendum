import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormComponent } from './pages/form/form.component';

import { FormsModule, ReactiveFormsModule} from '@angular/forms';

import { NavbarComponent } from './pages/navbar/navbar.component';
import { TicketListComponent } from './pages/ticket-list/ticket-list.component';
import { Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ModalModule } from 'ngx-bootstrap/modal' ;
import { TicketModalService } from './services/ticket-modal.service';
import { ModalComponent } from 'src/app/pages/ticket-list/modals/details-modal/modal.component';
import { DeleteModalComponent } from './pages/ticket-list/modals/delete-modal/delete-modal.component';
import { ArchiveModalComponent } from './pages/ticket-list/modals/archive-modal/archive-modal.component';
import { RestoreModalComponent } from './pages/ticket-list/modals/restore-modal/restore-modal.component';
import { ComplexityPipe } from './utils/ticket-circle/complexity.pipe';
import { TicketCircleComponent } from './utils/ticket-circle/ticket-circle.component';
import { ParentModalComponent } from './pages/ticket-list/modals/parent-modal/parent-modal.component';
import { TicketListUserComponent } from './pages/ticket-list-user/ticket-list-user.component';
import { BudgetComponent } from './pages/budget/budget.component';
import { EditTicketComponent } from './pages/ticket-list/modals/edit-ticket/edit-ticket.component';
import { AlldeleteModalComponent } from './pages/ticket-list/modals/alldelete-modal/alldelete-modal.component';

import { MatSelectModule } from '@angular/material/select';
import { AllarchiveModalComponent } from './pages/ticket-list/modals/allarchive-modal/allarchive-modal.component';
import { AllrestoreModalComponent } from './pages/ticket-list/modals/allrestore-modal/allrestore-modal.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from "./pages/account/login.component"
import { RegisterComponent } from "./pages/account/register.component";
import { VoteResultComponent } from './pages/vote-result/vote-result.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ProductChoiceComponent } from './pages/product-choice/product-choice.component';
import { ProductChoiceForResultsComponent } from './pages/product-choice/product-choice-for-results.component';
import { OpteamVoteResultComponent } from './pages/all-vote-result/opteam-vote-result.component';
import { OpsreadyVoteResultComponent } from './pages/all-vote-result/opsready-vote-result.component';

import { DatePipe } from '@angular/common';

import { ModalService } from './services/modal.service';
import { VotesuccessModalComponent } from './pages/ticket-list-user/modals/votesuccess-modal/votesuccess-modal.component';
import { BudgetexceededModalComponent } from './pages/ticket-list-user/modals/budgetexceeded-modal/budgetexceeded-modal.component';


@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    NavbarComponent,
    TicketListComponent,
    ModalComponent,
    DeleteModalComponent,
    ArchiveModalComponent,
    RestoreModalComponent,
    ComplexityPipe,
    TicketCircleComponent,
    ParentModalComponent,
    TicketListUserComponent,
    BudgetComponent,
    EditTicketComponent,
    AllarchiveModalComponent,
    AllrestoreModalComponent,
    AlldeleteModalComponent,
    LoginComponent,
    RegisterComponent,
    VoteResultComponent,
    ProductChoiceComponent,
    OpteamVoteResultComponent,
    OpsreadyVoteResultComponent,
    ProductChoiceForResultsComponent,
    VotesuccessModalComponent,
    BudgetexceededModalComponent
  ],

  imports: [
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
    MatSelectModule,
    MatSnackBarModule,
  ],
  providers: [
    TicketModalService,
    ModalService,
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
