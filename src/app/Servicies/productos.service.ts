import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import 'firebase/compat/storage';
import { agregarProductos, lotes, provedores, ventas, detalleDeventas, usuarios, caducidad } from '../productos-caducar/interfaz/interfas';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  private colProductos:AngularFirestoreCollection<agregarProductos>;
  private colProvedor:AngularFirestoreCollection<provedores>;
  private colVentas:AngularFirestoreCollection<ventas>;
  private colUsuarios:AngularFirestoreCollection<usuarios>;
  private colCaducidad:AngularFirestoreCollection<caducidad>;

  constructor(private readonly fireStore: AngularFirestore, private autenticar: AngularFireAuth) {
    this.colProductos=fireStore.collection<agregarProductos>('productos');
    this.colProvedor=fireStore.collection<provedores>('provedores');
    this.colVentas=fireStore.collection<ventas>('ventas');
    this.colUsuarios=fireStore.collection<usuarios>('Usuarios');
    this.colCaducidad=fireStore.collection<caducidad>('Caducidad');
   }
  
   //servicios de productos
  async agregarProductos(datosProductos:agregarProductos){
    const resultado = await this.colProductos.doc(datosProductos.codigoDeBarras).set(datosProductos);
    return resultado
  }
  async agregarLote(datosProductos:lotes, idProducto:agregarProductos){
    return await this.fireStore.collection('productos/'+idProducto.codigoDeBarras+'/lote').doc(datosProductos.numeroDeLote).set(datosProductos);
  }
  async obtenerProductos(){
    return await this.colProductos.valueChanges();
  }

  async obtenerLotes(clave:string){
    return await this.fireStore.collection<lotes>('productos/'+clave+'/lote').valueChanges();
  }

  async obtenerLotesEspecificos(datosProductos:lotes, idProducto:agregarProductos){
    console.log(idProducto.codigoDeBarras)
    console.log(datosProductos.numeroDeLote)
    console.log(this.fireStore.collection<lotes>('productos/'+idProducto.codigoDeBarras+'/lote').doc(datosProductos.numeroDeLote).valueChanges())
    return await this.fireStore.collection<lotes>('productos/'+idProducto.codigoDeBarras+'/lote').doc(datosProductos.numeroDeLote).valueChanges();
  }

  async buscarProductos(codigoDebarras:string){
   return await this.colProductos.doc(codigoDebarras).valueChanges();
  }

  async eliminarProducto(codigoDebarras:string){
    const resultado = await this.colProductos.doc(codigoDebarras).delete()
    return resultado
  }

  async eliminarLote(codigoDeBarras:string, numeroLote:string){
    return await this.fireStore.collection<lotes>('productos/'+codigoDeBarras+'/lote').doc(numeroLote).delete()
  }

  async Acaducir(caducidad:caducidad){
    const resultado = await this.colCaducidad.doc(caducidad.codigoDeBarras+'-'+caducidad.numeroDeLote).set(caducidad)
    return resultado
  }

  async caducir(){
    const resultado = await this.colCaducidad.valueChanges()
    return resultado
  }

  //servicios de Provedor
  async agregarProbedor(datosProbedor:provedores){
    const resultado = await this.colProvedor.doc(datosProbedor.clavProvedor).set(datosProbedor);
    return resultado
  }
  async obtenerProbedor(){
    return await this.colProvedor.valueChanges();
  }

  async eliminarProvedor(clave:string){
    return await this.colProvedor.doc(clave).delete()
  }
  //Servicios de ventas
  async agregarVeta(datosVenta:ventas){
    const resultado = await this.colVentas.doc(datosVenta.claveDeVenta).set(datosVenta);
    return resultado
  }
  async obtenerVenta(){
    return await this.colVentas.valueChanges();
  }
  
  async agregarDetalleVeta(ventas:String,datosDVenta:detalleDeventas){
    
    return await this.fireStore.collection('ventas/'+ventas+'/detalleVenta').doc(datosDVenta.claveproducto +  '-' +datosDVenta.numeroDeLote).set(datosDVenta);
  }
  async obtenerDetalleVenta(ventas:string){
    return await this.fireStore.collection('ventas/'+ventas+'/detalleVenta').valueChanges();
  }

  async eliminarDeVenta(ventas:string, lote:string){
    return await this.fireStore.collection('ventas/'+ventas+'/detalleVenta').doc(lote).delete()
  }

  /*Usuarios*/

  async agregarUsuarios(usuarios:usuarios){
  const  resultado = await this.colUsuarios.doc(usuarios.clavUsuario).set(usuarios)
  return resultado
  }

  async obtenerUsuarios(){
    return await this.colUsuarios.valueChanges();
  }

  async eliminarUsuario(clave:string){
  return await this.colUsuarios.doc(clave).delete()
  }
  
  exito(mensaje:string){
    Swal.fire({
      title: '¡Registrado!',
      text: mensaje,
      icon: 'success'
    });
  }
  exitoB(mensaje:string){
    Swal.fire({
      title: '¡Eliminado!',
      text: mensaje,
      icon: 'success'
    });
  }
  exitoA(mensaje:string){
    Swal.fire({
      title: '¡Actualizado!',
      text: mensaje,
      icon: 'success'
    });
  }
  

  error(mensaje:string){
    Swal.fire({
      title: '¡Ups!',
      text: mensaje,
      icon: 'error'
    });
  }

  repetido(mensaje:string){
    Swal.fire({
      title: '¡Ups!',
      text: mensaje,
      icon: 'warning'
    });
  }

  borrar(mensaje:string){
   const resultado = Swal.fire({
      title: '¿Estas seguro?',
      text: mensaje,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borrar'
    }).then((result) => {
      if (result.isConfirmed) {
        return true;
      }else{
        return false;
      }
    })

    return resultado
  }

 
}
