'use strict'

var fs = require('fs');
var path = require('path');

var Troquelado = require('../models/troquelado');

function saveTroquelado(request, response) {
    var troquelado = new Troquelado();
    var params = request.body;

    if (params.name) {
        troquelado.operator = params.operator;
        troquelado.name = params.name;
        troquelado.size = params.size;
        troquelado.reference = params.reference;
        troquelado.quantity = params.quantity;
        troquelado.user_id = request.user.sub;

        troquelado.save((error, troqueladoStored) => {
            if (error) {
                response.status(500).send({
                    message: 'Error en el servidor'
                });
            } else {
                if (!troqueladoStored) {
                    response.status(404).send({
                        message: 'No se han podido guardarr los datos'
                    });
                } else {
                    response.status(200).send({
                        troquelado: troqueladoStored
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

function deleteTroquelado(request, response) {
    var troqueladoId = request.params.id;

    Troquelado.findByIdAndRemove(troqueladoId, (error, troqueladoRemoved) => {
        if (error) {
            response.status(500).send({
                message: 'Error en la peticion'
            });
        } else {
            if (!troqueladoRemoved) {
                response.status(404).send({
                    message: 'La tarea no existe'
                });
            } else {
                response.status(200).send({
                    troquelado: troqueladoRemoved
                });
            }
        }

    });
}

module.exports = {
    saveTroquelado,
    deleteTroquelado
}