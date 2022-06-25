import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { agregarProductos, lotes, provedores } from '../productos-caducar/interfaz/interfas';
import { ProductosService } from '../Servicies/productos.service';

@Component({
  selector: 'app-historial-productos',
  templateUrl: './historial-productos.component.html',
  styleUrls: ['./historial-productos.component.css']
})
export class HistorialProductosComponent implements OnInit {

  historialProductos: agregarProductos[] = [];
  historialProvedores: provedores[] = [];
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
  };
  displayedColumns: string[] = ['codigo','nombre','provedor', 'precioPU', 'precioPP', 'costo', 'controles'];
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

  async agregarLotes() {
    await this.firebase
      .agregarLote(this.datosLotes, this.datosProductos)
      .then(() => {
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
    });
  }

  async listaProvedores() {
    (await this.firebase.obtenerProbedor()).subscribe((res) => {
      this.historialProvedores = res;
      console.log(this.historialProvedores);
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  
}
