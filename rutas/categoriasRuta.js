'use strict'
var express = require('express');
var categoriasControl = require('../control/categoriasControl');

var api=express.Router();

//Rutas de curso
api.get('/prueba-categorias',categoriasControl.prueba);
api.post('/registroCat',categoriasControl.registroCategorias);

module.exports=api;