import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarNuevoUsuarioComponent } from './agregar-nuevo-usuario.component';



describe('AgregarNuevoUsuarioComponent', () => {
  let component: AgregarNuevoUsuarioComponent;
  let fixture: ComponentFixture<AgregarNuevoUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregarNuevoUsuarioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarNuevoUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
