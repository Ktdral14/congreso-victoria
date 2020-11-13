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
import { PaginaRecuperacionComponent } from './components/pagina-recuperacion/pagina-recuperacion.component';
import { PaginaConfirmarCuentaComponent } from './components/pagina-confirmar-cuenta/pagina-confirmar-cuenta.component';

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
    PaginaRecuperacionComponent,
    PaginaConfirmarCuentaComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgWizardModule.forRoot(ngWizardConfig),
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
