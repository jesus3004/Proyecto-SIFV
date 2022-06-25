import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { caducidad } from '../productos-caducar/interfaz/interfas';
import { ProductosService } from '../Servicies/productos.service';

@Component({
  selector: 'app-productos-caducados',
  templateUrl: './productos-caducados.component.html',
  styleUrls: ['./productos-caducados.component.css']
})
export class ProductosCaducadosComponent implements OnInit {

  listaproductos:caducidad [] =[]
  dataSource: MatTableDataSource<caducidad>;

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
      this.listaproductos = res
      this.dataSource = new MatTableDataSource(this.listaproductos.filter(x => x.truc == 2));
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
