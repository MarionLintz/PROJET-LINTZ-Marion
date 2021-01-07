import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Store } from '@ngxs/store';
import { AddProduct } from 'src/shared/actions/product.action';
import { Product } from 'src/shared/models/product';
import { DataService } from 'src/app/services/data.service';
import { SelectedFilter } from 'src/shared/models/selected-filter';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  listProduct: Observable<Product[]>;
  listFilteredProductObs: Observable<Product[]>;

  constructor(private dataService: DataService,
              private store: Store) {}

  ngOnInit(): void {
    this.listProduct = this.dataService.GetList();
    this.listFilteredProductObs = this.listProduct;
  }

  onFilterChange(filter: SelectedFilter): void {
    this.listFilteredProductObs = this.listProduct.pipe(
      map(data => {
        return data.filter((value: Product) => {
          switch (filter.global) {
            case 'gender':
              if(filter.detail !== "") return value.Gender == filter.detail;
              else return true;
            case 'name':
              if (filter.detail !== '') return value.Name.toLowerCase().indexOf(filter.detail.toLowerCase()) > -1;
              else return true;
            case 'breed':
              if (filter.detail !== '') return value.Breed.toLowerCase().indexOf(filter.detail.toLowerCase()) > -1;
              else return true;
            default:
              return true;
          }
        });
      }));
  }

  addProductToBasket(product: Product){
    this.store.dispatch(new AddProduct(product));
  }
}
