import { query } from '@angular/animations';
import { Component, OnInit, ViewChild, Type } from '@angular/core';
import { agregarProductos, lotes } from '../productos-caducar/interfaz/interfas';
import { ProductosService } from '../Servicies/productos.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator,PageEvent } from '@angular/material/paginator';
import { FormBuilder, Validator, FormGroup, Validators } from '@angular/forms';

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
    existencia: 0
  }

 public validacion?:FormGroup = undefined

  activar2 = true;
  activar = true;
  displayedColumns: string[] = ['lote','fecha','existencia', 'controles'];
  auxiliar:any;
  verificarDatosRepetidos:any;
  nombreDelProducto?:string;
  historialProductos:agregarProductos[]=[];

  productos:agregarProductos={
    codigoDeBarras: '',
    nombrePorducto: '',
    provedor: '',
    formaDeventa: '',
    precioPorUnidad: 0,
    precioPorPieza: 0,
    costoDeCompra: 0
  }
  
  datosLotes: lotes = {
    fechaDecaducidad: '',
    numeroDeLote: '',
    existencia: 0
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
    await this.firebase
      .agregarLote(this.datosLotes, this.productos)
      .then(() => {
        console.log(this.datosLotes)
        let lotesA:lotes={
          fechaDecaducidad: '',
          numeroDeLote: '',
          existencia: 0
        }
        this.datosLotes=lotesA
        this.firebase.exito('El lote ha sido registrado con exito')
      })
      .catch((err) => {
        this.firebase.error("Existe un problema al momento de registrar el lote")
      });
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
}
