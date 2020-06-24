'use strict'

var fs = require('fs');
var path = require('path');

var Ojaleteado = require('../models/ojaleteado');

function saveOjaleteado(request, response) {
    var ojaleteado = new Ojaleteado();
    var params = request.body;

    if (params.registros) {
        ojaleteado.operator = params.operator;
        ojaleteado.date = params.date;
        ojaleteado.registros = params.registros;
        //ojaleteado.date = params.date;//moment().unix();
        // ojaleteado.user_id = request.user.sub;

        ojaleteado.save((error, ojaleteadoStored) => {
            if (error) {
                response.status(500).send({
                    message: 'Error en el servidor'
                });
            } else {
                if (!ojaleteadoStored) {
                    response.status(404).send({
                        message: 'No se ha podido guardar el registro'
                    });
                } else {
                    response.status(200).send({
                        ojaleteado: ojaleteadoStored
                    });

                }
            }
        });
    } else {
        response.status(200).send({
            message: 'El nombre es obligatorio'
        });
    }
}




function deleteItemOjaleteado(request, response) {

    var ojaleteado = request.params.id;
    var war = request.params;
    var update = request.body._id;
    var codigo = request.body.code;
    var idOjaleteado = request.body.id;


    Ojaleteado.findByIdAndUpdate(update, { "$pull": { "registros": { "code": codigo } } }, { safe: true, multi: true }, (err, ojaleteado) => {

        if (err) {
            return response.status(500).json({
                ok: false,
                mensaje: 'Error al buscar usuario',
                errors: err
            });
        } else {
            if (!ojaleteado) {
                return response.status(404).json({
                    ok: false,
                    mensaje: "el codigo no existe"
                });
            } else {

                response.status(200).json({
                    ok: true,
                    ojaleteado: ojaleteado
                });
            }
        }

    });

}





function getOjaleteado(request, response) {
    Ojaleteado.find({}).populate({ path: 'user_id' }).exec((error, ojaleteado) => {
        if (error) {
            response.status(500).send({
                message: 'Error en la peticion'
            });
        } else {
            if (!ojaleteado) {
                response.stutus(404).send({
                    message: 'No hay tareas'
                });
            } else {
                response.status(200).send({
                    ojaleteado
                });

            }
        }
    });
}


function deleteOjaleteado(request, response) {
    var ojaleteado = request.params.id;

    Ojaleteado.findByIdAndRemove(ojaleteado, (error, ojaleteadoRemoved) => {
        if (error) {
            response.status(500).send({
                message: 'Error en la peticion'
            });
        } else {
            if (!ojaleteadoRemoved) {
                response.status(404).send({
                    message: 'La tarea no existe'
                });
            } else {
                response.status(200).send({
                    ojaleteado: ojaleteadoRemoved
                });
            }
        }

    });
}

module.exports = {
    saveOjaleteado,
    deleteItemOjaleteado,
    getOjaleteado,
    deleteOjaleteado
}