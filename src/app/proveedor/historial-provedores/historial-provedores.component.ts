import { Component, OnInit } from '@angular/core';
import { provedores } from '../../interfaz/interfas';
import { ProductosService } from '../../Servicies/productos.service';

@Component({
  selector: 'app-historial-provedores',
  templateUrl: './historial-provedores.component.html',
  styleUrls: ['./historial-provedores.component.css']
})
export class HistorialProvedoresComponent implements OnInit {

  constructor(private firebase:ProductosService) { }

  historialProvedores:provedores [] = [];
  proveedores:provedores = {
    clavProvedor: '',
    nombreProvedor: '',
    telefonoProvedor: '',
    correoProvedor: '',
    empresaProvedor: '',
    calleProvedor: '',
    coloniaProvedor: '',
    estadoProvedor: '',
    telEmProvedor: ''
  }

  
  

  async ngOnInit() {
    (await this.firebase.obtenerProbedor()).subscribe((res) => {
      console.log(res)
      this.historialProvedores = res;
    });
  }
  public tarjet: boolean = true
  abrir(provedore:provedores) {
    this.proveedores = provedore;
   this.tarjet = false
  }
  
  cerrar(){
    this.tarjet = true
  }

  async agregar(){
    await this.firebase.agregarProbedor(this.proveedores).then(()=>{
      this.firebase.exito('Proveedor modificado con exito')
      })
      .catch((err) => {
        console.log(err)
        this.firebase.error("Existe un problema al modificar el Proveedor")
    })
  }


  async borrar(clave:string){
    const valor = await this.firebase.borrar('Estas apunto de borrar un proveedor')
        if(valor){
          await this.firebase
      .eliminarProvedor(clave)
      .then(() => {
        this.firebase.exitoB('El proveedor ha sido eliminado con exito')
      })
      .catch((err) => {
        this.firebase.error("Existe un problema al borrar este producto")
      });
        }
    
  }
}
