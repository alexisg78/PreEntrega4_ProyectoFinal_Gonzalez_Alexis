let idComida= 0; 
let idCliente= 0; 
//let idPedidos= 0;  ---> Para cuando se implemente los pedidos

// Comidas
function agregarComida(){
    let devuelveValida
    let objComida= new Comida();
    devuelveValida= objComida.cargaDatos();
    if (devuelveValida===true){
        catalogoComidas.push(objComida)
    }
}

function mostrarCatalogoComidas(){
    let com = JSON.parse(localStorage.getItem('catalogoComidas'));  
    bodyTablaComida.innerHTML = ``; 
    com.forEach((item,index) => {
        bodyTablaComida.innerHTML =  bodyTablaComida.innerHTML +
            `<tr>
                <th>${index + 1}</th>
                <td>${item.descripcion}</td>
                <td>$${item.precio}</td>
            </tr>    
        `;
    });

    // bodyTablaComida.innerHTML = ``; 
    // catalogoComidas.forEach((item,index) => {
    //     bodyTablaComida.innerHTML =  bodyTablaComida.innerHTML +
    //         `<tr>
    //             <th>${index + 1}</th>
    //             <td>${item.descripcion}</td>
    //             <td>$${item.precio}</td>
    //         </tr>    
    //     `;
    // });
}

//------------------------------------------------------
// Clientes
function altaCliente(){
    let objCliente= new Cliente();
    objCliente.cargaDatos();
    clientes.push(objCliente);

    // let clientesJSON = JSON.stringify(clientes)
    // localStorage.setItem('clientes',clientesJSON);
}

function mostrarClientes(){
    let cli = JSON.parse(localStorage.getItem('clientes'));
    bodyTablaCliente.innerHTML = ``; 
    cli.forEach((item,index) => {
        bodyTablaCliente.innerHTML =  bodyTablaCliente.innerHTML +
            `<tr>
                <th>${index + 1}</th>
                <td>${item.dni}</td>
                <td>${item.nombre}</td>
                <td>${item.apellido}</td>
                <td>${item.domicilio}</td>
                <td>${item.tel}</td>
            </tr>    
        `;
    })            

    // bodyTablaCliente.innerHTML = ``; 
    // clientes.forEach((item,index) => {
    //     bodyTablaCliente.innerHTML =  bodyTablaCliente.innerHTML +
    //         `<tr>
    //             <th>${index + 1}</th>
    //             <td>${item.dni}</td>
    //             <td>${item.nombre}</td>
    //             <td>${item.apellido}</td>
    //             <td>${item.domicilio}</td>
    //             <td>${item.tel}</td>
    //         </tr>    
    //     `;
    // })            
}
