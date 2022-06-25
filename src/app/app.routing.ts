    import { ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { BaseComponent } from "./base/base.component";
import { IniciarSesionComponent } from "./iniciar-sesion/iniciar-sesion.component";
import { NgModule } from "@angular/core";
import { AgregarNuevoUsuarioComponent } from "./agregar-nuevo-usuario/agregar-nuevo-usuario.component";
import { AgregarProvedorComponent } from "./agregar-provedor/agregar-provedor.component";
import { AgregarProductosComponent } from "./agregar-productos/agregar-productos.component";
import { InicioComponent } from "./inicio/inicio.component";
import { ListaDeProductosComponent } from "./lista-de-productos/lista-de-productos.component";
import { RegistrarUsuariosComponent } from "./registrar-usuarios/registrar-usuarios.component";
import { NuevaVentaComponent } from "./nueva-venta/nueva-venta.component";
import { ProductosCaducadosComponent } from "./productos-caducados/productos-caducados.component";
import { ProductosCaducarComponent } from "./productos-caducar/productos-caducar.component";
import { HistorialProductosComponent } from "./historial-productos/historial-productos.component";
import { HistorialUsuariosComponent } from "./historial-usuarios/historial-usuarios.component";
import { HistorialVentasComponent } from "./historial-ventas/historial-ventas.component";
import { AgregarStockComponent } from "./agregar-stock/agregar-stock.component";
import { HistorialProvedoresComponent } from "./historial-provedores/historial-provedores.component";

const routes: Routes = [
    {path: '', component:IniciarSesionComponent},
    {path: 'inicio', component:BaseComponent, children:[
        {path: 'agregarUsuario', component:AgregarNuevoUsuarioComponent},
        {path: 'agregarProvedor', component:AgregarProvedorComponent},
        {path: 'agregarProducto', component:AgregarProductosComponent},
        {path: 'listaDeProductos', component:ListaDeProductosComponent},
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
    {path: 'registro', component:RegistrarUsuariosComponent}
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }