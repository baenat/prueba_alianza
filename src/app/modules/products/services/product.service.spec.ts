import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { TestBed } from '@angular/core/testing';
import { ProductService } from './product.service';
import { ProductModel } from '@core/models/product.model';
import { GeneralService } from "@shared/services/general.service";
import { of } from "rxjs";

const mockProducts: ProductModel[] = [
  {
    "id": 1,
    "logo": "https://images.vexels.com/media/users/3/258887/isolated/preview/02d6895f2e2371143893c29dc66af93e-mano-que-sostiene-la-tarjeta-de-cra-dito-plana.png",
    "nombreProducto": "Tarjeta de crédito",
    "descripcion": "Tarjeta de crédito con beneficios exclusivos para sus clientes.",
    "fechaLiberacion": "2023-08-01",
    "fechaReestructuracion": null
  },
  {
    "id": 2,
    "logo": "https://images.vexels.com/media/users/3/258887/isolated/preview/02d6895f2e2371143893c29dc66af93e-mano-que-sostiene-la-tarjeta-de-cra-dito-plana.png",
    "nombreProducto": "Tarjeta de crédito",
    "descripcion": "Tarjeta de crédito con beneficios exclusivos para sus clientes.",
    "fechaLiberacion": "2023-08-01",
    "fechaReestructuracion": null
  }
];

const mockProduct = {
  "id": 1,
  "logo": "https://images.vexels.com/media/users/3/258887/isolated/preview/02d6895f2e2371143893c29dc66af93e-mano-que-sostiene-la-tarjeta-de-cra-dito-plana.png",
  "nombreProducto": "Tarjeta de crédito",
  "descripcion": "Tarjeta de crédito con beneficios exclusivos para sus clientes.",
  "fechaLiberacion": "2023-08-01",
  "fechaReestructuracion": null
};

describe('ProductService', () => {
  let productService: ProductService;
  let generalServiceMock: jasmine.SpyObj<GeneralService>;

  beforeEach(() => {
    generalServiceMock = jasmine.createSpyObj('GeneralService', ['get', 'post', 'put', 'delete']);
    productService = new ProductService(generalServiceMock);
  });

  it('should create ProductService', () => {
    expect(productService).toBeTruthy();
  });

  it('should set product id', () => {
    const productId = productService.setProductId();
    expect(productId).toBeGreaterThan(0);
  });

  it('should get all products', () => {
    generalServiceMock.get.and.returnValue(of([]));

    productService.getAllProducts().subscribe(response => {
      expect(response).toEqual([]);
      expect(generalServiceMock.get).toHaveBeenCalledWith('products');
    });
  });

  it('should register a product', () => {
    const product = mockProduct as ProductModel;
    generalServiceMock.post.and.returnValue(of(mockProduct));

    productService.registerProduct(product).subscribe(response => {
      expect(response).toEqual(mockProduct);
      expect(generalServiceMock.post).toHaveBeenCalledWith('products', product);
    });
  });

  it('should edit a product', () => {
    const product = mockProduct as ProductModel;
    generalServiceMock.put.and.returnValue(of(mockProduct));

    productService.editProduct(product).subscribe(response => {
      expect(response).toEqual(mockProduct);
      expect(generalServiceMock.put).toHaveBeenCalledWith(`products/${product.id}`, product);
    });
  });

  it('should delete a product', () => {
    const productId = 1;
    generalServiceMock.delete.and.returnValue(of(mockProducts));

    productService.deleteProduct(productId).subscribe(response => {
      expect(response).toEqual(mockProducts);
      expect(generalServiceMock.delete).toHaveBeenCalledWith(`products/${productId}`);
    });
  });
});
