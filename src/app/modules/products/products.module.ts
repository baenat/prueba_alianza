import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ListProductsComponent } from './pages/list-products/list-products.component';
import { AddProductsComponent } from './pages/add-products/add-products.component';
import { SharedModule } from '@shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { EditProductComponent } from './pages/edit-product/edit-product.component';


@NgModule({
  declarations: [
    ListProductsComponent,
    AddProductsComponent,
    EditProductComponent
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    ReactiveFormsModule,
    SharedModule,
  ]
})
export class ProductsModule { }
