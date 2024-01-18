import { TestBed } from '@angular/core/testing';

import { ProductosModalService } from './productos-modal.service';

describe('ProductosModalService', () => {
  let service: ProductosModalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductosModalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
