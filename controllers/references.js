'use strict'


var fs = require('fs');
var path = require('path');

var Warehouse1 = require('../models/references');
var Reference = require('../models/references');

function pruebas(request, response) {
    response.status(200).send({
        message: 'Probando el controlador de referencias',
        user: request.user
    });
}

function saveReference(request, response) {
    var reference = new Reference();

    var params = request.body;
    if (params.name) {
        reference.name = params.name;
        reference.code = params.code;
        reference.forradura = params.forradura;
        reference.capellada = params.capellada;
        reference.suela = params.suela;
        reference.user_id = request.user.sub;

        reference.save((error, referenceStored) => {
            if (error) {
                response.status(500).send({
                    message: 'Error en el servidor'
                });
            } else {
                if (!referenceStored) {
                    response.status(404).send({
                        message: 'No se ha podido guardar el animal'
                    });
                } else {
                    response.status(200).send({
                        reference: referenceStored
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



function getReferences(request, response) {
    Reference.find({}).populate({ path: 'user_id' }).exec((error, reference) => {
        if (error) {
            response.status(500).send({
                message: 'Error en la peticion'
            });
        } else {
            if (!reference) {
                response.stutus(404).send({
                    message: 'No hay tareas'
                });
            } else {
                response.status(200).send({
                    reference
                });

            }
        }
    });
}


module.exports = {
    pruebas,
    saveReference,
    getReferences
};