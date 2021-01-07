import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClientFormRoutingModule } from './client-form-routing.module';
import { ClientAccountComponent } from './client-account/client-account.component';
import { PasswordControl } from 'src/app/directives/password-control.directive';
import { RecapFormComponent } from './recap-form/recap-form.component';
import { PhoneNumberPipe } from 'src/app/pipes/phone-number/phone-number.pipe';
import { LoginComponent } from './login/login.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ClientFormRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [
    ClientAccountComponent,
    RecapFormComponent,
    PhoneNumberPipe,
    PasswordControl,
    LoginComponent
  ]
})
export class ClientFormModule { }