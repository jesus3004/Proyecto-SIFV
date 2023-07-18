import { Component, Input, OnInit, Output } from '@angular/core';
import * as EventEmitter from 'events';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { empresa, usuarios } from 'src/app/interfaz/interfas';
import { ProductosService } from 'src/app/Servicies/productos.service';


@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {
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
  constructor() { }

  ngOnInit(): void {
  }

}
