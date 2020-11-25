import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RecoveryComponent } from './components/recovery/recovery.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './components/register/register.component';
import { SidebarComponent } from './components/shared/sidebar/sidebar.component';
import { AddProposalComponent } from './components/add-proposal/add-proposal.component';
import { AddApplicantsComponent } from './components/add-applicants/add-applicants.component';
import { HttpClientModule } from '@angular/common/http';
import { NgWizardModule, NgWizardConfig, THEME } from 'ng-wizard';
import { JudgesProyectsComponent } from './components/judges-proyects/judges-proyects.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { JudgesComponent } from './components/judges/judges.component';
import { CalificationsComponent } from './components/califications/califications.component';
import { InitComponent } from './components/init/init.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

const ngWizardConfig: NgWizardConfig = {
  theme: THEME.dots
};


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RecoveryComponent,
    RegisterComponent,
    SidebarComponent,
    AddProposalComponent,
    AddApplicantsComponent,
    JudgesProyectsComponent,
    JudgesComponent,
    CalificationsComponent,
    InitComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SweetAlert2Module.forRoot(),
    NgWizardModule.forRoot(ngWizardConfig),
    HttpClientModule,
    NgMultiSelectDropDownModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
