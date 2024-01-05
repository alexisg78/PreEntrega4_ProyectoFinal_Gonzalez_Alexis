class Cliente {
    constructor(codigo,dni,nombre,apellido,domicilio,tel){
            this.codigo= codigo
            this.dni= dni;
            this.nombre= nombre;
            this.apellido= apellido;
            this.domicilio= domicilio;
            this.tel= tel
        }
        
        setCodigo(cod){
            this.codigo= cod;
        }

        cargaDatos(){
            this.codigo= this.codigo || '';
            this.dni= inputDni.value || ''
            this.nombre= inputNombre.value.toLocaleUpperCase() || '' 
            this.apellido= inputApellido.value.toLocaleUpperCase() || ''
            this.domicilio= inputDireccion.value.toLocaleUpperCase() || ''
            this.tel= inputTel.value || ''

            let valida= this.codigo&&this.dni&&this.nombre&&this.apellido&&this.domicilio&&this.tel&&true
            if(valida!==true){
                alerta_validaDatos("Debe completar los datos!",'');
                valida= false;
                return valida;
            }else{
                valida= true;
                return valida
            }
        }
        
}