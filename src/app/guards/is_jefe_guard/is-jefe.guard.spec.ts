import { TestBed } from '@angular/core/testing';

import { IsJefeGuard } from './is-jefe.guard';

describe('IsJefeGuard', () => {
  let guard: IsJefeGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(IsJefeGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
