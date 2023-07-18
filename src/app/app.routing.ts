    import { ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { BaseComponent } from "./base/base.component";
import { IniciarSesionComponent } from "./components/iniciar-sesion/iniciar-sesion.component";
import { NgModule } from "@angular/core";
import { AgregarNuevoUsuarioComponent } from "./usuarios/agregar-nuevo-usuario/agregar-nuevo-usuario.component";
import { AgregarProvedorComponent } from "./proveedor/agregar-provedor/agregar-provedor.component";
import { AgregarProductosComponent } from "./productos/agregar-productos/agregar-productos.component";
import { InicioComponent } from "./components/inicio/inicio.component";
import { RegistrarUsuariosComponent } from "./usuarios/registrar-usuarios/registrar-usuarios.component";
import { NuevaVentaComponent } from "./ventas/nueva-venta/nueva-venta.component";
import { ProductosCaducadosComponent } from "./productos/productos-caducados/productos-caducados.component";
import { ProductosCaducarComponent } from "./productos/productos-caducar/productos-caducar.component";
import { HistorialProductosComponent } from "./productos/historial-productos/historial-productos.component";
import { HistorialUsuariosComponent } from "./usuarios/historial-usuarios/historial-usuarios.component";
import { HistorialVentasComponent } from "./ventas/historial-ventas/historial-ventas.component";
import { AgregarStockComponent } from "./productos/agregar-stock/agregar-stock.component";
import { HistorialProvedoresComponent } from "./proveedor/historial-provedores/historial-provedores.component";
import { AdminComponent } from './base/admin/admin.component';
import { AlmacenComponent } from './base/almacen/almacen.component';
import { CajeroComponent } from './base/cajero/cajero.component';

import { ErrorComponent } from './error/error.component';
import { SpinerComponent } from './components/spiner/spiner.component';
import { VerificarCorreoComponent } from './components/verificar-correo/verificar-correo.component';
import { RecuperarPaswordComponent } from './components/recuperar-pasword/recuperar-pasword.component';
import { AppComponent } from "./app.component";

const routes: Routes = [
    {path: '', redirectTo:'login' , pathMatch: 'full'},
    {path: 'login', component:IniciarSesionComponent},
    {path: 'administrador', component:AdminComponent, children:[
        {path: 'agregarUsuario', component:AgregarNuevoUsuarioComponent},
        {path: 'agregarProvedor', component:AgregarProvedorComponent},
        {path: 'agregarProducto', component:AgregarProductosComponent},
        {path: 'nuevaVen', component:NuevaVentaComponent},
        {path: 'proCad', component:ProductosCaducadosComponent},
        {path: 'posCad', component:ProductosCaducarComponent},
        {path: 'historialPro', component:HistorialProductosComponent},
        {path: 'historialProV', component:HistorialProvedoresComponent},
        {path: 'historialUsu', component:HistorialUsuariosComponent},
        {path: 'historialVent', component:HistorialVentasComponent},
        {path: 'agregarStok', component:AgregarStockComponent},
        {path: '', component:InicioComponent}
    ]},
    {path: 'cajero', component:CajeroComponent, children:[
        {path: 'nuevaVen', component:NuevaVentaComponent},
        {path: 'posCad', component:ProductosCaducarComponent},
        {path: 'historialPro', component:HistorialProductosComponent},
        {path: 'historialProV', component:HistorialProvedoresComponent},
        {path: 'historialVent', component:HistorialVentasComponent},
        {path: '', component:InicioComponent}
    ]},
    {path: 'almacenista', component:AlmacenComponent, children:[
        {path: 'agregarProvedor', component:AgregarProvedorComponent},
        {path: 'agregarProducto', component:AgregarProductosComponent},
        {path: 'proCad', component:ProductosCaducadosComponent},
        {path: 'posCad', component:ProductosCaducarComponent},
        {path: 'historialPro', component:HistorialProductosComponent},
        {path: 'historialProV', component:HistorialProvedoresComponent},
        {path: 'agregarStok', component:AgregarStockComponent},
        {path: '', component:InicioComponent}
    ]},    
    {path: 'registro', component:RegistrarUsuariosComponent},
    {path: 'verificarCorreo', component:VerificarCorreoComponent},
    {path: 'recuperarContra', component:RecuperarPaswordComponent},
    {path: '**', component:ErrorComponent}
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }