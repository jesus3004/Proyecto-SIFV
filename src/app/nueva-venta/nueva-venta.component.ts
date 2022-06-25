import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { threadId } from 'worker_threads';
import { agregarProductos, detalleDeventas, lotes, ventas } from '../productos-caducar/interfaz/interfas';
import { ProductosService } from '../Servicies/productos.service';

@Component({
  selector: 'app-nueva-venta',
  templateUrl: './nueva-venta.component.html',
  styleUrls: ['./nueva-venta.component.css']
})
export class NuevaVentaComponent implements OnInit {

  fechaHoy:any = new Date('YYYY-MM-DD')
  historialProductos:detalleDeventas[]=[];
  claveVenta:string = 'Vent-6'
  historialLotes:lotes [] =[]
  productos:agregarProductos[]=[]
  displayedColumns: string[] = ['barra', 'nombre','lote','fecha', 'precio','cantidad', 'total','controles'];
  auxiliar:any
  axuliar2:any
  total:number = 0
  nombreDelProducto:any
  articulos:number = 0
  existencia:any
  datosRepetidosLotes:lotes ={
    fechaDecaducidad: '',
    numeroDeLote: '',
    existencia: 0
  }
  ventas:ventas = {
    claveDeVenta: '',
    totaldeventa: 0,
    fecha: this.fechaHoy,
    cantidadArticulos: 0
  }
  detalleVenta:detalleDeventas = {
    cantidad: 0,
    total: 0,
    precio: 0,
    nombre: '',
    fechaDecaducidad: '',
    numeroDeLote: '',
    claveproducto: ''
  }


  dataSource: MatTableDataSource<detalleDeventas>;
  @ViewChild(MatPaginator, {static:false})paginator!:MatPaginator
  @ViewChild(MatSort)sort!:MatSort
  constructor(private firebase:ProductosService, private formbuild:FormBuilder) { 
    this.dataSource = new MatTableDataSource(this.historialProductos);
  }

  ngOnInit(): void {
  }

  async agregarProductosAVenta(){
    this.detalleVenta.total = this.detalleVenta.precio*this.detalleVenta.cantidad
    this.total = this.total + this.detalleVenta.total
    this.articulos = this.articulos + this.detalleVenta.cantidad
    this.detalleVenta.nombre = this.nombreDelProducto
    await this.firebase
      .agregarDetalleVeta(this.claveVenta, this.detalleVenta)
      .then(() => {
        this.listaVentas()
      })
      .catch((err) => {
        this.firebase.error("Existe un problema al al agregar el producto")
      });
  }

  async agregarAVenta(){
    this.ventas.claveDeVenta = this.claveVenta
    this.ventas.cantidadArticulos=this.articulos
    this.ventas.totaldeventa = this.total
    this.ventas.fecha = '02/05/2022'
    await this.firebase
      .agregarVeta(this.ventas)
      .then(() => {
        this.firebase.exito('Venta registrada con exito')
      })
      .catch((err) => {
        this.firebase.error("Existe un problema al finalizar la venta")
      });
  }

  async listaVentas(){
    (await this.firebase.obtenerDetalleVenta(this.claveVenta)).subscribe((res) => {
      this.axuliar2 = res
      this.historialProductos = this.axuliar2
      this.dataSource = new MatTableDataSource(this.historialProductos);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        let auxiliar3:detalleDeventas = {
          cantidad: 0,
          total: 0,
          precio: 0,
          nombre: '',
          fechaDecaducidad: '',
          claveproducto: '',
          numeroDeLote: ''
        }
        this.detalleVenta = auxiliar3
    });
  }
  async buscarP(event:Event){
    const Query = (event.target as HTMLInputElement).value;
    console.log(Query);
    (await this.firebase.buscarProductos(Query)).subscribe((res) => {
      this.auxiliar = res
      this.nombreDelProducto = this.auxiliar.nombrePorducto
      this.productos = this.auxiliar
      this.detalleVenta.precio = this.auxiliar.precioPorUnidad
      this.listaLotes(Query);
    });
  }

  buscarLotes(event:Event){
    const Query = (event.target as HTMLInputElement).value;
    let valor = Query
    this.historialLotes.find((element) =>  {
     if(element.numeroDeLote == valor){
      this.detalleVenta.fechaDecaducidad = element.fechaDecaducidad
      this.existencia = element.existencia
    } 
    })

    
  }


  async listaLotes(dato:string){
    (await this.firebase.obtenerLotes(dato)).subscribe((res) => {
      this.historialLotes = res
    });
  }

  cambios(event: Event) {
    const consulta = (event.target as HTMLInputElement).value;
      if (consulta == 'Pieza') {
        this.detalleVenta.precio = this.auxiliar.precioPorPieza
        console.log(this.auxiliar.precioPorPieza)
      }
      if (consulta == 'Unidad') {
        this.detalleVenta.precio = this.auxiliar.precioPorUnidad
        console.log(this.auxiliar.precioPorUnidad)
      }
  }

  async eliminar(lote:string , detVen:detalleDeventas){
    this.total = this.total - detVen.total
    this.ventas.totaldeventa = this.total
    await this.firebase
    .eliminarDeVenta(this.claveVenta, lote)
    .then(() => {
      this.listaVentas()
    })
    .catch((err) => {
      
    });
  }
}
