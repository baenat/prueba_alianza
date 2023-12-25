import { TestBed } from '@angular/core/testing';

import { InjectInterceptor } from './inject.interceptor';

describe('InjectInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      InjectInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: InjectInterceptor = TestBed.inject(InjectInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
