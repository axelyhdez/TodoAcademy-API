'use strict'
var express = require('express');
var usuarioControl = require('../control/usuarioControl');

var api=express.Router();

//Rutas de usuario
api.get('/prueba-usuario',usuarioControl.prueba);
api.post('/registroU',usuarioControl.registroUsuario);
api.post('/accesoU',usuarioControl.accesoUsuario);
api.post('/pago',usuarioControl.subirFoto);

api.put('/actualizarU/:id',usuarioControl.actualizarUsuario);

module.exports=api;