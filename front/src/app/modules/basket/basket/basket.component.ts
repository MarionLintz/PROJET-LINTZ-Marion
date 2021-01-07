import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { RemoveProduct } from 'src/shared/actions/product.action';
import { Product } from 'src/shared/models/product';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})

export class BasketComponent implements OnInit {

  listProduct: Observable<Map<Product, number>>;

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.listProduct = this.store.select(state => state.basket.products)
      .pipe(
        map(list => {
          let mapList: Map<Product, number> = new Map<Product, number>();

          list.forEach((value) => {
            let a = Array.from(mapList.keys()).filter(e => e.Id == value.Id);
            if(a.length > 0){
              mapList.set(a[0], mapList.get(a[0])+1);
            }
            else
              mapList.set(value, 1);
          });
          
          return mapList;
        }
      ));
  }

  removeFromBasket(id: number){
    this.store.dispatch(new RemoveProduct(id));
  }

}
