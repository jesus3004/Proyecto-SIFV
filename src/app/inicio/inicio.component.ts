import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { caducidad } from '../productos-caducar/interfaz/interfas';
import { ProductosService } from '../Servicies/productos.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent {
  usuario = 'JESUS';
  fecha = (new Date()).getTime();

  listaproductos:caducidad [] =[]
  dataSource: MatTableDataSource<caducidad>;
  dataSource2: MatTableDataSource<caducidad>;

  constructor(private firebase:ProductosService, private formbuild:FormBuilder) { 
    this.dataSource = new MatTableDataSource(this.listaproductos);
    this.dataSource2 = new MatTableDataSource(this.listaproductos);
  }

  ngOnInit(): void {
    this.historial()
  }
  @ViewChild(MatPaginator, {static:false})paginator!:MatPaginator
  @ViewChild(MatSort)sort!:MatSort
  caducar:number = 0
  ventas:number = 0
  caducados:number =0;
  tolPro:number = 0
  displayedColumns: string[] = ['ID', 'Nombre', 'provedor' ,'Lote', 'Fecha', 'Existencia', 'Precio'];
  displayedColumns2: string[] = ['ID', 'Nombre', 'provedor' , 'Precio'];
 
  async historial(){
    (await this.firebase.caducir()).subscribe((res) => {
      this.listaproductos = res
      this.dataSource = new MatTableDataSource(this.listaproductos.filter(x => x.truc == 1));
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.caducar = this.listaproductos.filter(x => x.truc == 1).length
        this.caducados = this.listaproductos.filter(x => x.truc == 2).length
        this.tolPro = this.listaproductos.filter(x => x.existencia == 1).length
        this.ventas=430
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  bajosStock(){
    this.dataSource2 = new MatTableDataSource(this.listaproductos.filter(x => x.existencia == 1));
        this.dataSource2.paginator = this.paginator;
        this.dataSource2.sort = this.sort;
  }
}
