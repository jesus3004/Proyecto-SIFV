import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { usuarios } from '../../interfaz/interfas';
import { ProductosService } from '../../Servicies/productos.service';

@Component({
  selector: 'app-configuracion-de-usuario',
  templateUrl: './configuracion-de-usuario.component.html',
  styleUrls: ['./configuracion-de-usuario.component.css']
})
export class ConfiguracionDeUsuarioComponent implements OnInit {

  public mask = ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]

  usuarios:usuarios = {
    clavUsuario: '',
    nombreUsuario: '',
    telefonoUsuario: '',
    correoUsuario: '',
    passUsuario: '',
    calleUsuario: '',
    coloniaUsuario: '',
    numCasUsuario: '',
    rolUsuario: '',
    idVeterinaria: ''
  }

  limpiarUsuario:usuarios = {
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

  constructor(private firebase:ProductosService, private afAuth: AngularFireAuth,
    private readonly fireStore: AngularFirestore) { }

  ngOnInit(
  ): void {
    this.usuarios = this.firebase.usuarioArray;
  }

  async agregar(){
    const email = this.usuarios.correoUsuario;
    const password = this.usuarios.passUsuario;
    this.usuarios.clavUsuario = this.fireStore.createId();
    this.usuarios.idVeterinaria = this.firebase.usuarioArray.idVeterinaria;
    await this.firebase.agregarUsuarios(this.usuarios).then(()=>{
      this.firebase.exito('Usuario registrado con exito')
      this.limpiar()
      })
      .catch((err) => {
        console.log(err)
        this.firebase.error("Existe un problema al registrar el Usuario")
    })

    this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((user) => {
        this.verificarCorreo()
        
      })
      .catch((error) => {
        this.firebase.codeError(error.code);
      });
  }

  verificarCorreo() {
    this.afAuth.currentUser
      .then((user) => user?.sendEmailVerification())
      .then(() => {
        this.firebase.extra(
          'Al usuario se le envió un correo para verificar su cuenta',
          'verificar correo',
          'info'
        );
      });
  }

  limpiar(){
    this.usuarios = this.firebase.usuarioArray;
  }

}
