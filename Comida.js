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
    }
    
}