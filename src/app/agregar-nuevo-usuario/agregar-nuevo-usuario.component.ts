import { Component, OnInit } from '@angular/core';
import { usuarios } from '../productos-caducar/interfaz/interfas';
import { ProductosService } from '../Servicies/productos.service';


@Component({
  selector: 'app-agregar-nuevo-Usuario',
  templateUrl: './agregar-nuevo-Usuario.component.html',
  styleUrls: ['./agregar-nuevo-Usuario.component.css']
})
export class AgregarNuevoUsuarioComponent implements OnInit {

  

  usuarios:usuarios = {
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

  constructor(private firebase:ProductosService) { }

  ngOnInit(): void {
  }

  async agregar(){
    await this.firebase.agregarUsuarios(this.usuarios).then(()=>{
      this.firebase.exito('Usuario registrado con exito')
      })
      .catch((err) => {
        console.log(err)
        this.firebase.error("Existe un problema al registrar el Usuario")
    })
  }
}
