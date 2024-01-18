import { TestBed } from '@angular/core/testing';

import { VentaModalService } from './venta-modal.service';

describe('VentaModalService', () => {
  let service: VentaModalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VentaModalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
