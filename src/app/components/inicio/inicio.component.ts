import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { agregarProductos, caducidad, lotes, ventas } from '../../interfaz/interfas';
import { ProductosService } from '../../Servicies/productos.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent {
  usuario = 'JESUS';
  fecha = (new Date()).getTime();

  listaproductos:caducidad [] =[];
  listaDeventas:ventas [] = [];
  listaDetodosLosproductos:agregarProductos [] = [];
  dataSource: MatTableDataSource<caducidad>;
  dataSource2: MatTableDataSource<caducidad>;
  dataSource3: MatTableDataSource<agregarProductos>;
  auxilar:any;
  axiliarParaBorrar:agregarProductos = {
    codigoDeBarras: '',
    nombrePorducto: '',
    provedor: '',
    formaDeventa: '',
    precioPorUnidad: 0,
    precioPorPieza: 0,
    costoDeCompra: 0,
    descripcion: '',
    marca: '',
    stockMinimo: 0,
    existen: 0,
    equivalenciaPieza: 0,
    mesesDeAnticipacion: 0
  };
  fechaDeHoy:Date = new Date();

  anio:number=0;
  mes:number = 0;
  dia:number = 0;
  anio2:number=0;
  mes2:number = 0;
  dia2:number = 0;
  anio3:number=0;
  mes3:number = 0;
  dia3:number = 0;
  constructor(private firebase:ProductosService, private formbuild:FormBuilder) { 
    this.dataSource = new MatTableDataSource(this.listaproductos);
    this.dataSource2 = new MatTableDataSource(this.listaproductos);
    this.dataSource3 = new MatTableDataSource(this.listaDetodosLosproductos);
  }

  ngOnInit(): void {
    this.ventasVeterinaria();
    this.estatusDeLosProductos();
    this.historial();
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
      this.auxilar = res
      this.listaproductos = this.auxilar
      this.dataSource = new MatTableDataSource(this.listaproductos.filter(x => x.truc == 1));
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.caducar = this.listaproductos.    filter(x => x.truc == 1).length
        this.caducados = this.listaproductos.filter(x => x.truc == 2).length
        
    });
  }

  async historialDetodosLosproductos(){
    (await this.firebase.caducir()).subscribe((res) => {
      this.auxilar = res
      this.listaproductos = this.auxilar
      this.bajosStock()
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  bajosStock(){
    this.dataSource3 = new MatTableDataSource(this.listaDetodosLosproductos.filter(x => x.existen <= x.stockMinimo));
        this.dataSource2.paginator = this.paginator;
        this.dataSource2.sort = this.sort;
        this.tolPro = this.listaDetodosLosproductos.filter(x => x.existen <= x.stockMinimo).length
  }

  estatusDeLosProductos(){
      this.listaproductos.find(element => {
        this.dia = +this.fechaDeHoy.getDate();
        this.mes = +this.fechaDeHoy.getMonth();
        this.anio = +this.fechaDeHoy.getFullYear();
        this.dia2 = +element.fechaAnticipacion.slice(8,10);
        this.mes2 = +element.fechaAnticipacion.slice(5,7);
        this.anio2 = +element.fechaAnticipacion.slice(0,4);
        this.dia3 = +element.fechaDecaducidad.slice(8,10);
        this.mes3 = +element.fechaDecaducidad.slice(5,7);
        this.anio3 = +element.fechaDecaducidad.slice(0,4);
        if(this.anio>=this.anio2 && this.anio<=this.anio3){
            if(this.mes>=this.mes2 && this.mes<=this.mes3){
              if(this.dia>=this.dia2 && this.dia<=this.dia3){
                this.cambiarAProximoACaducar(element);
              }else{
                if(this.dia>this.dia3){
                  this.cambiarACaducar(element);
                }
              }
            }else{
              if(this.mes>this.mes3){
                this.cambiarACaducar(element);
              }
            }
        }else{
          if(this.anio>this.mes3){
            this.cambiarACaducar(element);
          }
          
        }
      })
  }

  async cambiarACaducar(elemento:caducidad){
      (await this.firebase.eliminarLote(elemento.codigoDeBarras, elemento.numeroDeLote).then(() => {
      })
      .catch((err) => {
        this.firebase.error(
          'Existe un problema al momento de registrar el lote'
        );
      }));

      elemento.truc = 2;
      (await this.firebase.Acaducir(elemento).then(() => {
      })
      .catch((err) => {
        this.firebase.error(
          'Existe un problema al momento de registrar el lote'
        );
      }));

      this.listaDetodosLosproductos.find(x => {
        if(x.codigoDeBarras == elemento.codigoDeBarras){
            x.existen = x.existen - elemento.existencia;
          this.axiliarParaBorrar = x;
        }
      });

      (await this.firebase.agregarProductos(this.axiliarParaBorrar).then(() => {
      })
      .catch((err) => {
        this.firebase.error(
          'Existe un problema al momento de registrar el lote'
        );
      }));
  }

  async cambiarAProximoACaducar(element:caducidad){
    element.truc = 2;
    (await this.firebase.Acaducir(element).then(() => {
    })
    .catch((err) => {
      this.firebase.error(
        'Existe un problema al momento de registrar el lote'
      );
    }));
  }
  async ventasVeterinaria(){
    (await this.firebase.obtenerVenta()).subscribe((res) => {
      this.auxilar = res
      this.listaDeventas = this.auxilar
      this.listaDeventas.find(x => {
        if(x.totaldeventa>0){
          this.ventas=x.totaldeventa+this.ventas;
        }
      });
    });
  }
}
