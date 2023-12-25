import { TestBed } from '@angular/core/testing';

import { GeneralService } from './general.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from 'src/environments/environment';

describe('GeneralService', () => {
  let service: GeneralService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [GeneralService]
    });

    service = TestBed.inject(GeneralService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  // Verifica que no haya solicitudes pendientes después de cada prueba
  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should make a GET request', () => {

    const endpoint = 'test';
    const expectedUrl = `${environment.baseUrl}/${endpoint}`;
    const responseData = { product: '{"id": 1, "logo": "logo.jpg", "nombreProducto": "Product 1", "descripcion": "Description", "fechaLiberacion": "2023-01-01"}' };


    service.get(endpoint).subscribe(response => {
      expect(response).toEqual(responseData);
    });

    const req = httpTestingController.expectOne(expectedUrl);
    expect(req.request.method).toEqual('GET');
    req.flush(responseData);
  });

});
