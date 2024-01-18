import { TestBed } from '@angular/core/testing';

import { IsActiveGuard } from './is-active.guard';

describe('IsActiveGuard', () => {
  let guard: IsActiveGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(IsActiveGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
