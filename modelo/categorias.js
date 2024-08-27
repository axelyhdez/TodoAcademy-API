'use-strict'

var mongoose=require("mongoose");
var Schema=mongoose.Schema;

var EsquemaCategorias=Schema({
    nombreCategoria: String,
});

module.exports=mongoose.model('Categorias',EsquemaCategorias);