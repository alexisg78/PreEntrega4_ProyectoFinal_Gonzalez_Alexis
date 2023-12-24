const catalogoComidas= []
const clientes= [];

let com = JSON.parse(localStorage.getItem('catalogoComidas'))||[];  
let cli = JSON.parse(localStorage.getItem('clientes'))||[];
let formVisible= false;
let estado= '';
let valida= false;

cargaArray(com, catalogoComidas);
cargaArray(cli, clientes);

function cargaArray(coleccion, arr){
     for (const c of coleccion) {
        arr.push(c)
     }
 }
 
function muestraOculta(elem, estado, formVisible){    
    if (formVisible){
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


navComida.addEventListener("click",()=>{
    //Oculto los otros form
    muestraOculta(contenedorCliente, estado, false);
    muestraOculta(tablaCliente, estado, false);
    muestraOculta(tablaComida, estado, false);

    formVisible= true;
    estado= contenedorComida.className;
    muestraOculta(contenedorComida, estado, formVisible);
   
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

    formVisible= true;
    estado= tablaComida.className;
    muestraOculta(tablaComida, estado, formVisible);
    mostrarCatalogoComidas();
    }
)

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
    //Oculto los otros form
    muestraOculta(contenedorComida, estado, false);
    muestraOculta(tablaComida, estado, false);
    muestraOculta(tablaCliente, estado, false);    

    formVisible= true;
    estado= contenedorCliente.className;
    muestraOculta(contenedorCliente, estado, formVisible);
})

btnAltaCliente.addEventListener("click",(e)=>{
    e.preventDefault;
    altaCliente();
    let clientesJSON = JSON.stringify(clientes)
    localStorage.setItem('clientes',clientesJSON);
    limpiarFormulario(formCliente);
})


//--------------------------------------------------------------------------
// Tablas mostrarCliente
const btnMostrarCliente= document.querySelector("#mostrarCliente")
const tablaCliente= document.querySelector("#contenedor-tabla-cliente")

btnMostrarCliente.addEventListener("click",()=>{
    //Oculto los otros form
    muestraOculta(contenedorComida, estado, false);
    muestraOculta(tablaComida, estado, false);
    muestraOculta(contenedorCliente, estado, false);    

    formVisible= true;
    estado= tablaCliente.className;
    muestraOculta(tablaCliente, estado, formVisible);
    mostrarClientes();
})
