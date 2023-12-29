let idComida= 0; 
let idCliente= 0; 
//let idPedidos= 0;  ---> Para cuando se implemente los pedidos

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

function mostrarCatalogoComidas(){
    let com = JSON.parse(localStorage.getItem('catalogoComidas'));  
    bodyTablaComida.innerHTML = ``; 
    com.forEach((item) => {
        bodyTablaComida.innerHTML =  bodyTablaComida.innerHTML +
            `<tr>
                <th>${item.codigo}</th>
                <td>${item.descripcion}</td>
                <td>$${item.precio}</td>
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

function modificaCliente(c){
    let cliEncontrado= clientes.find((i)=> i.codigo === codCliModi)
    // console.log('prueba exitosa')   
    // console.log(`El Cliente encontrado es: ${JSON.stringify(cliEncontrado)}`);
    
    clientes[codCliModi - 1].dni= inputDni.value
    clientes[codCliModi - 1].nombre= inputNombre.value.toLocaleUpperCase()
    clientes[codCliModi - 1].apellido= inputApellido.value.toLocaleUpperCase()
    clientes[codCliModi - 1].domicilio= inputDireccion.value.toLocaleUpperCase()
    clientes[codCliModi - 1].tel= inputTel.value
    
    //console.log(`Cliente modificado: ${JSON.stringify(clientes[codCliModi - 1])}`);
    
    alerta_exito("El Cliente fue modificado con éxito!")
    
    let clientesJSON = JSON.stringify(clientes);
    localStorage.setItem('clientes',clientesJSON);
    
    mostrarClientes()
    f_btnModificarCli() //btn modificar, de cada registro
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
