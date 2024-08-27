'use-strict'

var mongoose=require("mongoose");
var Schema=mongoose.Schema;

var EsquemaAsignados=Schema({
    alumno: { type: Schema.ObjectId, ref: "Usuarios" },
    curso: { type: Schema.ObjectId, ref: "Cursos" },
    cursoAsignado: String,
    finalizado: String
});

module.exports=mongoose.model('Asignados',EsquemaAsignados);