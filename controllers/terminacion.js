'use strict'

var fs = require('fs');
var path = require('path');

var Terminacion = require('../models/terminacion');

function saveTerminacion(request, response) {
    var termination = new Terminacion();
    var params = request.body;
    var rg = params.registros;

    if (params.registros) {


        termination.registros = params.registros;
        termination.operator = params.operator;
        termination.date = params.date;
        termination.clasification = params.clasification;
        // termination.user_id = request.user.sub;



        termination.save((error, terminationStored) => {
            if (error) {
                response.status(500).send({
                    message: 'Error en el servidor'
                });
            } else {
                if (!terminationStored) {
                    response.status(404).send({
                        message: 'No se ha podido crear el registro'
                    });
                } else {
                    response.status(200).send({
                        Terminacion: terminationStored
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

module.exports = {
    saveTerminacion
}