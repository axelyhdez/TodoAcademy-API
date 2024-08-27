'use strict'

var express=require('express');
var bodyParser=require('body-parser');
var usuario_ruta=require('./rutas/usuarioRuta.js');
var cursos_ruta=require('./rutas/cursosRuta.js');
var categorias_ruta=require('./rutas/categoriasRuta.js');

var app=express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/TodoAcademy', usuario_ruta);
app.use('/TodoAcademy', cursos_ruta);
app.use('/TodoAcademy', categorias_ruta);

app.post('/TodoAcademy/upload', upload.single('image'),(req, res) => {
    const image = req.image;
      res.send(apiResponse({message: 'File uploaded successfully.', image}));
  });

module.exports=app;