import { TestBed, inject } from '@angular/core/testing';

import { Services\OrderService } from './services\order.service';

describe('Services\OrderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Services\OrderService]
    });
  });

  it('should be created', inject([Services\OrderService], (service: Services\OrderService) => {
    expect(service).toBeTruthy();
  }));
});
