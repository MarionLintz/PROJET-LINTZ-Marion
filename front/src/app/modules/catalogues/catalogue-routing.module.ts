import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DetailProductComponent } from './detail-product/detail-product.component';
import { ProductListComponent } from './product-list/product-list.component';

const routes: Routes = [
  {
    path: '',
    component: ProductListComponent,
  },
  {
    path: 'detail/:id',
    component: DetailProductComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CatalogueRoutingModule { }