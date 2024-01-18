import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimacionCheckComponent } from './animacion-check.component';

describe('AnimacionCheckComponent', () => {
  let component: AnimacionCheckComponent;
  let fixture: ComponentFixture<AnimacionCheckComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnimacionCheckComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnimacionCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
