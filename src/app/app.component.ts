import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
  
})
export class AppComponent {
  title = 'proyecto';
  mostrarInicio = false;
  mostrarIniciarSesion = true; 

  verifirificar(){
    if(this.mostrarInicio==false){
      this.mostrarInicio = true;
      this.mostrarIniciarSesion = false; 
    }else{
      this.mostrarInicio = false;
    }
  }
}

