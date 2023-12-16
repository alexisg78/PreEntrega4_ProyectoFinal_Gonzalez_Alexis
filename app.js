const catalogoComidas= []
const clientes= [];

let com = JSON.parse(localStorage.getItem('catalogoComidas'));  
let cli = JSON.parse(localStorage.getItem('clientes'));

cargaArray(com, catalogoComidas);
cargaArray(cli, clientes);

function cargaArray(coleccion, arr){
     for (const c of coleccion) {
        arr.push(c)
     }
 }
 
let estado="";
function muestraOculta(elem){
    
    console.log(`El estado es ${estado}`);
    console.log(estado.includes('d-none'))
    if(estado.includes('d-none')){
        elem.classList.remove('d-none')
        elem.classList.add('d-block')
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
    estado= contenedorComida.className;
    muestraOculta(contenedorComida);
    estado= contenedorComida.className
})

btnAltaComida.addEventListener("click",(e)=>{
    e.preventDefault;
    agregarComida();
    let comidasJSON = JSON.stringify(catalogoComidas)
    localStorage.setItem('catalogoComidas',comidasJSON);
    limpiarFormulario(formComida);
})

// Tablas mostrarComida
const btnMostrarComida= document.querySelector("#mostrarComida")
const tablaComida= document.querySelector("#contenedor-tabla-comida")

btnMostrarComida.addEventListener("click", ()=>{
    estado= tablaComida.className;
    console.log(estado)
    muestraOculta(tablaComida);
    estado= tablaComida.className
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
    estado= contenedorCliente.className;
    muestraOculta(contenedorCliente);
    estado= contenedorCliente.className;
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
    estado= tablaCliente.className;
    muestraOculta(tablaCliente);
    estado= tablaCliente.className;
    mostrarClientes();
})


