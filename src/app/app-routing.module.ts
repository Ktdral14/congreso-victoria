import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddApplicantsComponent } from './components/add-applicants/add-applicants.component';
import { AddProposalComponent } from './components/add-proposal/add-proposal.component';
import { LoginComponent } from './components/login/login.component';
import { RecoveryComponent } from './components/recovery/recovery.component';
import { RegisterComponent } from './components/register/register.component';
import { SidebarComponent } from './components/shared/sidebar/sidebar.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { JudgesProyectsComponent } from './components/judges-proyects/judges-proyects.component';
import { CalificationsComponent } from './components/califications/califications.component';
import { JudgesComponent } from './components/judges/judges.component';
import { InitComponent } from './components/init/init.component';



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
        path: 'projects',
        component: ProjectsComponent
      },
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
      },
      {
        path: 'judges',
        component: JudgesComponent
      },
      {
        path: 'califications',
        component: CalificationsComponent
      },
      {
        path: 'init',
        component: InitComponent
      }

    ]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(ruta, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
