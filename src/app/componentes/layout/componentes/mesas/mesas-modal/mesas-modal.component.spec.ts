import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MesasModalComponent } from './mesas-modal.component';

describe('MesasModalComponent', () => {
  let component: MesasModalComponent;
  let fixture: ComponentFixture<MesasModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MesasModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MesasModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
