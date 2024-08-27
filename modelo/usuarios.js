'use-strict'

var mongoose=require("mongoose");
var Schema=mongoose.Schema;

var EsquemaUsuarios=Schema({
    correo:String,
    nombre: String,
    apellido: String,
    apellidoM: String,
    telefono:String,
    escuela: String,
    fechaI: String,
    fechaF: String
});

module.exports=mongoose.model('Usuarios',EsquemaUsuarios);