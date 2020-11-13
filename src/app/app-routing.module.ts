import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddApplicantsComponent } from './components/add-applicants/add-applicants.component';
import { AddProposalComponent } from './components/add-proposal/add-proposal.component';
import { LoginComponent } from './components/login/login.component';
import { RecoveryComponent } from './components/recovery/recovery.component';
import { RegisterComponent } from './components/register/register.component';
import { SidebarComponent } from './components/shared/sidebar/sidebar.component';
import { PaginaRecuperacionComponent } from './components/pagina-recuperacion/pagina-recuperacion.component';
import { PaginaConfirmarCuentaComponent } from './components/pagina-confirmar-cuenta/pagina-confirmar-cuenta.component';



const ruta: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'pagina-recuperar-contraseña/:tk',
    component: PaginaRecuperacionComponent
  },
  {
    path: 'pagina-confirmar-correo/:tk',
    component: PaginaConfirmarCuentaComponent
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

    ]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(ruta, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
