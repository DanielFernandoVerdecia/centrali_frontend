import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimacionEscribiendoComponent } from './animacion-escribiendo.component';

describe('AnimacionEscribiendoComponent', () => {
  let component: AnimacionEscribiendoComponent;
  let fixture: ComponentFixture<AnimacionEscribiendoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnimacionEscribiendoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnimacionEscribiendoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
