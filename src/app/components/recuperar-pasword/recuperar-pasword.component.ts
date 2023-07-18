import { Component, Input, OnInit, Output } from '@angular/core';
import * as EventEmitter from 'events';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { empresa, usuarios } from 'src/app/interfaz/interfas';
import { ProductosService } from 'src/app/Servicies/productos.service';


@Component({
  selector: 'app-recuperar-pasword',
  templateUrl: './recuperar-pasword.component.html',
  styleUrls: ['./recuperar-pasword.component.css']
})
export class RecuperarPaswordComponent implements OnInit {
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
  constructor(
    private fb: FormBuilder,
    private afAuth: AngularFireAuth,
    private router: Router,
    private firebase:ProductosService
  ) { 

    this.recuperarUsuario = this.fb.group({
      correo: ['', [Validators.required, Validators.email]],
    });
  }

  recuperarUsuario: FormGroup;
  loading: boolean = false;

  ngOnInit(): void {
  }

  recuperar() {
    const email = this.recuperarUsuario.value.correo;

    this.loading = true;
    this.afAuth
      .sendPasswordResetEmail(email)
      .then(() => {
       
        this.router.navigate(['/login']);
      })
      .catch((error) => {
        this.loading = false;
        
      });
  }

}
