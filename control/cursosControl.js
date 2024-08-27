'use strict'

var cursosModelo = require('../modelo/cursos');

var path=require('path')
var fs = require('fs');

function prueba(req,res){
    res.status(200).send({
        msj: 'Probando acción controlador Cursos'
    })
}

function registroCurso(req,res){
    //Recibe valores
    var curso = new cursosModelo();
    var params=req.body;
    console.log('Curso Almacenado');

    curso.categoria=params.categoria;
    curso.nombreC=params.nombreC;
    curso.sesiones=params.sesiones;
    curso.duracion=params.duracion;
    curso.modalidad=params.modalidad;
    curso.dirigido=params.dirigido;
    curso.certificador=params.certificador;
    curso.aprenderas=params.aprenderas;
    curso.objetivo=params.objetivo;

    
    //Guarda los valores 
    if (curso.nombreC!=null && curso.sesiones!=null && curso.duracion!=null && curso.modalidad!=null && 
        curso.dirigido!=null && curso.certificador!=null && curso.aprenderas!=null&& curso.objetivo!=null&&curso.categoria!=null) {
        curso.save((err,cursoAlmacenado)=>{
            if(err){
                res.status(500).send({messagge: 'Error al guardar el curso'})
            }else{
                if(!cursoAlmacenado){
                    res.status(404).send({messagge:'No se ha registrado el curso'});
                }else{
                    res.status(200).send({message: 'Registro de curso realizado'});
                    console.log(cursoAlmacenado);
                    console.log("Fin registro\n\n")
                }
            }
        });
    }else{
        res.status(200).send({message: 'Faltan campos'});
    }
}


function getCursos(req, res) {
    var params = req.body;
    var nombreC = params.nombreC;

    cursosModelo.findOne({ nombreC: nombreC }, (err, curso) => {
        if (err) {
            res.status(500).send({ mesagge: 'Error en la peticion al servidor' });
        } else {
            if (!curso) {
                res.status(404).send({ mesagge: 'El Curso no existe' });
            } else {
                res.status(200).send({ id: curso._id, nombreC: curso.nombreC,sesiones: curso.sesiones, duracion: curso.duracion, modalidad: curso.modalidad, dirigido: curso.dirigido, 
                    certificador: curso.certificador, aprenderas: curso.aprenderas, objetivo: curso.objetivo });
                console.log("Acceso a curso: "+curso.nombreC);
            }
        }
    });
}


function getCat(req, res) {
    var categoria = req.params.categoria;
    /*
    cursosModelo.findOne({ categoria: categoria }, (err, curso) => {
        if (err) {
            res.status(500).send({ mesagge: 'Error en la peticion al servidor' });
        } else {
            if (!curso) {
                res.status(404).send({ mesagge: 'La categoria no existe' });
            } else {
                res.status(200).send({nombreC: curso.nombreC, duracion: curso.duracion, modalidad: curso.modalidad});
                console.log("Acceso a curso: "+curso.nombreC+" categoria: "+curso.categoria);
            }
        }
    });
    */
   
    var query = { categoria: categoria };
    cursosModelo.find({categoria: categoria},(err,curso)=>{
        if(err){
            console.log("error");
        }else{
            if(curso){
                console.log('\ncategoria: '+categoria)
                res.status(200).send({curso: curso});
            }else{
                console.log('No curso');
            }
        }
    });  
}


function getCategorias(req, res) {
    if (req.params.page) {
        var page = req.params.pages;
    } else {
        var page = 1;
    }
    var itemPaginas = 10;
    cursosModelo
        .find()
        .sort('nombreC')
        .paginate(page, itemPaginas, function(err, cursos, total) {
            if (err) {
                res.status(500).send({ message: 'Error en la petición' });
            } else {
                if (!cursos) {
                    res.status(404).send({ message: 'El artista no existe' });
                } else {
                    return res.status(200).send({
                        nombre: cursos
                    });
                }
            }
        });
}

function getFoto(req, res){
    var imageFile = req.params.imageFile;
    var rutaFoto = './cargas/usuario/' + imageFile;
    fs.exists(rutaFoto,(existe)=>{
        if(existe){
            res.sendFile(path.resolve(rutaFoto));
        }else{
            res.status(404).send({ mesagge: 'La foto no existe' });
        }
    })
    
}

function getFotoCurso(req, res){
    var imageFile = req.params.imageFile;
    var rutaFoto = './cargas/cursos/' + imageFile;
    fs.exists(rutaFoto,(existe)=>{
        if(existe){
            res.sendFile(path.resolve(rutaFoto));
        }else{
            res.status(404).send({ mesagge: 'La foto no existe' });
        }
    })
    
}

module.exports={
    prueba,
    registroCurso,
    getCursos,
    getFoto,
    getCat,
    getCategorias,
    getFotoCurso
}