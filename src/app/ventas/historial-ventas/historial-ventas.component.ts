import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { detalleDeventas, ventas } from '../../interfaz/interfas';
import { ProductosService } from '../../Servicies/productos.service';

@Component({
  selector: 'app-historial-ventas',
  templateUrl: './historial-ventas.component.html',
  styleUrls: ['./historial-ventas.component.css']
})
export class HistorialVentasComponent implements OnInit {

  historialProductos:detalleDeventas[]=[];
  historialventas:ventas[] = []
  displayedColumns: string[] = ['barra', 'nombre','lote','fecha', 'precio','cantidad', 'total'];
  displayedColumns2: string[] = ['folio', 'fecha','total','cant','controles'];
  
  auxiliar:any
  axuliar2:any
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
  dataSource1: MatTableDataSource<ventas>;
  @ViewChild(MatPaginator, {static:false})paginator!:MatPaginator
  @ViewChild(MatSort)sort!:MatSort
  constructor(private firebase:ProductosService, private formbuild:FormBuilder) { 
    this.dataSource = new MatTableDataSource(this.historialProductos);
    this.dataSource1 = new MatTableDataSource(this.historialventas);
  }

  ngOnInit(): void {
    this.listaDeventas()
  }

  public tarjet: boolean = true

  abrir() {
   this.tarjet = false
  }
  
  cerrar(){
    this.tarjet = true
  }

  async listaVentas(clave:string){
    console.log("Entra aqui con la clave: "+ clave);
    (await this.firebase.obtenerDetalleVenta(clave)).subscribe((res) => {
      this.axuliar2 = res
      console.log(res)
      this.historialProductos = this.axuliar2
      this.dataSource = new MatTableDataSource(this.historialProductos);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.abrir()
    });
  }

  async listaDeventas(){
    (await this.firebase.obtenerVenta()).subscribe((res) => {
      this.auxiliar = res
      this.historialventas = this.auxiliar
      this.dataSource1 = new MatTableDataSource(this.historialventas);
        this.dataSource1.paginator = this.paginator;
        this.dataSource1.sort = this.sort;
        
    });
  }
}
