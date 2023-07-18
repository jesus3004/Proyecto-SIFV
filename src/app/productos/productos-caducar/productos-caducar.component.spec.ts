import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductosCaducarComponent } from './productos-caducar.component';

describe('ProductosCaducarComponent', () => {
  let component: ProductosCaducarComponent;
  let fixture: ComponentFixture<ProductosCaducarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductosCaducarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductosCaducarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
