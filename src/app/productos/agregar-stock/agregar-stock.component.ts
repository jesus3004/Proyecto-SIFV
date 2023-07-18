import { query } from '@angular/animations';
import { Component, OnInit, ViewChild, Type } from '@angular/core';

import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator,PageEvent } from '@angular/material/paginator';
import { FormBuilder, Validator, FormGroup, Validators } from '@angular/forms';
import { agregarProductos, lotes } from '../../interfaz/interfas';
import { ProductosService } from '../../Servicies/productos.service';

@Component({
  selector: 'app-agregar-stock',
  templateUrl: './agregar-stock.component.html',
  styleUrls: ['./agregar-stock.component.css']
})
export class AgregarStockComponent implements OnInit {

  historialLotes:lotes[]=[];
  datosRepetidosLotes:lotes ={
    fechaDecaducidad: '',
    numeroDeLote: '',
    existencia: 0,
    stockMinimo: 0
  }

  limpiarEspacioLotes:lotes = {
    fechaDecaducidad: '',
    numeroDeLote: '',
    existencia: 0,
    stockMinimo: 0
  }

 public validacion?:FormGroup = undefined

  activar2 = true;
  activar = true;
  editar = false;
  activarParaEditar = true;
  displayedColumns: string[] = ['lote','fecha','existencia', 'controles'];
  auxiliar:any;
  verificarDatosRepetidos:any;
  nombreDelProducto?:string;
  historialProductos:agregarProductos[]=[];
  a1: string = '';
  a2: string = '';
  a3: number = 0;
  a4: number = 0;
  a5: number = 0;
  fecha:Date = new Date();

  productos:agregarProductos={
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
  }
  
  datosLotes: lotes = {
    fechaDecaducidad: '',
    numeroDeLote: '',
    existencia: 0,
    stockMinimo: 0
  }
  dataSource: MatTableDataSource<lotes>;
  @ViewChild(MatPaginator, {static:false})paginator!:MatPaginator
@ViewChild(MatSort)sort!:MatSort
  constructor(private firebase:ProductosService, private formbuild:FormBuilder) { 
    this.dataSource = new MatTableDataSource(this.historialLotes);
  }

  ngOnInit(): void {
    this.builform()
  }

  async listaLotes(dato:string){
    (await this.firebase.obtenerLotes(dato)).subscribe((res) => {
      this.historialLotes = res
      this.dataSource = new MatTableDataSource(this.historialLotes);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.activar = false;
      this.activarParaEditar = false;
    });
  }

  async buscar(event:Event){
    const Query = (event.target as HTMLInputElement).value;
    console.log(Query);
    (await this.firebase.buscarProductos(Query)).subscribe((res) => {
      this.auxiliar = res
      this.nombreDelProducto = this.auxiliar.nombrePorducto
      this.productos = this.auxiliar
      this.listaLotes(Query);
    });
  }

  async agregarLotes() {

    this.productos.existen = this.datosLotes.existencia * this.productos.equivalenciaPieza;
    this.datosLotes.existencia = this.datosLotes.existencia * this.productos.equivalenciaPieza;
    this.a1 = this.datosLotes.fechaDecaducidad.slice(5, 7);
    this.a4 = +this.a1;
    this.a4 = this.productos.mesesDeAnticipacion;
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
      .agregarLote(this.datosLotes, this.productos)
      .then(() => {
        this.limpiarLotes();
        this.firebase.exito('El lote ha sido registrado con exito')
      })
      .catch((err) => {
        this.firebase.error("Existe un problema al momento de registrar el lote")
      });
    }else{
      this.firebase.extra(
        'La fecha no puede ser menor a 3 meses',
        'Fecha muy corta',
        'warning'
      );
    }
    
  }

  verificarLotesRepetidos(){
    let valor = this.datosLotes.numeroDeLote
   let auxiliar = this.historialLotes.find((element) =>  {
     //this.encontrarLote(element , valor)
     if(element.numeroDeLote != valor){
      this.agregarLotes()
    }else{
    this.firebase.repetido('Existe un lote ya con ese mismo numero de serie, porfavor verifique');
    } 
    })

    
  }
  pAgeIndex=0;
  
  
 encontrarLote(loteL:lotes, loteB:string) {
  return loteL.numeroDeLote === loteB
}
  activarBotones(){
    this.activar2 = false;
  }

  private builform(){
    this.validacion=this.formbuild.group({
      lote:['', Validators.required],
      existencia:[this.datosLotes.existencia, Validators.required],
      fecha:[this.datosLotes.fechaDecaducidad, Validators.required]
    })
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

  editarLote(elemento:lotes){
   this.auxiliar = elemento;
   this.datosLotes = this.auxiliar
   this.datosLotes.existencia = this.datosLotes.existencia/this.productos.equivalenciaPieza;
   this.activarParaEditar = true;
   this.activar2 = false;
   this.activar = false;
   this.editar = true;
  }

  async agregarEditarLotes(){
    this.productos.existen = this.datosLotes.existencia * this.productos.equivalenciaPieza;
    this.datosLotes.existencia = this.datosLotes.existencia * this.productos.equivalenciaPieza;
    this.a1 = this.datosLotes.fechaDecaducidad.slice(5, 7);
    this.a4 = +this.a1;
    this.a4 = this.productos.mesesDeAnticipacion;
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
      .agregarLote(this.datosLotes, this.productos)
      .then(() => {
        this.limpiarLotes();
        this.firebase.exito('El lote ha sido registrado con exito')
      })
      .catch((err) => {
        this.firebase.error("Existe un problema al momento de registrar el lote")
      });
    }else{
      this.firebase.extra(
        'La fecha no puede ser menor a 3 meses',
        'Fecha muy corta',
        'warning'
      );
    }
  }

  limpiarLotes(){
    this.activar=false;
    this.activar2=true;
    this.activarParaEditar = false;
    this.datosLotes = this.limpiarEspacioLotes;
  }

  async borrarProducto(lista: lotes) {
    const valor = await this.firebase.borrar(
      'Estas apunto de borrar un lote'
    );
    if (valor) {
      await this.firebase
        .eliminarLote(this.productos.codigoDeBarras, lista.numeroDeLote)
        .then(() => {
          this.firebase.exitoB('El lote ha sido eliminado con exito');
        })
        .catch((err) => {
          this.firebase.error('Existe un problema al borrar este producto');
        });
    }
  }
}
