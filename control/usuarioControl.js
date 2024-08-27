'use strict'

var usuariosModelo = require('../modelo/usuarios');
var usuario = new usuariosModelo();

var path=require('path')

function prueba(req,res){
    res.status(200).send({
        msj: 'Probando acción controlador Usuario'
    })
}

function registroUsuario(req,res){
    //Recibe valores
    var usuario = new usuariosModelo();
    var params=req.body;
    console.log('Usuario Almacenado');

    usuario.correo=params.correo;
    usuario.nombre=params.nombre;
    usuario.apellido=params.apellido;
    usuario.apellidoM=params.apellidoM;
    usuario.telefono=params.telefono;
    usuario.escuela=params.escuela;
    usuario.fechaI=params.fechaI;
    usuario.fechaF=params.fechaF;
    
    //Guarda los valores 
    if (usuario.correo!=null && usuario.nombre!=null && usuario.apellido!=null && usuario.apellidoM!=null && usuario.telefono!=null && usuario.escuela!=null) {
        usuario.save((err,usuarioAlmacenado)=>{
            if(err){
                res.status(500).send({messagge: 'Error al guardar el usuario'})
            }else{
                if(!usuarioAlmacenado){
                    res.status(404).send({messagge:'No se ha registrado el usuario'});
                }else{
                    res.status(200).send({message: 'Registro realizado'});
                    console.log(usuarioAlmacenado);
                    console.log("Fin registro\n\n")
                }
            }
        });
    }else{
        res.status(200).send({message: 'Faltan campos'});
    }
}

function accesoUsuario(req, res) {
    var params = req.body;
    var correo = params.correo;

    usuariosModelo.findOne({ correo: correo }, (err, user) => {
        if (err) {
            res.status(500).send({ mesagge: 'Error en la peticion al servidor' });
        } else {
            if (!user) {
                res.status(404).send({ mesagge: 'El usuario no existe' });
            } else {
                res.status(200).send({ id: user._id, nombre: user.nombre,apellido: user.apellido, apellidoM: user.apellidoM,telefono: user.telefono,escuela: user.escuela, fechaI: user.fechaI, fechaF: user.fechaF });
                console.log("Inició sesión: "+user.correo);
            }
        }
    });
}

function actualizarUsuario(req, res) { //PUT
    var userId = req.params.id; //GET
    var update = req.body //POST

    usuariosModelo.findByIdAndUpdate(userId, update, (err, userUpdate) => {
        if (err) {
            res.status(500).send({ message: 'Error al actualizar el usuario en el servidor' });
        } else {
            if (!userUpdate) {
                res.status(404).send({ message: 'No se ha podido encontar el usuario' });
            } else {
                res.status(200).send({ message: 'Usuario actualizado' });
            }
        }
    });
}

function subirFoto(req,res){
    console.log(req.file)
    if (req.file.length == 0) {
        responseb.error = true;
        responseb.mensaje = 'Ingrese una imagen';
        responseb.codigo = 400;
        res.status(400).send(responseb);

    } else {
        if (req.file.mimetype.indexOf('image') >= 0) {
            let { fileName } = storeWithOriginalName(req.file)
            responseb.error = true;
            responseb.mensaje = fileName;
            responseb.codigo = 200;
            res.status(200).send(responseb);

        } else {
            responseb.error = true;
            responseb.mensaje = 'Ingrese una imagen';
            responseb.codigo = 400;
            res.status(400).send(responseb);
        }
    }
}


module.exports={
    prueba,
    registroUsuario,
    accesoUsuario,
    actualizarUsuario,
    subirFoto
}