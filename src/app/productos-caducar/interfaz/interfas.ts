export interface lotes {
    fechaDecaducidad:string;
    numeroDeLote:string;
    existencia:number;
  }

  export interface agregarProductos {
    codigoDeBarras:string;
    nombrePorducto:string;
    provedor:string;
    formaDeventa:string;
    precioPorUnidad:number;
    precioPorPieza:number;
    costoDeCompra:number;
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
    truc:number;
  }
