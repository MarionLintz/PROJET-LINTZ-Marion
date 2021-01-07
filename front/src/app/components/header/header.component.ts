import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { User } from 'src/shared/models/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  basketContentNumber : Observable<number>;
  currentUser : Observable<User>;

  constructor(private store: Store) {
  }

  ngOnInit(): void {
    this.basketContentNumber = this.store.select(state => state.basket.products.length);
    this.currentUser = this.store.select(state => state.authentication.currentUser);
  }

}
