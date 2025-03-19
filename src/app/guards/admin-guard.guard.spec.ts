import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { AdminGuard } from './admin-guard.guard';

describe('AdminGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => new AdminGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
