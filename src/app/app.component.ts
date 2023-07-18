import { Component } from '@angular/core';
import { usuarios } from './interfaz/interfas';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
  
})
export class AppComponent {
  title = 'proyecto';
  mostrarInicio = false;
  mostrarIniciarSesion = true; 
  usuarioEntrada:usuarios={
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

  verifirificar(){
    if(this.mostrarInicio==false){
      this.mostrarInicio = true;
      this.mostrarIniciarSesion = false; 
    }else{
      this.mostrarInicio = false;
    }
  }
}

