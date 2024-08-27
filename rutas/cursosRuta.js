'use strict'
var express = require('express');
var cursoControl = require('../control/cursosControl');

var api=express.Router();

//Rutas de curso
api.get('/prueba-cursos',cursoControl.prueba);
api.post('/registroC',cursoControl.registroCurso);
api.post('/getU',cursoControl.getCursos);
api.get('/getPhoto/:imageFile',cursoControl.getFoto);
api.get('/getPhotoCurso/:imageFile',cursoControl.getFotoCurso);
api.get('/getCat/:categoria',cursoControl.getCat);
api.get('/getCategorias',cursoControl.getCategorias);

module.exports=api;