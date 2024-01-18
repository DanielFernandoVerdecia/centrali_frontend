import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IngresosGastosComponent } from './ingresos-gastos.component';

describe('IngresosGastosComponent', () => {
  let component: IngresosGastosComponent;
  let fixture: ComponentFixture<IngresosGastosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IngresosGastosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IngresosGastosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
