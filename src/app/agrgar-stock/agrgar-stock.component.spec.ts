import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgrgarStockComponent } from './agrgar-stock.component';

describe('AgrgarStockComponent', () => {
  let component: AgrgarStockComponent;
  let fixture: ComponentFixture<AgrgarStockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgrgarStockComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgrgarStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
