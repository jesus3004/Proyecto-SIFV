import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfiguracionDeUsuarioComponent } from './configuracion-de-usuario.component';

describe('ConfiguracionDeUsuarioComponent', () => {
  let component: ConfiguracionDeUsuarioComponent;
  let fixture: ComponentFixture<ConfiguracionDeUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfiguracionDeUsuarioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfiguracionDeUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
