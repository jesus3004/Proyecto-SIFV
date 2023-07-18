import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorialProvedoresComponent } from './historial-provedores.component';

describe('HistorialProvedoresComponent', () => {
  let component: HistorialProvedoresComponent;
  let fixture: ComponentFixture<HistorialProvedoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistorialProvedoresComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HistorialProvedoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
