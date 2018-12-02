import { TestBed, async, inject } from '@angular/core/testing';

import { Gaurd\authGuardGuard } from './gaurd\auth-guard.guard';

describe('Gaurd\authGuardGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Gaurd\authGuardGuard]
    });
  });

  it('should ...', inject([Gaurd\authGuardGuard], (guard: Gaurd\authGuardGuard) => {
    expect(guard).toBeTruthy();
  }));
});
