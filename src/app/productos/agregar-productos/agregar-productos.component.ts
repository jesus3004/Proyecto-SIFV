import { DecimalPipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import {
  agregarProductos,
  caducidad,
  lotes,
  provedores,
} from '../../interfaz/interfas';
import { ProductosService } from '../../Servicies/productos.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { now } from 'mongoose';
import { FormControl, Validators } from '@angular/forms';

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
  equivalencia = false;
  datosLotes: lotes = {
    numeroDeLote: '',
    existencia: 0,
    fechaDecaducidad: '',
    stockMinimo: 0
  };

  folioFormControl = new FormControl('', [Validators.required]);
  codigoDeBarras = new FormControl('', [Validators.required]);
  nombrePorducto = new FormControl('', [Validators.required]);
  provedor = new FormControl('', [Validators.required]);
  formaDeventa = new FormControl('', [Validators.required]);
  precioPorUnidad = new FormControl('', [Validators.required]);
  precioPorPieza = new FormControl('', [Validators.required]);
  costoDeCompra = new FormControl('', [Validators.required]);
  descripcion = new FormControl('', [Validators.required]);
  marca = new FormControl('', [Validators.required]);
  stockMinimo = new FormControl('', [Validators.required]);

  datosProductos: agregarProductos = {
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
    mesesDeAnticipacion: 0,
    equivalenciaPieza: 0,
    existen: 0
  };

  limpiar: lotes = {
    fechaDecaducidad: '',
    numeroDeLote: '',
    existencia: 0,
    stockMinimo: 0
  };

  limpiar2: agregarProductos = {
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
    mesesDeAnticipacion: 0,
    equivalenciaPieza: 0,
    existen: 0
  };

  caducar: caducidad = {
    codigoDeBarras: '',
    nombrePorducto: '',
    provedor: '',
    costoDeCompra: 0,
    fechaDecaducidad: '',
    numeroDeLote: '',
    existencia: 0,
    truc: 0,
    fechaAnticipacion: ''
  };

  agregar = true;
  editar = false;
  // displayedColumns: string[] = ['codigo', 'Nombre', 'Provedor', 'Lote', 'Fecha', 'Forma de Venta', 'Precio p/u', 'Precio p/p', 'Costo', 'Existencia','acciones'];
  //dataSource = this.lista_Productos;

  displayedColumns: string[] = [
    'codigo',
    'nombre',
    'provedor',
    'precioPU',
    'precioPP',
    'costo',
    'controles',
  ];

  pAgeIndex = 0;

  dataSource: MatTableDataSource<agregarProductos>;

  constructor(private firebase: ProductosService) {
    console.log(this.historialProductos);
    this.dataSource = new MatTableDataSource(this.historialProductos);
  }

  fecha:Date = new Date();
  ngOnInit() {
    this.listaProvedores();
    this.listaProductos();
  }

  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  a1: string = '';
  a2: string = '';
  a3: number = 0;
  a4: number = 0;
  a5: number = 0;
  async agregarProducto() {
    this.datosProductos.existen = this.datosLotes.existencia * this.datosProductos.equivalenciaPieza;
    this.datosLotes.existencia = this.datosLotes.existencia * this.datosProductos.equivalenciaPieza;
    this.a1 = this.datosLotes.fechaDecaducidad.slice(5, 7);
    this.a4 = +this.a1;
    this.a4 = this.datosProductos.mesesDeAnticipacion;
    this.a5 = this.a3 - this.a4;
    if (this.a5 == 0) {
      this.a1 = this.datosLotes.fechaDecaducidad.slice(0, 4);
      this.a4 = +this.a1;
      this.a4 = this.a4 - 1;
      this.a1 = this.datosLotes.fechaDecaducidad.slice(8, 10);
      this.a3 = +this.a1;
      if (this.a3 == 31) {
        this.a2 = this.a4 + '-12-30';
      } else {
        this.a2 =
          this.a4 + '-12-' + this.a1;
      }
      this.datosLotes.fechaAnticipacion = this.a2;
    } else {
      if (this.a5 == -1) {
        this.a1 = this.datosLotes.fechaDecaducidad.slice(0, 4);
        this.a4 = +this.a1;
        this.a4 = this.a4 - 1;
        this.a1 = this.datosLotes.fechaDecaducidad.slice(8, 10);
        this.a3 = +this.a1;
        if (this.a3 == 31) {
          this.a2 = this.a4 + '-11-30';
        } else {
          this.a2 = this.a4 + '-11-' + this.a1;
        }
        this.datosLotes.fechaAnticipacion = this.a2;
      } else {
        if (this.a5 == -2) {
          this.a1 = this.datosLotes.fechaDecaducidad.slice(0, 4);
          this.a4 = +this.a1;
          this.a4 = this.a4 - 1;
          this.a1 = this.datosLotes.fechaDecaducidad.slice(8, 10);
          this.a3 = +this.a1;
          if (this.a3 == 31) {
            this.a2 = this.a4 + '-10-30';
          } else {
            this.a2 = this.a4 + '-10-' + this.a1;
          }
          this.datosLotes.fechaAnticipacion = this.a2;
        } else {
          if (this.a5 != 2) {
            this.a1 = this.datosLotes.fechaDecaducidad.slice(8, 10);
            this.a3 = +this.a1;
            if (this.a3 == 31) {
              if (this.a5 < 10) {
                this.a2 =this.datosLotes.fechaDecaducidad.slice(0, 4) +'-0' +this.a5 +'-30';
              } else {
                this.a2 = this.datosLotes.fechaDecaducidad.slice(0, 4) +'-' +this.a5 +'-30';
              }
              this.a2 = this.datosLotes.fechaDecaducidad.slice(0, 4) +'-' +this.a5 +'-30';
            } else {
              if (this.a5 < 10) {
                this.a2 =this.datosLotes.fechaDecaducidad.slice(0, 4) +'-0' +this.a5 +'-'+this.a1;
              } else {
                this.a2 = this.datosLotes.fechaDecaducidad.slice(0, 4) +'-' +this.a5 +'-'+this.a1;
              }
            }
            this.datosLotes.fechaAnticipacion = this.a2;
          } else {
            this.a1 = this.datosLotes.fechaDecaducidad.slice(8, 10);
            this.a3 = +this.a1;
            if (this.a3 > 28) {
              this.a2 = this.datosLotes.fechaDecaducidad.slice(0, 4) +'-0' +this.a5 +'-25';
            } else {
              this.a2 = this.datosLotes.fechaDecaducidad.slice(0, 4) +'-0' +this.a5 +'-' +this.a1;
            }
            this.datosLotes.fechaAnticipacion = this.a2;
          }
        }
      }
    }
    if(this.validarfechas()){
      await this.firebase
      .agregarProductos(this.datosProductos)
      .then(() => {
        this.agregarLotes();
      })
      .catch((err) => {
        this.firebase.error(
          'Existe un problema al momento de registrar el producto'
        );
      });
    }else{
      this.firebase.extra(
        'La fecha no puede ser menor a 3 meses',
        'Fecha muy corta',
        'warning'
      );
    }
    
  }

  validarfechas():boolean{
    let respuesta = true;
    this.a1 = this.datosLotes.fechaDecaducidad.slice(0, 4);
    this.a3 = +this.a1;
    this.a4 = +this.fecha.getFullYear();
    this.a5 = this.a3 - this.a4;
    if (this.a5 > 0) {
      this.a1 = this.datosLotes.fechaDecaducidad.slice(5, 7);
    this.a4 = +this.a1;
    this.a4 = +this.fecha.getMonth();
    this.a5 = this.a3 - this.a4;
      if(this.a5 <= 0){
        respuesta=false;  
      }
    }else{
      if(this.a5 == 0){
        this.a1 = this.datosLotes.fechaDecaducidad.slice(5, 7);
        this.a4 = +this.a1;
        this.a4 = +this.fecha.getMonth();
        this.a5 = this.a3 - this.a4;
          if(this.a5 <= 0){
            respuesta=false;  
          }
      }else{
        respuesta = false;
      }
    } 
      return respuesta;
  }

  cambios(event: Event) {
    const consulta = (event.target as HTMLInputElement).value;
    if (consulta == 'Ambos') {
      this.unitario = true;
      this.pieza = true;
      this.equivalencia = true;
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
        this.agregarAcaducidad();
        this.firebase.exito('El producto ha sido registrado con exito');
      })
      .catch((err) => {
        this.firebase.error(
          'Existe un problema al momento de registrar el lote'
        );
      });
  }

  async listaProductos() {
    (await this.firebase.obtenerProductos()).subscribe((res) => {
      this.historialProductos = res;
      this.dataSource = new MatTableDataSource(this.historialProductos);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      console.log(this.dataSource);
    });
  }

  async listaProvedores() {
    (await this.firebase.obtenerProbedor()).subscribe((res) => {
      this.historialProvedores = res;
      console.log(this.historialProvedores);
    });
  }

  async borrarProducto(lista: agregarProductos) {
    const valor = await this.firebase.borrar(
      'Estas apunto de borrar un producto'
    );
    if (valor) {
      await this.firebase
        .eliminarProducto(lista.codigoDeBarras)
        .then(() => {
          this.firebase.exitoB('El producto ha sido eliminado con exito');
        })
        .catch((err) => {
          this.firebase.error('Existe un problema al borrar este producto');
        });
    }
  }

  async agregarAcaducidad() {
    this.caducar.codigoDeBarras = this.datosProductos.codigoDeBarras;
    this.caducar.costoDeCompra = this.datosProductos.costoDeCompra;
    this.caducar.provedor = this.datosProductos.provedor;
    this.caducar.nombrePorducto = this.datosProductos.nombrePorducto;
    this.caducar.numeroDeLote = this.datosLotes.numeroDeLote;
    this.caducar.fechaDecaducidad = this.datosLotes.fechaDecaducidad;
    this.caducar.existencia = this.datosLotes.existencia;
    
    (await this.firebase
      .Acaducir(this.caducar)
      .then(() => {
        this.datosLotes = this.limpiar;
        this.datosProductos = this.limpiar2;
      })
      .catch((err) => {
        this.firebase.error(
          'Existe un problema al momento de registrar el lote'
        );
      }));
  }
}
