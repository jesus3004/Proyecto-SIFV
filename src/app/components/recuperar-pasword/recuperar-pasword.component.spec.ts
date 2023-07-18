import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecuperarPaswordComponent } from './recuperar-pasword.component';

describe('RecuperarPaswordComponent', () => {
  let component: RecuperarPaswordComponent;
  let fixture: ComponentFixture<RecuperarPaswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecuperarPaswordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecuperarPaswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
