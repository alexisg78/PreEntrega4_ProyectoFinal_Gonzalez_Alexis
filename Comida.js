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
        this.codigo= this.codigo || '';
        this.descripcion= inputComida.value.toLocaleUpperCase() || ''
        this.precio= inputPrecio.value || ''
        valida= this.descripcion&&this.precio&&true
        if(valida!==true){
            alerta_validaDatos("Debe completar los datos!");
            valida= false;
            return valida;
        }else{
            valida= true;
            return valida
        }
    }
    
}