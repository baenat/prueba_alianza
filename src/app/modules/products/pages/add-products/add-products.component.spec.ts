import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProductsComponent } from './add-products.component';
import { ProductService } from '@modules/products/services/product.service';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

describe('AddProductsComponent', () => {
  let component: AddProductsComponent;
  let fixture: ComponentFixture<AddProductsComponent>;
  let productServiceMock: jasmine.SpyObj<ProductService>;


  beforeEach(() => {
    productServiceMock = jasmine.createSpyObj('ProductService', ['registerProduct', 'setProductId']);

    TestBed.configureTestingModule({
      declarations: [AddProductsComponent],
      imports: [ReactiveFormsModule, RouterTestingModule],
      providers: [
        { provide: ProductService, useValue: productServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AddProductsComponent);
    component = fixture.componentInstance;
    productServiceMock.setProductId.and.returnValue(1); // Set a fixed value for setProductId() for testing purposes
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set product ID', () => {
    const productId = component.setProductId();
    expect(productId).toBe(1);
  });

  // it('should send data', () => {

  //   const mockFormProductValue = { id: 1, nombreProducto: 'Test', descripcion: 'Description', logo: 'Logo', fechaLiberacion: '2023-01-01', fechaReestructuracion: null };
  //   component.formProduct.setValue(mockFormProductValue);

  //   productServiceMock.registerProduct.and.returnValue(of({}));
  //   component.sendData();

  //   expect(productServiceMock.registerProduct).toHaveBeenCalledWith(mockFormProductValue);
  // });

});
