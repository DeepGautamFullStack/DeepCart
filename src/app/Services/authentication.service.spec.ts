import { TestBed, inject } from '@angular/core/testing';

import { AuthenticationService } from './authentication.service';

describe('Services/AuthenticationServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthenticationService]
    });
  });

  it('should be created', inject([AuthenticationService], (service: AuthenticationService) => {
    expect(service).toBeTruthy();
  }));
});
