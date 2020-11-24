import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddApplicantsComponent } from './components/add-applicants/add-applicants.component';
import { AddProposalComponent } from './components/add-proposal/add-proposal.component';
import { LoginComponent } from './components/login/login.component';
import { RecoveryComponent } from './components/recovery/recovery.component';
import { RegisterComponent } from './components/register/register.component';
import { SidebarComponent } from './components/shared/sidebar/sidebar.component';
import { JudgesProyectsComponent } from './components/judges-proyects/judges-proyects.component';



const ruta: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'recovery',
    component: RecoveryComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },

  {
    path: 'home', component: SidebarComponent, children: [
      {
        path: 'add-proposal',
        component: AddProposalComponent
      },
      {
        path: 'add-applicants',
        component: AddApplicantsComponent
      },
      {
        path: 'judges-proyects',
        component: JudgesProyectsComponent
      }

    ]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(ruta, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
