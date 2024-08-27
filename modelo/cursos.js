'use-strict'

var mongoose=require("mongoose");
var Schema=mongoose.Schema;

var EsquemaCursos=Schema({
    nombreC: String,
    sesiones: String,
    duracion: String,
    modalidad: String,
    dirigido:String,
    certificador: String,
    aprenderas: String,
    objetivo: String,
    categoria: String
});

module.exports=mongoose.model('Cursos',EsquemaCursos);