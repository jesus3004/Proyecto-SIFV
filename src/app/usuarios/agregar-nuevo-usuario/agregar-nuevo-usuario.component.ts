import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { usuarios } from '../../interfaz/interfas';
import { ProductosService } from '../../Servicies/productos.service';


@Component({
  selector: 'app-agregar-nuevo-Usuario',
  templateUrl: './agregar-nuevo-Usuario.component.html',
  styleUrls: ['./agregar-nuevo-Usuario.component.css']
})
export class AgregarNuevoUsuarioComponent implements OnInit {

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
    private router: Router,
    private readonly fireStore: AngularFirestore) { }

  ngOnInit(): void {
  }

  async agregar(){
    const email = this.usuarios.correoUsuario;
    const password = this.usuarios.passUsuario;
    this.usuarios.idVeterinaria = this.firebase.usuarioArray.idVeterinaria;
    await this.firebase.agregarUsuarios(this.usuarios).then(()=>{
      this.firebase.exito('Usuario registrado con exito')
      this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((user) => {
        this.verificarCorreo()
        
      })
      .catch((error) => {
        this.firebase.codeError(error.code);
      });
      })
      .catch((err) => {
        console.log(err)
        this.firebase.error("Existe un problema al registrar el Usuario")
    })

   
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
        this.limpiar();
        this.router.navigate(['/administrador/agregarUsuario']);
      });
  }

  limpiar(){
    this.usuarios = this.limpiarUsuario;
  }
}
