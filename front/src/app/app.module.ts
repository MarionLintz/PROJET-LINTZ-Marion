import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgxsModule } from '@ngxs/store';
import { BasketState } from '../shared/states/basket.state';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { ApiHttpInterceptor } from 'src/shared/interceptors/api-http-interceptor';
import { AuthGuardService } from 'src/shared/guard/auth-guard.service';
import { AuthentificationState } from 'src/shared/states/authentication.states';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxsModule.forRoot([BasketState, AuthentificationState])
  ],
  providers: [
    AuthGuardService,
    { provide: HTTP_INTERCEPTORS, useClass: ApiHttpInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
