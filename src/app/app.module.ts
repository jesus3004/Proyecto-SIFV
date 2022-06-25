import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { IniciarSesionComponent } from './iniciar-sesion/iniciar-sesion.component';
import { RegistrarUsuariosComponent } from './registrar-usuarios/registrar-usuarios.component';
import { InicioComponent } from './inicio/inicio.component';
import { BaseComponent } from './base/base.component';
import { FormsModule } from '@angular/forms';
import { AgregarProductosComponent } from './agregar-productos/agregar-productos.component';
import { AgregarProvedorComponent } from './agregar-provedor/agregar-provedor.component';
import { NuevaVentaComponent } from './nueva-venta/nueva-venta.component';
import { ProductosCaducarComponent } from './productos-caducar/productos-caducar.component';
import { ProductosCaducadosComponent } from './productos-caducados/productos-caducados.component';
import { AgregarNuevoUsuarioComponent } from './agregar-nuevo-usuario/agregar-nuevo-usuario.component';
import { ListaDeProductosComponent } from './lista-de-productos/lista-de-productos.component';

import { AppRoutingModule } from './app.routing';
import { HistorialProductosComponent } from './historial-productos/historial-productos.component';
import { HistorialUsuariosComponent } from './historial-usuarios/historial-usuarios.component';
import { HistorialVentasComponent } from './historial-ventas/historial-ventas.component';
import { AgregarStockComponent } from './agregar-stock/agregar-stock.component';
import { HistorialProvedoresComponent } from './historial-provedores/historial-provedores.component';
import { AgrgarStockComponent } from './agrgar-stock/agrgar-stock.component';

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
@NgModule({
  declarations: [
    AppComponent,
    IniciarSesionComponent,
    RegistrarUsuariosComponent,
    InicioComponent,
    BaseComponent,
    AgregarProductosComponent,
    AgregarProvedorComponent,
    NuevaVentaComponent,
    ProductosCaducarComponent,
    ProductosCaducadosComponent,
    AgregarNuevoUsuarioComponent,
    ListaDeProductosComponent,
    HistorialProductosComponent,
    HistorialUsuariosComponent,
    HistorialVentasComponent,
    AgregarStockComponent,
    HistorialProvedoresComponent,
    AgrgarStockComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    MatFormFieldModule,
    MatTableModule,
    MatIconModule,
    MatTooltipModule,
    BrowserAnimationsModule,
    TextMaskModule,
    MatPaginatorModule,
    MatInputModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig)
  ],
  providers: [ProductosService],
  bootstrap: [AppComponent]
})
export class AppModule { }
