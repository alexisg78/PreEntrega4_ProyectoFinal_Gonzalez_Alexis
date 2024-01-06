let idComida= 0; 
let idCliente= 0; 

// Comidas
function agregarComida(){
    idComida= catalogoComidas.length + 1;
    let devuelveValida
    let objComida= new Comida(idComida);
    devuelveValida= objComida.cargaDatos();
    if (devuelveValida===true){
        catalogoComidas.push(objComida)
        alerta_exito("Se agrego una nueva Comida/Bebida al Catálogo!")
    }
}

function modificaComida(){
    let comEncontrado= catalogoComidas.find((i)=> i.codigo === codComModi)
    
    console.log(catalogoComidas[codComModi - 1])
    catalogoComidas[codComModi - 1].descripcion= inputComida.value.toLocaleUpperCase();
    catalogoComidas[codComModi - 1].precio= inputPrecio.value
    
    alerta_exito("La Comida/Bebida fue modificada con éxito!")

    let comidasJSON = JSON.stringify(catalogoComidas);
    localStorage.setItem('catalogoComidas',comidasJSON);
    
    mostrarCatalogoComidas()
    f_btnModificarCom() //btn modificar, de cada registro
}


function mostrarCatalogoComidas(){
    let com = JSON.parse(localStorage.getItem('catalogoComidas'));  
    bodyTablaComida.innerHTML = ``; 
    com.forEach((item) => {
        bodyTablaComida.innerHTML =  bodyTablaComida.innerHTML +
            `<tr>
                <th>${item.codigo}</th>
                <td>${item.descripcion}</td>
                <td>${item.precio}</td>
                <td><button id="btnModifCom${item.codigo}" type="submit" class="btnModifCom btn btn-primary">Modificar</button></td>
            </tr>    
        `;
    })
}

//------------------------------------------------------
// Clientes
function altaCliente(){
    let devuelveValida
    idCliente= clientes.length + 1;
    let objCliente= new Cliente(idCliente);
    devuelveValida= objCliente.cargaDatos();
    if (devuelveValida===true){
        clientes.push(objCliente);
        alerta_exito("El Cliente fue dado de alta!")
    }
}

function modificaCliente(){
    let cliEncontrado= clientes.find((i)=> i.codigo === codCliModi);
    
    clientes[codCliModi - 1].dni= inputDni.value;
    clientes[codCliModi - 1].nombre= inputNombre.value.toLocaleUpperCase();
    clientes[codCliModi - 1].apellido= inputApellido.value.toLocaleUpperCase();
    clientes[codCliModi - 1].domicilio= inputDireccion.value.toLocaleUpperCase();
    clientes[codCliModi - 1].tel= inputTel.value;
    
    alerta_exito("El Cliente fue modificado con éxito!")
    
    let clientesJSON = JSON.stringify(clientes);
    localStorage.setItem('clientes',clientesJSON);
    
    mostrarClientes();
    f_btnModificarCli(); //btn modificar, de cada registro
}

function mostrarClientes(){
    let c = JSON.parse(localStorage.getItem('clientes'));
    bodyTablaCliente.innerHTML = ``; 
    c.forEach((item) => {
        bodyTablaCliente.innerHTML =  bodyTablaCliente.innerHTML +
            `<tr>
                <th>${item.codigo}</th>
                <td>${item.dni}</td>
                <td>${item.nombre}</td>
                <td>${item.apellido}</td>
                <td>${item.domicilio}</td>
                <td>${item.tel}</td>
                <td><button id="btnModifCli${item.codigo}" type="submit" class="btnModifCli btn btn-primary">Modificar</button></td>
            </tr>    
        `;
    });
}

//------------------------------------------------------
// Pedidos
function mostrarPedidos(){
    let cli='';
    let com=''
    bodyTablaPedidos.innerHTML = ``; 
    prepara_pedidos.forEach((item) => {
        com = catalogoComidas.filter((i) =>{ return item.idCom_beb === i.codigo});
        cli = clientes.filter((i) =>{ return item.idCli === i.codigo});
        
        item.cliente= cli[0].nombre +' '+ cli[0].apellido;
        item.pedido= com[0].descripcion;
        item.destino= cli[0].domicilio;
        item.precio= com[0].precio;

        if (item.entregado === false){
            bodyTablaPedidos.innerHTML =  bodyTablaPedidos.innerHTML +
                `<tr id="fila-ped-entregado${item.idPedido}">
                    <th>${item.idPedido}</th>
                    <td>${item.cliente}</td>
                    <td>${item.pedido}</td>
                    <td>${item.destino}</td>
                    <td>${item.precio}</td>
                    <td><input class="form-check-input" type="checkbox" role="switch" id="chkSelectPed${item.idPedido}"></input></td>
                </tr>
                `;
        }else{
            bodyTablaPedidos.innerHTML =  bodyTablaPedidos.innerHTML +
            `<tr id="fila-ped-entregado${item.idPedido}" class="color-entrega">
                <th>${item.idPedido}</th>
                <td>${item.cliente}</td>
                <td>${item.pedido}</td>
                <td>${item.destino}</td>
                <td>${item.precio}</td>
                <td><input class="form-check-input" checked="checked" type="checkbox" disabled role="switch" id="chkSelectPed${item.idPedido}"></input></td>
            </tr>
            `;
        }
    });

    bodyTablaPedidos.innerHTML =  bodyTablaPedidos.innerHTML +
    `<button id="btnEntregaPed" type="submit" class="btn btn-primary position-absolute">Entregar Pedido</button>`
}
