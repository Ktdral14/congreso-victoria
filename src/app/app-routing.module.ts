import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RecoveryComponent } from './components/recovery/recovery.component';


const ruta: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'recovery',
    component: RecoveryComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(ruta, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
