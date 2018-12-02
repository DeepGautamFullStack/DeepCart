import { TestBed, inject } from '@angular/core/testing';

import { Services\ProductService } from './services\product.service';

describe('Services\ProductService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Services\ProductService]
    });
  });

  it('should be created', inject([Services\ProductService], (service: Services\ProductService) => {
    expect(service).toBeTruthy();
  }));
});
