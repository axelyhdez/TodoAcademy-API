'use strict'

var categoriasModelo = require('../modelo/categorias');

var path=require('path')

function prueba(req,res){
    res.status(200).send({
        msj: 'Probando acción controlador Categoria'
    })
}

function registroCategorias(req, res){
    var categoria=new categoriasModelo();
    var params=req.body;
    console.log('Registro categoria');

    categoria.nombreCategoria=params.nombreCategoria;

    if(categoria.nombreCategoria!=null){
        categoria.save((err,categoriaRegistrada)=>{
            if(err){
                res.status(500).send({messagge: 'Error al guardar la categoria'})
            }else{
                if(!categoriaRegistrada){
                    res.status(404).send({messagge:'No se ha registrado la categoria'});
                }else{
                    res.status(200).send({message: 'Registro de categoria realizado'});
                    console.log(categoriaRegistrada);
                    console.log("Fin registro\n\n")
                }
            }
        });
    }else{
        res.status(200).send({message: 'Faltan el nombre de la categoria'});
    }
}


module.exports={
    prueba,
    registroCategorias
}