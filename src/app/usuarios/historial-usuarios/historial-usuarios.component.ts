import { Component, OnInit } from '@angular/core';
import { usuarios } from '../../interfaz/interfas';
import { ProductosService } from '../../Servicies/productos.service';

@Component({
  selector: 'app-historial-usuarios',
  templateUrl: './historial-usuarios.component.html',
  styleUrls: ['./historial-usuarios.component.css']
})
export class HistorialUsuariosComponent implements OnInit {

  constructor(private firebase:ProductosService) { 

  }

  auxilia:usuarios [] = [];
  idVeterinaria = "";
  listaUsuarios:usuarios [] = []
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
  
  async ngOnInit(){
    (await this.firebase.obtenerUsuarios()).subscribe((res) => {
      this.idVeterinaria = this.firebase.usuarioArray.idVeterinaria;
      this.auxilia = res;
      this.listaUsuarios = this.auxilia.filter(x => x.idVeterinaria == this.idVeterinaria)
    });
  }
  public tarjet: boolean = true

  
  abrir(usuari:usuarios) {
    this.usuarios = usuari
   this.tarjet = false
  }
  
  cerrar(){
    this.tarjet = true
  }

  async agregar(){
    await this.firebase.agregarUsuarios(this.usuarios).then(()=>{
      this.firebase.exito('Usuario modificado con exito')
      })
      .catch((err) => {
        console.log(err)
        this.firebase.error("Existe un problema al modificar el Usuario")
    })
  }

  async borrar(clave:string){
    const valor = await this.firebase.borrar('Estas apunto de borrar un usuario')
        if(valor){
          await this.firebase
      .eliminarProvedor(clave)
      .then(() => {
        this.firebase.exitoB('El usuario ha sido eliminado con exito')
      })
      .catch((err) => {
        this.firebase.error("Existe un problema al borrar este producto")
      });
        }
    
  }
}
