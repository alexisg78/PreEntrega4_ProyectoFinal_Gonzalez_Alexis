const catalogoComidas= [];
const clientes= [];
const pedidos= [];
const prepara_pedidos= [];
const pedidos_entregar= [];
let pedActual= null;
//---------------------------------------------------------------------------
// Funciones Asincronicas - json local (apiCatalogo, apiClientes, apiPedidos)

//Catalogo 
fetch('apiCatalogo.json').then((response)=>{
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
fetch('apiClientes.json').then((response)=>{
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
fetch('apiPedidos.json').then((response)=>{
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
let codCliModi= 0

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

function llamaForm(c){ 
    inputDni.value= c.dni || ""
    inputNombre.value= c.nombre || ""
    inputApellido.value= c.apellido || ""
    inputDireccion.value= c.domicilio || ""
    inputTel.value= c.tel || ""
    contenedorCliente.classList.add('position');    
    modificaReg= true;
    codCliModi= c.codigo;
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
    //Oculto los otros form
    muestraOculta(contenedorCliente, estado, false);
    muestraOculta(tablaCliente, estado, false);
    muestraOculta(tablaComida, estado, false);
    muestraOculta(tablaPedido, estado, false);

    elementoVisible= true;
    estado= contenedorComida.className;
    muestraOculta(contenedorComida, estado, elementoVisible);
   
})

btnAltaComida.addEventListener("click",(e)=>{
    e.preventDefault;
    agregarComida();
    let comidasJSON = JSON.stringify(catalogoComidas)
    localStorage.setItem('catalogoComidas',comidasJSON);
    valida && limpiarFormulario(formComida);
})

// Tablas mostrarComida
const btnMostrarComida= document.querySelector("#mostrarComida")
const tablaComida= document.querySelector("#contenedor-tabla-comida")

btnMostrarComida.addEventListener("click", ()=>{
    //Oculto los otros form
    muestraOculta(contenedorCliente, estado, false);
    muestraOculta(tablaCliente, estado, false);
    muestraOculta(contenedorComida, estado, false);  
    muestraOculta(tablaPedido, estado, false);

    elementoVisible= true;
    estado= tablaComida.className;
    muestraOculta(tablaComida, estado, elementoVisible);
    mostrarCatalogoComidas();
    }
)

btnSalirFormComida.addEventListener("click",(e)=>{
    e.preventDefault;
    contenedorComida.classList.remove('position');
    muestraOculta(contenedorComida, estado, false)
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


//-----------------------
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
    for (const c of clientes) {
        let btnModifCli = document.querySelector(`#btnModifCli${c.codigo}`);
        btnModifCli.addEventListener("click",(e)=>{
            e.preventDefault;    
            estado= contenedorCliente.className;
            muestraOculta(contenedorCliente, estado, elementoVisible);
            llamaForm(c);      
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
    for (const p of pedidos) {
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
        //e.preventDefault;
        if(ped.entregado === false){
            let fila_ped_entregado= document.querySelector(`#fila-ped-entregado${ped.idPedido}`)
            pedidos_entregar.push(ped);
            ped.entregado= true
            //let p= JSON.stringify(ped)
            chkSelectPed.setAttribute("disabled","");
            fila_ped_entregado.classList.add("color-entrega");
            msj= `Pedido N° ${ped.idPedido} Entregado!
            Cliente: ${ped.cliente}
            Dirección: ${ped.destino}
            Descripción: ${ped.pedido}
            Precio: ${ped.precio}
            Gracias por su Compra!`
            alerta_exito(msj, 6000);
        }
    })
}

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
        timer: tiempo||5000
    })
}


function alerta_validaDatos(msj){
    Swal.fire({
        position: "center",
        icon: "warning",
        iconcolor: "red",
        title: msj,
        showConfirmButton: false,
        timer: 1000
    })
}

function alerta_pedido_nuevo(){
    const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        }
      });
      Toast.fire({
        icon: "success",
        title: "Tienes un nuevo Pedido!"
      });
}