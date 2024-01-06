const catalogoComidas= [];
const clientes= [];
const pedidos= []; // Todos los pedidos de la API local
const prepara_pedidos= []; // pedidos que se van cargando en la tabla
const pedidos_entregar= [];

//---------------------------------------------------------------------------
// Funciones Asincronicas - json local (apiCatalogo, apiClientes, apiPedidos)

//Catalogo 
fetch('api/apiCatalogo.json').then((response)=>{
    if(response.ok){
        return response.json();
    }
}).then((com)=>{
    com.forEach(i => {            
        catalogoComidas.push(i)   
    });
    
    let comidasJSON = JSON.stringify(catalogoComidas);
    localStorage.setItem('catalogoComidas',comidasJSON);
}).catch((error) => {
    alerta_error(error)
}); 

//Clientes
fetch('api/apiClientes.json').then((response)=>{
    if(response.ok){
        return response.json();
    }
}).then((cli)=>{
    cli.forEach(i => {            
        clientes.push(i)   
    });
    
    let clientesJSON = JSON.stringify(clientes);
    localStorage.setItem('clientes',clientesJSON);

}).catch((error) => {
    alerta_error(error)
}); 

//Pedidos
fetch('api/apiPedidos.json').then((response)=>{
    if(response.ok){
        return response.json();
    }
}).then((ped)=>{
        ped.forEach(i => {            
        pedidos.push(i)   
    });

}).catch((error) => {
    alerta_error(error)
});  

//---------------------------------------------------------------------------

let elementoVisible= false;
let estado= '';
let valida= false;
let modificaReg= false;
let tipoForm= '';
let codComModi= 0;
let codCliModi= 0;

function muestraOculta(elem, estado, elementoVisible){    
    if (elementoVisible){
        if(estado.includes('d-none')){
            elem.classList.remove('d-none');
            elem.classList.add('d-block');
        }else{
            elem.classList.remove('d-block')
            elem.classList.add('d-none')
        }
    }else{
        elem.classList.remove('d-block')
        elem.classList.add('d-none')
    }
}

function llamaForm(c, tipoForm){ 
    if(tipoForm === 'cliente'){
        inputDni.value= c.dni || ""
        inputNombre.value= c.nombre || ""
        inputApellido.value= c.apellido || ""
        inputDireccion.value= c.domicilio || ""
        inputTel.value= c.tel || ""
        contenedorCliente.classList.add('position');    
        codCliModi= c.codigo;
        modificaReg= true;
    }else{
        inputComida.value= c.descripcion || ''
        inputPrecio.value= c.precio || '';
        contenedorComida.classList.add('position');    
        codComModi= c.codigo;
        modificaReg= true;
    }
}

function limpiarFormulario(formulario) {
    formulario.reset(); ///me resetea el contenido del formulario - limpiar los campos
}

//--------------------------------------------------------------------------
// Comidas

const navComida= document.querySelector("#nav-altaComida")
const contenedorComida= document.querySelector(".contenedor-form-comida")
const bodyTablaComida = document.getElementById("itemsTablaComida");
const formComida= document.querySelector("#form-comida");

//Form Alta Comida
const inputComida= document.querySelector("#inputComida")
const inputPrecio= document.querySelector("#inputPrecio")
const btnAltaComida= document.querySelector("#btnAltaComida");
const btnSalirFormComida= document.querySelector("#btnSalirCom")

navComida.addEventListener("click",()=>{
    modificaReg= false;
    limpiarFormulario(formComida)
    //Oculto los otros form
    muestraOculta(contenedorCliente, estado, false);
    muestraOculta(tablaCliente, estado, false);
    muestraOculta(tablaComida, estado, false);
    muestraOculta(tablaPedido, estado, false);
    contenedorComida.classList.remove('position');

    elementoVisible= true;
    estado= contenedorComida.className;
    muestraOculta(contenedorComida, estado, elementoVisible);
   
})

btnAltaComida.addEventListener("click",(e)=>{
    e.preventDefault;
    if(modificaReg===false){ 
        agregarComida();
        let comidasJSON = JSON.stringify(catalogoComidas)
        localStorage.setItem('catalogoComidas',comidasJSON);
        valida && limpiarFormulario(formComida);
    }else{
        modificaComida();
        muestraOculta(contenedorComida, estado, false);
    }    
})

// Tablas mostrarComida
const btnMostrarComida= document.querySelector("#mostrarComida")
const tablaComida= document.querySelector("#contenedor-tabla-comida")

btnMostrarComida.addEventListener("click", ()=>{
    modificaReg= false;
    //Oculto los otros form
    muestraOculta(contenedorCliente, estado, false);
    muestraOculta(tablaCliente, estado, false);
    muestraOculta(contenedorComida, estado, false);  
    muestraOculta(tablaPedido, estado, false);

    elementoVisible= true;
    estado= tablaComida.className;
    muestraOculta(tablaComida, estado, elementoVisible);
    mostrarCatalogoComidas();

    f_btnModificarCom() //btn modificar, de cada registro
    }
)

function f_btnModificarCom(){
    tipoForm= 'comida/bebida'
    for (const c of catalogoComidas) {
        let btnModifCom = document.querySelector(`#btnModifCom${c.codigo}`);
        btnModifCom.addEventListener("click",(e)=>{
            e.preventDefault;    
            estado= contenedorComida.className;
            muestraOculta(contenedorComida, estado, elementoVisible);
            llamaForm(c, tipoForm);      
        })
    }
}

btnSalirFormComida.addEventListener("click",(e)=>{
    e.preventDefault;
    contenedorComida.classList.remove('position');
    muestraOculta(contenedorComida, estado, false);
    modificaReg= false;
})

//--------------------------------------------------------------------------
// Cliente

const navAltaCli= document.querySelector("#nav-altaCliente")
const contenedorCliente= document.querySelector(".contenedor-form-cliente")
const bodyTablaCliente = document.getElementById("itemsTablaCliente");
const formCliente= document.querySelector("#form-cliente");

//Form Alta Cliente
const inputDni= document.querySelector("#inputDniCli")
const inputNombre= document.querySelector("#inputNombreCli") 
const inputApellido= document.querySelector("#inputApellidoCli")
const inputDireccion= document.querySelector("#inputDirecionCli")
const inputTel= document.querySelector("#inputTelCli")
const btnAltaCliente= document.querySelector("#btnAltaCliente");

navAltaCli.addEventListener("click",()=>{
    modificaReg= false;
    // Limpio el form
    limpiarFormulario(formCliente)
    //Oculto los otros form
    muestraOculta(contenedorComida, estado, false);
    muestraOculta(tablaComida, estado, false);
    muestraOculta(tablaCliente, estado, false);    
    muestraOculta(tablaPedido, estado, false);
    contenedorCliente.classList.remove('position');

    elementoVisible= true;
    estado= contenedorCliente.className;
    muestraOculta(contenedorCliente, estado, elementoVisible);
})

btnAltaCliente.addEventListener("click",(e)=>{
    e.preventDefault;
    if(modificaReg===false){ 
        altaCliente();
        let clientesJSON = JSON.stringify(clientes);
        localStorage.setItem('clientes',clientesJSON);
        valida && limpiarFormulario(formCliente);
    }else{
        modificaCliente();
        muestraOculta(contenedorCliente, estado, false);
    }   
})

// Tablas mostrarCliente
const btnMostrarCliente= document.querySelector("#mostrarCliente")
const tablaCliente= document.querySelector("#contenedor-tabla-cliente")
const btnSalirFormCLi= document.querySelector("#btnSalirCLi")

btnMostrarCliente.addEventListener("click",()=>{
    //Oculto los otros form
    muestraOculta(contenedorComida, estado, false);
    muestraOculta(tablaComida, estado, false);
    muestraOculta(contenedorCliente, estado, false);    
    muestraOculta(tablaPedido, estado, false);
    
    elementoVisible= true;
    estado= tablaCliente.className;
    muestraOculta(tablaCliente, estado, elementoVisible);
    mostrarClientes();
    
    f_btnModificarCli() //btn modificar, de cada registro
})

function f_btnModificarCli(){
    tipoForm= 'cliente'
    for (const c of clientes) {
        let btnModifCli = document.querySelector(`#btnModifCli${c.codigo}`);
        btnModifCli.addEventListener("click",(e)=>{
            e.preventDefault;    
            estado= contenedorCliente.className;
            muestraOculta(contenedorCliente, estado, elementoVisible);
            llamaForm(c, tipoForm);      
        })
    }
}

btnSalirFormCLi.addEventListener("click",(e)=>{
    e.preventDefault;
    contenedorCliente.classList.remove('position');
    muestraOculta(contenedorCliente, estado, false)
    modificaReg= false;
})

//---------------------------------------------------
// Pedidos

// Tabla mostrarPedido
const btnMostrarPedido= document.querySelector("#mostrarPedido")
const tablaPedido= document.querySelector("#contenedor-tabla-pedidos")
const bodyTablaPedidos = document.getElementById("itemsTablaPedidos");

btnMostrarPedido.addEventListener("click", ()=>{
    //Oculto los otros form
    muestraOculta(contenedorCliente, estado, false);
    muestraOculta(contenedorComida, estado, false);  
    muestraOculta(tablaCliente, estado, false);
    muestraOculta(tablaComida, estado, false);

    elementoVisible= true;
    estado= tablaPedido.className;
    muestraOculta(tablaPedido, estado, elementoVisible);
    mostrarPedidos();
    f_chkSelectPed();
    }
)

function f_chkSelectPed(){
    for (const p of prepara_pedidos) {
        let chkSelectPed = document.querySelector(`#chkSelectPed${p.idPedido}`);
        chkSelectPed.addEventListener("click",(e)=>{
            e.preventDefault;
            if(p.entregado === false ){
                f_entregarPedidos(p, chkSelectPed);
            }
        })
    }
}

function f_entregarPedidos(ped, chkSelectPed){
    btnEntregaPed.addEventListener("click",()=>{
        if(ped.entregado === false){
            let fila_ped_entregado= document.querySelector(`#fila-ped-entregado${ped.idPedido}`)
            pedidos_entregar.push(ped);
            ped.entregado= true
            //let p= JSON.stringify(ped)
            chkSelectPed.setAttribute("disabled","");
            chkSelectPed.setAttribute("checked","checked");
            fila_ped_entregado.classList.add("color-entrega");
            msj= `Pedido N° ${ped.idPedido} Entregado!
            Cliente: ${ped.cliente}
            Dirección: ${ped.destino}
            Descripción: ${ped.pedido}
            Precio: ${ped.precio}
            Gracias por su Compra!`
            muestraOculta(tablaPedido, null, false);
            alerta_exito(msj, 5000);
        }
    })
}

// Función - simula pedido nuevo
function f_simularPedidoNuevo() {
    let indice = 0;

    return function () {
        if (indice < pedidos.length) {
            const objetoActual = pedidos[indice];
            prepara_pedidos.push(objetoActual)
            mostrarPedidos();
            alerta_pedido_nuevo()
            muestraOculta(tablaPedido, null, false);
            indice++;
        } else {
            clearInterval(intervaloMostrarPedido);
            console.log('Intervalo detenido');
            indice = 0;
        }
    };
}

// Para llamar a la función cada 14 segundos
const intervaloMostrarPedido = setInterval(f_simularPedidoNuevo(), 14000);

//---------------------------------------------------
// Alertas
function alerta_exito(msj, tiempo){
    Swal.fire({
        position: "center",
        icon: "success",
        title: msj,
        showConfirmButton: false,
        timer: tiempo||1500
    })
}


function alerta_error(msj, tiempo){
    Swal.fire({
        position: "center",
        icon: "error",
        title: msj,
        showConfirmButton: false,
        timer: tiempo||3000
    })
    return false;
}


function alerta_validaDatos(msj, tiempo){
    Swal.fire({
        position: "center",
        icon: "warning",
        title: msj,
        showConfirmButton: false,
        timer: tiempo||2000
    })
}

function alerta_pedido_nuevo(){
    const Toast = Swal.mixin({
        toast: true,
        position: "bottom-end",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        }
      });
      Toast.fire({
        icon: "info",
        title: "Tienes un nuevo Pedido!"
      });
}