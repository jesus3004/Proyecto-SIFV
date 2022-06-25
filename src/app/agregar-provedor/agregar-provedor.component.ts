import { Component, OnInit } from '@angular/core';
import { provedores } from '../productos-caducar/interfaz/interfas';
import { ProductosService } from '../Servicies/productos.service';

@Component({
  selector: 'app-agregar-provedor',
  templateUrl: './agregar-provedor.component.html',
  styleUrls: ['./agregar-provedor.component.css']
})
export class AgregarProvedorComponent implements OnInit {

  public mask = ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
  public masPro = ['P','R','O', ' ','-',' ',/\d/, /\d/, /\d/,/\d/, /\d/, /\d/]
  datosProvedores:provedores={
    clavProvedor: '',
    nombreProvedor: '',
    telefonoProvedor: '',
    correoProvedor: '',
    empresaProvedor: '',
    calleProvedor: '',
    coloniaProvedor: '',
    estadoProvedor: '',
    telEmProvedor: ''
  };
  
  constructor(private firebase:ProductosService) { }

  ngOnInit(): void {
  }

  async agregarProvedor(){
    await this.firebase.agregarProbedor(this.datosProvedores).then(()=>{
      this.firebase.exito('Proveedor registrado con exito')
      })
      .catch((err) => {
        this.firebase.error("Existe un problema al registrar el proveedor")
    })
  }
}
