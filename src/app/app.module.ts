import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app.routing';


/* Componentes */
import { HistorialProductosComponent } from './productos/historial-productos/historial-productos.component';
import { HistorialUsuariosComponent } from './usuarios/historial-usuarios/historial-usuarios.component';
import { HistorialVentasComponent } from './ventas/historial-ventas/historial-ventas.component';
import { AgregarStockComponent } from './productos/agregar-stock/agregar-stock.component';
import { HistorialProvedoresComponent } from './proveedor/historial-provedores/historial-provedores.component';
import { AgregarProductosComponent } from './productos/agregar-productos/agregar-productos.component';
import { AgregarProvedorComponent } from './proveedor/agregar-provedor/agregar-provedor.component';
import { NuevaVentaComponent } from './ventas/nueva-venta/nueva-venta.component';
import { ProductosCaducarComponent } from './productos/productos-caducar/productos-caducar.component';
import { ProductosCaducadosComponent } from './productos/productos-caducados/productos-caducados.component';
import { AgregarNuevoUsuarioComponent } from './usuarios/agregar-nuevo-usuario/agregar-nuevo-usuario.component';
import { IniciarSesionComponent } from './components/iniciar-sesion/iniciar-sesion.component';
import { RegistrarUsuariosComponent } from './usuarios/registrar-usuarios/registrar-usuarios.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { BaseComponent } from './base/base.component';
import { AdminComponent } from './base/admin/admin.component';
import { AlmacenComponent } from './base/almacen/almacen.component';
import { CajeroComponent } from './base/cajero/cajero.component';
import { ErrorComponent } from './error/error.component';
import { SpinerComponent } from './components/spiner/spiner.component';
import { VerificarCorreoComponent } from './components/verificar-correo/verificar-correo.component';
import { RecuperarPaswordComponent } from './components/recuperar-pasword/recuperar-pasword.component';

/*
Extras
*/

import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';


/* Fire base */
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from '../environments/environment'
import { ProductosService } from './Servicies/productos.service';

/* mascaras */
import { TextMaskModule } from 'angular2-text-mask';

import { ReactiveFormsModule } from '@angular/forms';
import { ConfiguracionDeUsuarioComponent } from './usuarios/configuracion-de-usuario/configuracion-de-usuario.component';



@NgModule({
  declarations: [
    AppComponent,
    IniciarSesionComponent,
    RegistrarUsuariosComponent,
    InicioComponent,
    BaseComponent,
    AgregarProvedorComponent,
    NuevaVentaComponent,
    ProductosCaducarComponent,
    AgregarNuevoUsuarioComponent,
    HistorialUsuariosComponent,
    HistorialVentasComponent,
    HistorialProvedoresComponent,
    AgregarProductosComponent,
    ProductosCaducadosComponent,
    HistorialProductosComponent,
    AgregarStockComponent,
    AdminComponent,
    AlmacenComponent,
    CajeroComponent,
    ErrorComponent,
    SpinerComponent,
    VerificarCorreoComponent,
    RecuperarPaswordComponent,
    ConfiguracionDeUsuarioComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    MatFormFieldModule,
    MatTableModule,
    MatIconModule,
    MatTooltipModule,
    BrowserAnimationsModule,
    TextMaskModule,
    MatPaginatorModule,
    MatInputModule,
    AngularFireModule.initializeApp(environment.firebaseConfig)
  ],
  providers: [ProductosService],
  bootstrap: [AppComponent]
})
export class AppModule { }
