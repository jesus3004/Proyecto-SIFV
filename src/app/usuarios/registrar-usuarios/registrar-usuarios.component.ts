import { Component, Input, OnInit, Output } from '@angular/core';
import * as EventEmitter from 'events';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { empresa, usuarios } from 'src/app/interfaz/interfas';
import { ProductosService } from 'src/app/Servicies/productos.service';


@Component({
  selector: 'app-registrar-usuarios',
  templateUrl: './registrar-usuarios.component.html',
  styleUrls: ['./registrar-usuarios.component.css']
})
export class RegistrarUsuariosComponent implements OnInit {

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

  registrarUsuario: FormGroup;
  loading: boolean = false;

  public mascaraParaTelefono = ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]

  usuarios:usuarios ={
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

  empresa:empresa = {
    id: '',
    nombre: '',
    telefono: '',
    calle: '',
    colonia: '',
    municipio: '',
    estado: ''
  }

  constructor(
    private fb: FormBuilder,
    private afAuth: AngularFireAuth,
    private router: Router,
    private firebase:ProductosService,
    private readonly fireStore: AngularFirestore
  ) { 
    this.registrarUsuario = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      repetirPassword: ['', Validators.required],
      telefonoEmpresa: ['', Validators.required],
      nombreEmpresa:['', Validators.required],
      calleEmpresa:['', Validators.required],
      coloniaEmpresa:['', Validators.required],
      municipioEmpresa:['', Validators.required],
      estadoEmpresa:['', Validators.required],
      nombreusuario:['', Validators.required],
      telefonoUsuario:['', [Validators.required, Validators.minLength(10)]],
      calleUsuario:['', Validators.required],
      coloniaUsuario:['', Validators.required],
      numCasUsuario:['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  registrar() {
    const email = this.registrarUsuario.value.email;
    const password = this.registrarUsuario.value.password;
    const repetirPassowrd = this.registrarUsuario.value.repetirPassword;
    if (password !== repetirPassowrd) {
      this.firebase.extra(
        'Las contraseñas ingresadas deben ser las mismas',
        'Contraseña distintas',
        'warning'
      );
      return;
    }
    this.empresa.nombre = this.registrarUsuario.value.nombreEmpresa;
        this.empresa.id = this.fireStore.createId();
      this.empresa.calle = this.registrarUsuario.value.calleEmpresa;
      this.empresa.colonia = this.registrarUsuario.value.coloniaEmpresa;
      this.empresa.estado = this.registrarUsuario.value.estadoEmpresa;
      this.empresa.municipio = this.registrarUsuario.value.municipioEmpresa;
      this.empresa.telefono = this.registrarUsuario.value.telefonoEmpresa;
      
      this.usuarios.calleUsuario = this.registrarUsuario.value.calleUsuario;
      this.usuarios.coloniaUsuario = this.registrarUsuario.value.coloniaUsuario;
      this.usuarios.correoUsuario = this.registrarUsuario.value.email;
      this.usuarios.nombreUsuario = this.registrarUsuario.value.nombreusuario;
      this.usuarios.numCasUsuario = this.registrarUsuario.value.numCasUsuario;
      this.usuarios.passUsuario = this.registrarUsuario.value.password;
      this.usuarios.rolUsuario = "ADMINISTRADOR";
      this.usuarios.telefonoUsuario = this.registrarUsuario.value.telefonoUsuario;
      this.usuarios.idVeterinaria = this.empresa.id;
      this.usuarios.clavUsuario = this.fireStore.createId();

    this.loading = true;
    this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((user) => {
        this.agregarEmpresa();
        
        
      })
      .catch((error) => {
        this.loading = false;
        this.firebase.codeError(error.code);
      });

  }

  async consultarEmpresas(){
    
  }

  async agregarEmpresa(){

     await this.firebase.agregarEmpresa(this.empresa).then(()=>{
      this.agregarUsuario();
      })
      .catch((err) => {
        this.firebase.error("Existe un problema al registrar el proveedor")
    })
  }

  async agregarUsuario(){
    await this.firebase.agregarUsuariosNuevo(this.usuarios).then(()=>{
      this.verificarCorreo();
    }).catch((err) => {
      this.firebase.error("Existe un problema al registrar el proveedor")
  })
  }

  verificarCorreo() {
    this.afAuth.currentUser
      .then((user) => user?.sendEmailVerification())
      .then(() => {
        this.firebase.extra(
          'Le enviamos un correo electronico para su verificacion, revise en spam o correos no deseados',
          'verificar correo',
          'info'
        );
        this.router.navigate(['/login']);
      });
  }

}
