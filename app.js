const catalogoComidas= []
const clientes= [];

let com = JSON.parse(localStorage.getItem('catalogoComidas'))||[];  
let cli = JSON.parse(localStorage.getItem('clientes'))||[];
let elementoVisible= false;
let estado= '';
let valida= false;
let modificaReg= false;
let codCliModi= 0

cargaArray(com, catalogoComidas);
cargaArray(cli, clientes);

// console.log(catalogoComidas)
// console.log(clientes)

function cargaArray(coleccion, arr){
    if(coleccion.length > 1){ 
        for (const c of coleccion) {
            arr.push(c)
        }
    }    
 }

// function cargaArray(coleccion, arr){
//     for (const c of coleccion) {
//         arr.push(c)
//     }
//  }

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
// Alertas
function alerta_exito(msj){
    Swal.fire({
        position: "center",
        icon: "success",
        title: msj,
        showConfirmButton: false,
        timer: 1500
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