import { Component, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ProductosService } from '../Servicies/productos.service';


@Component({
  selector: 'app-iniciar-sesion',
  templateUrl: './iniciar-sesion.component.html',
  styleUrls: ['./iniciar-sesion.component.css']
})
export class IniciarSesionComponent implements OnInit {

  
  
  constructor(private router:Router, private firebase:ProductosService) { }

  entrar(){
    var usuario = (<HTMLInputElement>document.getElementById('usuario')).value;
    var contra = (<HTMLInputElement>document.getElementById('contra')).value;
      if(usuario == 'jesus@gmail.com'){
        if(contra=='12345'){
        this.router.navigate(['/inicio'])
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

}
