import {EventEmitter,  Injectable, Input, Output } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import 'firebase/compat/storage';
import { FirebaseCodeErrorEnum } from '../utils/firebase-code-error';
import { agregarProductos, lotes, provedores, ventas, detalleDeventas, usuarios, caducidad, empresa } from '../interfaz/interfas';
import Swal, { SweetAlertIcon } from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  private colUsuarios:AngularFirestoreCollection<usuarios>;
  private colveterinarias:AngularFirestoreCollection<empresa>
  public usuarioArray:usuarios = {
    idVeterinaria: '',
    clavUsuario: '',
    nombreUsuario: '',
    telefonoUsuario: '',
    correoUsuario: '',
    passUsuario: '',
    calleUsuario: '',
    coloniaUsuario: '',
    numCasUsuario: '',
    rolUsuario: ''
  } 



  usuario: any; 
  idVeterinaria:any;
  listaUsuarios:usuarios [] = [];
  auxiliar:usuarios = {
    idVeterinaria: '',
    clavUsuario: '',
    nombreUsuario: '',
    telefonoUsuario: '',
    correoUsuario: '',
    passUsuario: '',
    calleUsuario: '',
    coloniaUsuario: '',
    numCasUsuario: '',
    rolUsuario: ''
  }

  imprimirElDisparador(){
    

  }

  constructor( private readonly fireStore: AngularFirestore, private autenticar: AngularFireAuth) {;
    this.colUsuarios=fireStore.collection<usuarios>('Usuarios');
    this.colveterinarias=fireStore.collection<empresa>('veterinarias');
   }

   //Autenticadores

   async autenticarVeterinaria(){

    (await this.obtenerUsuarios()).subscribe((res) => {
      this.listaUsuarios = res;
      
    });
    
    (await this.autenticar.currentUser.then(user => {
      if(user && user.emailVerified) {
        this.usuario = user?.email;
      }
    }));
    console.log("Usuario en services "+this.usuario);
     (await this.listaUsuarios.find((element) => {
      //this.encontrarLote(element , valor)
      if(element.correoUsuario == this.usuario){
        console.log("Entro a element"+element.idVeterinaria);
       this.idVeterinaria = element.idVeterinaria;
       this.auxiliar = element;
     }
     }));
     const respuesta = await this.colUsuarios.doc(this.auxiliar.clavUsuario).valueChanges();
     console.log(respuesta)
     return respuesta;
     
   }

   //servicios de productos
  async agregarProductos(datosProductos:agregarProductos){
    const resultado = await this.fireStore.collection('veterinarias/'+this.usuarioArray.idVeterinaria+'/productos').doc(datosProductos.codigoDeBarras).set(datosProductos);
    return resultado
  }
  async agregarLote(datosProductos:lotes, idProducto:agregarProductos){
    const resultado = await this.fireStore.collection('veterinarias/'+this.usuarioArray.idVeterinaria+'/productos/'+idProducto.codigoDeBarras+'/lote').doc(datosProductos.numeroDeLote).set(datosProductos);
    return resultado
  }
  async obtenerProductos(){
    return await this.fireStore.collection<agregarProductos>('veterinarias/'+this.usuarioArray.idVeterinaria+'/productos').valueChanges();
  }

  async obtenerLotes(clave:string){
    return await this.fireStore.collection<lotes>('veterinarias/'+this.usuarioArray.idVeterinaria+'/productos/'+clave+'/lote').valueChanges();
  }

  async obtenerLotesEspecificos(datosProductos:lotes, idProducto:agregarProductos){
    return await this.fireStore.collection<lotes>('veterinarias/'+this.usuarioArray.idVeterinaria+'/productos/'+idProducto.codigoDeBarras+'/lote').doc(datosProductos.numeroDeLote).valueChanges();
  }

  async buscarProductos(codigoDebarras:string){
   return await this.fireStore.collection<agregarProductos>('veterinarias/'+this.usuarioArray.idVeterinaria+'/productos').doc(codigoDebarras).valueChanges();
  }

  async eliminarProducto(codigoDebarras:string){
    const resultado = await this.fireStore.collection('veterinarias/'+this.usuarioArray.idVeterinaria+'/productos').doc(codigoDebarras).delete()
    return resultado
  }

  async eliminarLote(codigoDeBarras:string, numeroLote:string){
    return await this.fireStore.collection<lotes>('veterinarias/'+this.usuarioArray.idVeterinaria+'/productos/'+codigoDeBarras+'/lote').doc(numeroLote).delete()
  }

  async Acaducir(caducidad:caducidad){
    const resultado = await this.fireStore.collection('veterinarias/'+this.usuarioArray.idVeterinaria+'/todosLoslotes').doc(caducidad.codigoDeBarras+'-'+caducidad.numeroDeLote).set(caducidad);
    return resultado
  }

  async caducir(){
    const resultado = await this.fireStore.collection('veterinarias/'+this.usuarioArray.idVeterinaria+'/todosLoslotes').valueChanges()
    return resultado
  }

  //servicios de Provedor
  async agregarProbedor(datosProbedor:provedores){
    /*await this.colProvedor.doc(datosProbedor.clavProvedor).set(datosProbedor);*/
    
    const resultado = await this.fireStore.collection('veterinarias/'+this.usuarioArray.idVeterinaria+'/proveedor').doc(datosProbedor.clavProvedor).set(datosProbedor);
    return resultado;
  }
  async obtenerProbedor(){
    const resultado = await this.fireStore.collection<provedores>('veterinarias/'+this.usuarioArray.idVeterinaria+'/proveedor').valueChanges()
    return await resultado;
  }

  async eliminarProvedor(clave:string){
    return await this.fireStore.collection('veterinarias/'+this.usuarioArray.idVeterinaria+'/proveedor').doc(clave).delete()
  }
  //Servicios de ventas
  async agregarVeta(datosVenta:ventas){
    const resultado = await this.fireStore.collection('veterinarias/'+this.usuarioArray.idVeterinaria+'/ventas').doc(datosVenta.claveDeVenta).set(datosVenta);
    return resultado
  }
  async obtenerVenta(){
    const resultado = await this.fireStore.collection<ventas>('veterinarias/'+this.usuarioArray.idVeterinaria+'/ventas').valueChanges()
    return await resultado;
  }
  
  async agregarDetalleVeta(ventas:String,datosDVenta:detalleDeventas){

    const resultado = await this.fireStore.collection('veterinarias/'+this.usuarioArray.idVeterinaria+'/ventas/'+ventas+'/detalleVenta').doc(datosDVenta.claveproducto +  '-' +datosDVenta.numeroDeLote).set(datosDVenta);
    
    return resultado;
  }
  async obtenerDetalleVenta(ventas:string){
    const resultado = await this.fireStore.collection<detalleDeventas>('veterinarias/'+this.usuarioArray.idVeterinaria+'/ventas/'+ventas+'/detalleVenta').valueChanges()
    return resultado;
  }

  async eliminarDeVenta(ventas:string, lote:string){
    const resultado = await this.fireStore.collection<detalleDeventas>('veterinarias/'+this.usuarioArray.idVeterinaria+'/ventas/'+ventas+'/detalleVenta').doc(lote).delete();
    return resultado;
  }

  /*Usuarios*/

  async agregarUsuarios(usuarios:usuarios){
    usuarios.idVeterinaria = this.usuarioArray.idVeterinaria;
  const  resultado = await this.colUsuarios.doc(usuarios.clavUsuario).set(usuarios)
  return resultado
  }
  async agregarUsuariosNuevo(usuarios:usuarios){
    usuarios.idVeterinaria = this.usuarioArray.idVeterinaria;
    const  resultado = await this.colUsuarios.doc(usuarios.clavUsuario).set(usuarios)
    return resultado
    }

  async obtenerUsuarios(){
    return await this.colUsuarios.valueChanges();
  }

  async eliminarUsuario(clave:string){
  return await this.colUsuarios.doc(clave).delete()
  }

  /* Datos generales de la empresa */

  async agregarEmpresa(empresa:empresa){
    
    const resultado = await this.colveterinarias.doc(empresa.id).set(empresa)
    return resultado;
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

  

  extra(mensaje:string, titulo:string, icon:SweetAlertIcon | undefined){
    Swal.fire({
      title: titulo,
      text: mensaje,
      icon: icon
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

  codeError(code: string) {
    switch (code) {
      // El correo ya existe
      case FirebaseCodeErrorEnum.EmailAlreadyInUse:
        this.repetido('El usuario ya existe');
        break
      // Contraseña debil
      case FirebaseCodeErrorEnum.WeakPassword:
        this.repetido('La contraseña es muy debil');
        break
      // Correo invalido
      case FirebaseCodeErrorEnum.InvalidEmail:
        this.error('Correo invalido');
        break
      // Contraseña incorrecta
      case FirebaseCodeErrorEnum.WrongPassword:
        this.error('Contraseña incorrecta');
        break
      // El usuario no existe
      case FirebaseCodeErrorEnum.UserNotFound:
        this.error('El usuario no existe'); 
        break
      default:
        this.error('Error desconocido');
        break
    }
  }
 

}
