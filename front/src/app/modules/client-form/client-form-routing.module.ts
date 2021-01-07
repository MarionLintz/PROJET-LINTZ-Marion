import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientAccountComponent } from './client-account/client-account.component';
import { LoginComponent } from './login/login.component';
import { RecapFormComponent } from './recap-form/recap-form.component';

const routes: Routes = [
  {
    path: '',
    component: ClientAccountComponent
  },
  {
    path: 'recap',
    component: RecapFormComponent
  },
  {
    path: 'login',
    component: LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientFormRoutingModule { }