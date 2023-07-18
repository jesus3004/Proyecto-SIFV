import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { ProductosService } from '../../Servicies/productos.service';
import { usuarios } from 'src/app/interfaz/interfas';
import { Console } from 'console';


@Component({
  selector: 'app-iniciar-sesion',
  templateUrl: './iniciar-sesion.component.html',
  styleUrls: ['./iniciar-sesion.component.css']
})
export class IniciarSesionComponent implements OnInit {

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

  loginUsuario: FormGroup;
  loading: boolean = false;
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
  auxiliar:any;


  constructor(private router:Router,
    private firebase:ProductosService,
    private fb: FormBuilder,
    private afAuth: AngularFireAuth
    ) {
    this.loginUsuario = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    })
   }

  entrar(){
    var usuario = (<HTMLInputElement>document.getElementById('usuario')).value;
    var contra = (<HTMLInputElement>document.getElementById('contra')).value;
      if(usuario == 'jesus@gmail.com'){
        if(contra=='12345'){
        this.router.navigate(['/administrador'])
        }else{
          this.firebase.error('Contraseña Incorrecta')
        }
      }else{
        if(usuario=='mario@gmail.com'){
          if(contra=='12345'){
            this.router.navigate(['/inicio'])
            }else{
              this.firebase.error('Contraseña Incorrecta')
            }

        }else{
          if(usuario=='rafael@gmail.com'){
            if(contra=='12345'){
              this.router.navigate(['/inicio'])
              }else{
                this.firebase.error('Contraseña Incorrecta')
              }
          }else{
            this.firebase.error('Usuario Inexistente')
          }
        }
      }
  }

  ngOnInit(): void {
  }

  login() {
    const email = this.loginUsuario.value.email;
    const password = this.loginUsuario.value.password;

    this.loading = true;

    this.afAuth.signInWithEmailAndPassword(email, password).then((user) => {
      if(user.user?.emailVerified) {
        this.consultarUsuario();
      } else {
        this.router.navigate(['/verificarCorreo']);
      }
    }).catch((error) => {
      this.loading = false;
      this.firebase.codeError(error.code);
    })
  }


  async consultarUsuario(){
    const email = this.loginUsuario.value.email;
    (await this.firebase.obtenerUsuarios()).subscribe((res) => {
      this.usuario = res;
      this.usuario.find((element) => {
        if(element.correoUsuario == email){
         this.auxiliarUsuarios = element;
         console.log(this.auxiliarUsuarios)
         this.firebase.usuarizoClave.emit(this.auxiliarUsuarios);
          this.firebase.usuarioArray = this.auxiliarUsuarios;

        if(this.auxiliarUsuarios.rolUsuario == "ADMINISTRADOR"){
          this.router.navigate(['/administrador']);
        }
        if(this.auxiliarUsuarios.rolUsuario == "CAJERO"){
          this.router.navigate(['/cajero']);
        }
        if(this.auxiliarUsuarios.rolUsuario == "ALMACENISTA"){
          this.router.navigate(['/almacenista']);
        }
       }
       })
      })
  }
}
