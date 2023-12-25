import { EventEmitter, Injectable } from '@angular/core';
import { GeneralService } from './general.service';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { ProductModel } from '@core/models/product.model';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private resultSearch = new Subject<ProductModel[]>();
  resultSearch$ = this.resultSearch.asObservable();

  constructor(
    private _generalService: GeneralService,
  ) { }

  search(searchTerms: string): Observable<any> {
    return this._generalService.get(`products?q=${searchTerms}`);
  }

  onResultSearch(products: ProductModel[]) {
    this.resultSearch.next(products);
  }
}
