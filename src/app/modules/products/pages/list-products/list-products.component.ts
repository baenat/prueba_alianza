import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductModel } from '@core/models/product.model';
import { ProductService } from '@modules/products/services/product.service';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.css']
})
export class ListProductsComponent implements OnInit {

  products: ProductModel[] = [];

  constructor(
    private router: Router,
    private productService: ProductService,
  ) { }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.products = this.productService.getAllProducts();
  }

  deleteProduct(id: number) {
    console.log(id)
    this.products = this.productService.deleteProduct(id);
  }

  editProduct(product: ProductModel) {
    this.router.navigate(['/products/edit'], { queryParams: { product: JSON.stringify(product) } });
  }

}
