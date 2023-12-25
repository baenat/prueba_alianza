import { TestBed } from '@angular/core/testing';

import { SearchService } from './search.service';
import { GeneralService } from './general.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { of } from 'rxjs';

describe('SearchService', () => {
  let service: SearchService;
  let mockGeneralService: jasmine.SpyObj<GeneralService>;

  beforeEach(() => {
    mockGeneralService = jasmine.createSpyObj('GeneralService', ['get']);

    TestBed.configureTestingModule({
      providers: [
        SearchService,
        { provide: GeneralService, useValue: mockGeneralService }
      ]
    });

    service = TestBed.inject(SearchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call get from generalService with the correct URL', () => {
    const searchTerms = 'test';
    service.search(searchTerms);
    expect(mockGeneralService.get).toHaveBeenCalledWith(`products?q=${searchTerms}`);
  });

  it('should emit the results from generalService on search', () => {
    const mockProducts = [{ id: 1, name: 'Producto 1' }];
    mockGeneralService.get.and.returnValue(of(mockProducts));

    service.search('test').subscribe(results => {
      expect(results).toEqual(mockProducts);
    });
  });


});
