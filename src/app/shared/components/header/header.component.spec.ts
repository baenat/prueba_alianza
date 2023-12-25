import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { Router } from '@angular/router';
import { SearchService } from '@shared/services/search.service';
import { of } from 'rxjs';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let routerMock: jasmine.SpyObj<Router>;
  let searchServiceMock: jasmine.SpyObj<SearchService>;

  beforeEach(() => {
    routerMock = jasmine.createSpyObj('Router', ['navigate']);
    searchServiceMock = jasmine.createSpyObj('SearchService', ['search', 'onResultSearch']);

    TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      providers: [
        { provide: Router, useValue: routerMock },
        { provide: SearchService, useValue: searchServiceMock },
      ],
    });

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
  });

  it('should create HeaderComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to "/products/create"', () => {
    component.routerPage();
    expect(routerMock.navigate).toHaveBeenCalledWith(['/products/create']);
  });

  it('should search products when terms length is greater than 3', () => {
    const mockTerms = 'search term';

    searchServiceMock.search.and.returnValue(of({ results: [] }));
    component.searchProducts(mockTerms);

    expect(searchServiceMock.search).toHaveBeenCalledWith(mockTerms);
    expect(searchServiceMock.onResultSearch).toHaveBeenCalled();
  });

  it('should search products when terms is an empty string', () => {
    const mockTerms = '';

    searchServiceMock.search.and.returnValue(of({ results: [] }));
    component.searchProducts(mockTerms);

    expect(searchServiceMock.search).toHaveBeenCalledWith(mockTerms);
    expect(searchServiceMock.onResultSearch).toHaveBeenCalled();
  });

  it('should not search products when terms length is less than or equal to 3', () => {
    const mockTerms = 'ab';

    component.searchProducts(mockTerms);

    expect(searchServiceMock.search).not.toHaveBeenCalled();
    expect(searchServiceMock.onResultSearch).not.toHaveBeenCalled();
  });
});
