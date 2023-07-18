import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarProvedorComponent } from './agregar-provedor.component';

describe('AgregarProvedorComponent', () => {
  let component: AgregarProvedorComponent;
  let fixture: ComponentFixture<AgregarProvedorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregarProvedorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarProvedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
