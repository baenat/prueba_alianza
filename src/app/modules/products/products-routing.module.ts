import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListProductsComponent } from './pages/list-products/list-products.component';
import { AddProductsComponent } from './pages/add-products/add-products.component';
import { EditProductComponent } from './pages/edit-product/edit-product.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'list',
        component: ListProductsComponent,
      },
      {
        path: 'create',
        component: AddProductsComponent,
      },
      {
        path: 'edit',
        component: EditProductComponent,
      },
      {
        path: '**',
        redirectTo: 'list'
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
