import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
import { DataService } from 'src/app/services/data.service';
import { LogoutCurrentUser } from 'src/shared/actions/authentication.action';
import { ApiHttpInterceptor } from 'src/shared/interceptors/api-http-interceptor';
import { User } from 'src/shared/models/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  basketContentNumber : Observable<number>;
  currentUser : Observable<User>;
  subscription : Subscription;

  constructor(private store: Store, private dataService: DataService, private router: Router) {
  }

  ngOnInit(): void {
    this.basketContentNumber = this.store.select(state => state.basket.products.length);
    this.currentUser = this.store.select(state => state.authentication.currentUser);
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  logout() : void{
    this.store.dispatch(new LogoutCurrentUser());
    this.subscription = this.dataService.Logout().subscribe((res:any) => {
      this.router.navigate(['/home']);
    });
  }

}
