
import { Component, Input, OnInit, Output } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import * as EventEmitter from 'events';
import { usuarios } from 'src/app/interfaz/interfas';
import { ProductosService } from 'src/app/Servicies/productos.service';


@Component({
  selector: 'app-almacen',
  templateUrl: './almacen.component.html',
  styleUrls: ['./almacen.component.css']
})
export class AlmacenComponent implements OnInit {
  @Input() usuarioEntrada:usuarios = {
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

  @Output() usuarioSalida:any = new EventEmitter();

  constructor(private firebase:ProductosService, private afAuth: AngularFireAuth,private router: Router) { }

  usuario:usuarios [] = [];
  auxiliarUsuarios:usuarios = {
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
  public auxiliar:any;
  public nombreUsuario:any;
  
   ngOnInit(): void {
      this.consultarUsuario();
      this.consultarUsuarioLocal();
  }

  consultarUsuario(){
      this.auxiliarUsuarios =  this.firebase.usuarioArray;
      this.nombreUsuario = this.auxiliarUsuarios.nombreUsuario;
      console.log(this.firebase.usuarioArray);
  }

  consultarUsuarioLocal(){
    this.afAuth.currentUser.then(user => {
      if(user && user.emailVerified) {

      } else {
        this.router.navigate(['/login']);
      }
    })
  }

  salir(){
    this.afAuth.signOut().then(() => this.router.navigate(['/login']));
  }

}
