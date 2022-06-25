import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductosCaducadosComponent } from './productos-caducados.component';

describe('ProductosCaducadosComponent', () => {
  let component: ProductosCaducadosComponent;
  let fixture: ComponentFixture<ProductosCaducadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductosCaducadosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductosCaducadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
