import { Injectable } from '@angular/core';
import { ProductModel } from '@core/models/product.model';
import { GeneralService } from '@shared/services/general.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private _generalServices: GeneralService
  ) { }

  setProductId(): number {
    return Math.ceil(Math.random() * 100000);
  }

  getAllProducts(): Observable<any> {
    return this._generalServices.get('products');
  }

  registerProduct(product: ProductModel): Observable<any> {
    return this._generalServices.post('products', product);
  }

  editProduct(product: ProductModel): Observable<any> {
    return this._generalServices.put(`products/${product.id}`, product);
  }

  deleteProduct(id: number): Observable<any> {
    return this._generalServices.delete(`products/${id}`);
  }

}
