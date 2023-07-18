export interface lotes {
    fechaDecaducidad:string;
    numeroDeLote:string;
    existencia:number;
    codigoDeBarras?:string;
    caducidad?:number;
    fechaAnticipacion?:string;
    stockMinimo:number;
  }

  export interface agregarProductos {
    codigoDeBarras:string;
    nombrePorducto:string;
    provedor:string;
    formaDeventa:string;
    precioPorUnidad:number;
    precioPorPieza:number;
    costoDeCompra:number;
    descripcion:string;
    marca:string;
    stockMinimo:number;
    existen:number;
    equivalenciaPieza:number;
    mesesDeAnticipacion:number;
    fechaAnticipacion?:string;
  }

  export interface provedores{
    clavProvedor:string;
    nombreProvedor:string;
    telefonoProvedor:string;
    correoProvedor:string;
    empresaProvedor:string;
    calleProvedor:string;
    coloniaProvedor:string;
    estadoProvedor:string;
    telEmProvedor:string;
  }

  export interface usuarios{
    idVeterinaria:string;
    clavUsuario:string;
    nombreUsuario:string;
    telefonoUsuario:string;
    correoUsuario:string;
    passUsuario:string;
    calleUsuario:string;
    coloniaUsuario:string;
    numCasUsuario:string;
    rolUsuario:string;
  }

  export interface ventas{
    claveDeVenta:string;
    totaldeventa:number;
    fecha:any
    cantidadArticulos:number
  }

  export interface detalleDeventas{
    cantidad:number;
    total:number;
    precio:number;
    nombre:string;
    fechaDecaducidad:string;
    claveproducto:string
    numeroDeLote:string;
  }

  export interface caducidad{
    codigoDeBarras:string;
    nombrePorducto:string;
    provedor:string;
    costoDeCompra:number;
    fechaDecaducidad:string;
    numeroDeLote:string;
    existencia:number;
    fechaAnticipacion:string;
    truc:number;
  }

  export interface empresa{
    id:string;
    nombre:string;
    telefono:string;
    calle:string;
    colonia:string;
    municipio:string;
    estado:string;
  }