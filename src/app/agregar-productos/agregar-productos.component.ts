import { DecimalPipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import {agregarProductos,caducidad,lotes,provedores} from '../productos-caducar/interfaz/interfas';
import { ProductosService } from '../Servicies/productos.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator,PageEvent } from '@angular/material/paginator';


@Component({
  selector: 'app-agregar-productos',
  templateUrl: './agregar-productos.component.html',
  styleUrls: ['./agregar-productos.component.css'],
})
export class AgregarProductosComponent implements OnInit {
  historialProductos: agregarProductos[] = [];
  historialProvedores: provedores[] = [];
  provedores: provedores = {
    clavProvedor: '',
    nombreProvedor: '',
    telefonoProvedor: '',
    correoProvedor: '',
    empresaProvedor: '',
    calleProvedor: '',
    coloniaProvedor: '',
    estadoProvedor: '',
    telEmProvedor: '',
  };
  unitario = false;
  pieza = false;
  datosLotes: lotes = {
    numeroDeLote: '',
    existencia: 0,
    fechaDecaducidad: '',
  };

  datosProductos: agregarProductos = {
    codigoDeBarras: '',
    nombrePorducto: '',
    provedor: '',
    formaDeventa: '',
    precioPorUnidad: 0,
    precioPorPieza: 0,
    costoDeCompra: 0,
    descripcion: '',
    marca: ''
  };

  limpiar:lotes = {
    fechaDecaducidad: '',
    numeroDeLote: '',
    existencia: 0
  }

  limpiar2:agregarProductos ={
    codigoDeBarras: '',
    nombrePorducto: '',
    provedor: '',
    formaDeventa: '',
    precioPorUnidad: 0,
    precioPorPieza: 0,
    costoDeCompra: 0,
    descripcion: '',
    marca: ''
  }

  caducar:caducidad ={
    codigoDeBarras: '',
    nombrePorducto: '',
    provedor: '',
    costoDeCompra: 0,
    fechaDecaducidad: '',
    numeroDeLote: '',
    existencia: 0,
    truc: 0
  } 
  
  agregar=true;
  editar=false;
  // displayedColumns: string[] = ['codigo', 'Nombre', 'Provedor', 'Lote', 'Fecha', 'Forma de Venta', 'Precio p/u', 'Precio p/p', 'Costo', 'Existencia','acciones'];
  //dataSource = this.lista_Productos;

  displayedColumns: string[] = ['codigo','nombre','provedor', 'precioPU', 'precioPP', 'costo', 'controles'];
 
  
  
  pAgeIndex=0;
  
  dataSource: MatTableDataSource<agregarProductos>;

  constructor(private firebase: ProductosService) {
    console.log(this.historialProductos)
    this.dataSource = new MatTableDataSource(this.historialProductos);
  }

  async ngOnInit(): Promise<void> {
    this.listaProvedores();
    this.listaProductos();
  }

@ViewChild(MatPaginator, {static:false})paginator!:MatPaginator
@ViewChild(MatSort)sort!:MatSort

  async agregarProducto() {
    await this.firebase
      .agregarProductos(this.datosProductos)
      .then(() => {
        this.agregarLotes();
      })
      .catch((err) => {
        this.firebase.error("Existe un problema al momento de registrar el producto")
      });
  }
  cambios(event: Event) {
    const consulta = (event.target as HTMLInputElement).value;
    if (consulta == 'Ambos') {
      this.unitario = true;
      this.pieza = true;
    } else {
      if (consulta == 'Pieza') {
        this.pieza = true;
        this.unitario = false;
      }
      if (consulta == 'Unidad') {
        this.unitario = true;
        this.pieza = false;
      }
    }
  }

  async agregarLotes() {
    await this.firebase
      .agregarLote(this.datosLotes, this.datosProductos)
      .then(() => {
        this.agregarAcaducidad()
        this.firebase.exito('El producto ha sido registrado con exito')
      })
      .catch((err) => {
        this.firebase.error("Existe un problema al momento de registrar el lote")
      });
  }

  async listaProductos() {
    (await this.firebase.obtenerProductos()).subscribe((res) => {
      this.historialProductos = res;
      this.dataSource = new MatTableDataSource(this.historialProductos);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      console.log(this.dataSource)
    });
  }

  async listaProvedores() {
    (await this.firebase.obtenerProbedor()).subscribe((res) => {
      this.historialProvedores = res;
      console.log(this.historialProvedores);
    });
  }

  async borrarProducto(lista:agregarProductos){
    const valor = await this.firebase.borrar('Estas apunto de borrar un producto')
        if(valor){
          await this.firebase
      .eliminarProducto(lista.codigoDeBarras)
      .then(() => {
        this.firebase.exitoB('El producto ha sido eliminado con exito')
      })
      .catch((err) => {
        this.firebase.error("Existe un problema al borrar este producto")
      });
        }
    
  }
  
  async agregarAcaducidad(){
    this.caducar.codigoDeBarras = this.datosProductos.codigoDeBarras
    this.caducar.costoDeCompra = this.datosProductos.costoDeCompra
    this.caducar.provedor = this.datosProductos.provedor
    this.caducar.nombrePorducto = this.datosProductos.nombrePorducto
    this.caducar.numeroDeLote = this.datosLotes.numeroDeLote
    this.caducar.fechaDecaducidad = this.datosLotes.fechaDecaducidad
    this.caducar.existencia = this.datosLotes.existencia
    if(this.datosLotes.fechaDecaducidad == '2022-06-10'){
      this.caducar.truc = 1
    }
    if(this.datosLotes.fechaDecaducidad == '2022-05-31'){
      this.caducar.truc = 2
    }
    await this.firebase
      .Acaducir(this.caducar)
      .then(() => {
        this.datosLotes = this.limpiar
        this.datosProductos = this.limpiar2
      })
      .catch((err) => {
        this.firebase.error("Existe un problema al momento de registrar el lote")
      });
  }
  
}
