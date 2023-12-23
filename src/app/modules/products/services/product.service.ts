import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { ProductModel } from '@core/models/product.model';
import { Observable, filter, from, map, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { products } from '@data/products'

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  listProducts: ProductModel[] = products.map((item) => ({ ...item, id: this.setProductId() }));

  constructor(
    private httpClient: HttpClient,
  ) { }

  setProductId(): number {
    return Math.ceil(Math.random() * 100000);
  }

  getAllProducts(): ProductModel[] {
    return this.listProducts;
  }

  registerProduct(product: ProductModel) {
    this.listProducts.push(product);
  }

  editProduct(product: ProductModel) {
    const index = this.listProducts.findIndex(item => item.id === product.id);
    if (index === -1) {
      throw console.log('product not found');
    }
    const productOld = this.listProducts[index];
    const updateProduct = {
      ...productOld,
      ...product
    }
    this.listProducts[index] = updateProduct;
  }

  deleteProduct(id: number): ProductModel[] {
    this.listProducts = this.listProducts.filter((product) => product.id !== id);
    return this.listProducts;
  }



}
