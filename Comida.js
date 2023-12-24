class Comida{
    constructor(codigo, descripcion, precio){
        this.codigo= codigo
        this.descripcion= descripcion
        this.precio= parseFloat(precio)
    }
    
    setCodigo(cod){
        this.codigo= cod;
    }
    
    cargaDatos(){        
        this.descripcion= inputComida.value.toLocaleUpperCase() || ''
        this.precio= inputPrecio.value || ''
        valida= this.descripcion&&this.precio&&true
        if(valida!==true){
            Swal.fire({
                position: "center",
                icon: "warning",
                iconcolor: "Red",
                title: "Debe completar los datos!",
                showConfirmButton: false,
                timer: 1500
              });
              valida= false;
              return valida;
        }else{
            valida= true;
            return valida
        }
    }
    
}