import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimacionCargandoComponent } from './animacion-cargando.component';

describe('AnimacionCargandoComponent', () => {
  let component: AnimacionCargandoComponent;
  let fixture: ComponentFixture<AnimacionCargandoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnimacionCargandoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnimacionCargandoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
