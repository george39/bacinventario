'use strict'

var fs = require('fs');
var path = require('path');

var Strobell = require('../models/strobell');

function saveStrobell(request, response) {
    var strobell = new Strobell();
    var params = request.body;

    if (params.registros) {
        strobell.operator = params.operator;
        strobell.date = params.date;
        strobell.registros = params.registros;

        strobell.save((error, strobellStored) => {
            if (error) {
                response.status(500).send({
                    message: 'Error en el servidor'
                });
            } else {
                if (!strobellStored) {
                    response.status(404).send({
                        message: 'No se han podido guardar los datos'
                    });
                } else {
                    response.status(200).send({
                        strobell: strobellStored
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


function getStrobell(request, response) {
    Strobell.find({}).populate({ path: 'user_id' }).exec((error, strobell) => {
        if (error) {
            response.status(500).send({
                message: 'Error en la peticion'
            });
        } else {
            if (!strobell) {
                response.stutus(404).send({
                    message: 'No hay tareas'
                });
            } else {
                response.status(200).send({
                    strobell
                });

            }
        }
    });
}


module.exports = {
    saveStrobell,
    getStrobell
}