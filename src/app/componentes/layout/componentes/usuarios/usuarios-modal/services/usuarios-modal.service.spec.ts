import { TestBed } from '@angular/core/testing';

import { UsuariosModalService } from './usuarios-modal.service';

describe('UsuariosModalService', () => {
  let service: UsuariosModalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsuariosModalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
