import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatalogueRoutingModule } from './catalogue-routing.module';
import { ProductListComponent } from './product-list/product-list.component';
import { DetailProductComponent } from './detail-product/detail-product.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { GetGenderPipe } from '../../../app/pipes/get-gender/get-gender.pipe';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    CatalogueRoutingModule,
  ],
  declarations: [
    ProductListComponent, 
    DetailProductComponent,
    GetGenderPipe,
    SearchBarComponent
]
})
export class CatalogueModule { }