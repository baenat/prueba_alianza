import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListProductsComponent } from './list-products.component';
import { ProductService } from '@modules/products/services/product.service';
import { Router } from '@angular/router';
import { SearchService } from '@shared/services/search.service';
import { Subject, of } from 'rxjs';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ProductModel } from '@core/models/product.model';
import { RouterTestingModule } from '@angular/router/testing';

describe('ListProductsComponent', () => {
  let component: ListProductsComponent;
  let fixture: ComponentFixture<ListProductsComponent>;
  let routerMock: jasmine.SpyObj<Router>;
  let productServiceMock: jasmine.SpyObj<ProductService>;
  let searchServiceMock: jasmine.SpyObj<SearchService>;

  beforeEach(() => {
    routerMock = jasmine.createSpyObj('Router', ['navigate']);
    productServiceMock = jasmine.createSpyObj('ProductService', ['getAllProducts', 'deleteProduct']);
    searchServiceMock = jasmine.createSpyObj('SearchService', ['resultSearch$']);

    TestBed.configureTestingModule({
      declarations: [ListProductsComponent],
      imports: [
        RouterTestingModule,
      ],
      providers: [
        { provide: Router, useValue: routerMock },
        { provide: ProductService, useValue: productServiceMock },
        { provide: SearchService, useValue: searchServiceMock },
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ListProductsComponent);
    component = fixture.componentInstance;
    searchServiceMock.resultSearch$ = new Subject<ProductModel[]>();
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
    fixture.detectChanges();
    searchServiceMock.onResultSearch([{
      "id": 1,
      "logo": "https://images.vexels.com/media/users/3/258887/isolated/preview/02d6895f2e2371143893c29dc66af93e-mano-que-sostiene-la-tarjeta-de-cra-dito-plana.png",
      "nombreProducto": "Tarjeta de crédito",
      "descripcion": "Tarjeta de crédito con beneficios exclusivos para sus clientes.",
      "fechaLiberacion": "2023-08-01",
      "fechaReestructuracion": null
    }])
    component.resultSearch();
  });

  xit('should fetch products on ngOnInit', () => {

    const mockProducts = [{
      "id": 1,
      "logo": "logo.png",
      "nombreProducto": "Tarjeta de crédito",
      "descripcion": "Beneficios exclusivos para sus clientes.",
      "fechaLiberacion": "2023-08-01",
      "fechaReestructuracion": null
    }];

    productServiceMock.getAllProducts.and.returnValue(of(mockProducts));
    component.ngOnInit();

    expect(productServiceMock.getAllProducts).toHaveBeenCalled();
    expect(component.products).toEqual(mockProducts);
  });

  xit('should delete product and refresh products', () => {
    const productId = 1;
    productServiceMock.deleteProduct.and.returnValue(of({}));

    component.deleteProduct(productId);

    expect(productServiceMock.deleteProduct).toHaveBeenCalledWith(productId);
  });

});
