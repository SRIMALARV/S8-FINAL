import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { ModeratorGuard } from './moderator-guard.guard';

describe('ModeratorGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => new ModeratorGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
