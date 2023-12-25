import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductModel } from '@core/models/product.model';
import { ProductService } from '@modules/products/services/product.service';
import { SearchService } from '@shared/services/search.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.css']
})
export class ListProductsComponent implements OnInit {

  products: ProductModel[] = [];

  constructor(
    private _router: Router,
    private _productService: ProductService,
    private _searchService: SearchService,
  ) { }

  ngOnInit(): void {
    this.resultSearch();
    this.getProducts();
  }

  getProducts(): void {
    this._productService.getAllProducts().subscribe({
      next: (response) => this.products = response,
      error: (error) => console.error('Error getAllProducts', error)
    });
  }

  deleteProduct(id: number): void {
    this._productService.deleteProduct(id).subscribe({
      next: () => this.getProducts()
    });
  }

  editProduct(product: ProductModel): void {
    this._router.navigate(['/products/edit'], { queryParams: { product: JSON.stringify(product) } });
  }

  resultSearch(): void {
    this._searchService.resultSearch$.subscribe({
      next: (products) => this.products = products
    });
  }

}
