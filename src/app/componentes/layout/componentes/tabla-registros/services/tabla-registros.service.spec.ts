import { TestBed } from '@angular/core/testing';

import { TablaRegistrosService } from './tabla-registros.service';

describe('TablaRegistrosService', () => {
  let service: TablaRegistrosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TablaRegistrosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
