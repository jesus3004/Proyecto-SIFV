import { Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import { caducidad, lotes } from '../../interfaz/interfas';
import { ProductosService } from '../../Servicies/productos.service';
import { FormBuilder } from '@angular/forms';
export interface PeriodicElement {
  ID: number;
  Nombre: string;
  Lote: number;
  Fecha:string;
  Existencia:number;
  Precio:number;
}

@Component({
  selector: 'app-productos-caducar',
  templateUrl: './productos-caducar.component.html',
  styleUrls: ['./productos-caducar.component.css']
})
export class ProductosCaducarComponent implements OnInit  {

  listaproductos:lotes [] =[]
  dataSource: MatTableDataSource<lotes>;
  auxiliar:any;

  constructor(private firebase:ProductosService, private formbuild:FormBuilder) { 
    this.dataSource = new MatTableDataSource(this.listaproductos);}

  ngOnInit(): void {
    this.historial()
  }
  @ViewChild(MatPaginator, {static:false})paginator!:MatPaginator
  @ViewChild(MatSort)sort!:MatSort
  
  displayedColumns: string[] = ['ID', 'Nombre', 'provedor' ,'Lote', 'Fecha', 'Existencia', 'Precio'];
 
  async historial(){
    (await this.firebase.caducir()).subscribe((res) => {
      this.auxiliar = res;
      this.listaproductos = this.auxiliar;
      this.dataSource = new MatTableDataSource(this.listaproductos.filter(x => x.caducidad == 1));
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  
}
