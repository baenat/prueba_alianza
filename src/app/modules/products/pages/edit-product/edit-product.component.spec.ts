import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProductComponent } from './edit-product.component';
import { ProductService } from '@modules/products/services/product.service';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('EditProductComponent', () => {
  let component: EditProductComponent;
  let fixture: ComponentFixture<EditProductComponent>;
  let mockActivatedRoute: any;
  let mockRouter: any;
  let mockProductService: jasmine.SpyObj<ProductService>;

  beforeEach(() => {
    mockActivatedRoute = {
      queryParams: of({ product: '{"id": 1, "logo": "logo.jpg", "nombreProducto": "Product 1", "descripcion": "Description", "fechaLiberacion": "2023-01-01"}' }),
    };
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    mockProductService = jasmine.createSpyObj('ProductService', ['editProduct']);

    TestBed.configureTestingModule({
      declarations: [EditProductComponent],
      providers: [
        FormBuilder,
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: Router, useValue: mockRouter },
        { provide: ProductService, useValue: mockProductService },
      ],
      imports: [
        HttpClientTestingModule,
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA
      ]
    });

    fixture = TestBed.createComponent(EditProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
