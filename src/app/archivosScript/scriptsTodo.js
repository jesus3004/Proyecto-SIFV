

function abrirAgregarCarrito(){
  const btn_abrir = document.getElementById("carritobtn");
  btn_abrir.className="star";
}

function cerrarAgregarCarrito(){
   const btn_cerrar = document.getElementById("carritobtn");
   btn_cerrar.className="tarjeta_de_Carrito";
}

function abrirCarrito(){
  const btn_abrir = document.getElementById("carritoCompras");
  
  btn_abrir.className="star";
}

function cerrarCarrito(){
   const btn_cerrar = document.getElementById("carritoCompras");
   btn_cerrar.className="tarjeta_de_CarritoCompras";
}

function abrirPedidos(){
  const btn_abrir = document.getElementById("pedidosCliente");
  btn_abrir.className="star";
}

function cerrarPedidos(){
   const btn_cerrar = document.getElementById("pedidosCliente");
   btn_cerrar.className="tarjeta_de_pedidosCli";
}
/*Esto es para abrir provedores*/
function abrirModificarProvedores(idprovedores,nombre,apellido,empresa,telefono,correo){
   const btn_abrir = document.getElementById("modificar");
   document.getElementById("idprovedores").value=idprovedores;
   document.getElementById("nombre").value=nombre;
   document.getElementById("apellido").value=apellido;
   document.getElementById("empresa").value=empresa;
   document.getElementById("telefono").value=telefono;
   document.getElementById("correo").value=correo;
  btn_abrir.className="abrir_tarjeta";
}

function abrirEliminarProvedores(idprovedores,nombre,apellido,empresa,telefono,correo){
   const btn_abrir = document.getElementById("eliminar");
   document.getElementById("idprovedores").value=idprovedores;
   document.getElementById("nombre").value=nombre;
   document.getElementById("apellido").value=apellido;
   document.getElementById("empresa").value=empresa;
   document.getElementById("telefono").value=telefono;
  btn_abrir.className="abrir_tarjeta";
}
/*Esto es para abrir usuarios*/
function abrirModificarUsuarios(idusuarios,nombre,apellido,calle,colonia,num_casa,telefono,correo,paswordUsr){
   const btn_abrir = document.getElementById("modificar");
   document.getElementById("idusuarios").value=idusuarios;
   document.getElementById("nombre").value=nombre;
   document.getElementById("apellido").value=apellido;
   document.getElementById("calle").value=calle;
   document.getElementById("colonia").value=colonia;
   document.getElementById("num_casa").value=num_casa;
   document.getElementById("telefono").value=telefono;
  btn_abrir.className="abrir_tarjeta";
}

function abrirEliminarUsuarios(idusuarios, nombre, apellido, calle, colonia, num_casa, telefono, correo, paswordUsr){
  const btn_abrir = document.getElementById("eliminar");
  document.getElementById("idusuarios").value = idusuarios;
  document.getElementById("nombre").value = nombre;
  document.getElementById("apellido").value = apellido;
  document.getElementById("calle").value = calle;
  document.getElementById("colonia").value = colonia;
  document.getElementById("num_casa").value = num_casa;
  document.getElementById("telefono").value = telefono;
  btn_abrir.className="abrir_tarjeta";
}

/*Esto es para abrir Productos*/
function abrirModificarProducto(idZapato,modelo,tallas,colores,precio,existencia,estatus){
   const btn_abrir = document.getElementById("modificar");
   document.getElementById("idZapato").value=idZapato;
   document.getElementById("modelo").value=modelo;
   document.getElementById("tallas").value=tallas;
   document.getElementById("colores").value=colores;
   document.getElementById("precio").value=precio;
   document.getElementById("existencia").value=existencia;
   document.getElementById("estatus").value=estatus;
  btn_abrir.className="abrir_tarjeta";
}   

function abrirEliminarProducto(idZapato,modelo,tallas,colores,precio,existencia,estatus){
   const btn_abrir = document.getElementById("eliminar");
   document.getElementById("idZapato").value=idZapato;
   document.getElementById("modelo").value=modelo;
   document.getElementById("tallas").value=tallas;
   document.getElementById("colores").value=colores;
   document.getElementById("precio").value=precio;
   document.getElementById("existencia").value=existencia;
   document.getElementById("estatus").value=estatus;
  btn_abrir.className="abrir_tarjeta";
}

function abrirAgregarStock(idZapato,modelo,existencia){
   const btn_abrir = document.getElementById("agregarStock");
   document.getElementById("idZapato").value=idZapato;
   document.getElementById("modelo").value=modelo;
   document.getElementById("existencia").value=existencia;
  btn_abrir.className="abrir_tarjeta";
}

function cerrarModificar(){
   const btn_abrir = document.getElementById("modificar");
  btn_abrir.className="cerrar_tarjeta";
}

function cerrarEliminar(){
   const btn_abrir = document.getElementById("eliminar");
  btn_abrir.className="cerrar_tarjeta";
}

function cerrarAgregarStock(){
   const btn_abrir = document.getElementById("agregarStock");
  btn_abrir.className="cerrar_tarjeta";
}