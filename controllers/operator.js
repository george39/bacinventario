'use strict'

var fs = require('fs');
var path = require('path');

var Operator = require('../models/operator');

function saveOperator(request, response) {
    var operator = new Operator();
    var params = request.body;

    if (params.name) {

        operator.name = params.name;
        operator.lastname = params.lastname;
        operator.section = params.section;
        // operator.user_id = request.user.sub;

        operator.save((error, operatorStored) => {
            if (error) {
                response.status(500).send({
                    message: 'Error en el servidor'
                });
            } else {
                if (!operatorStored) {
                    response.status(404).send({
                        message: 'No se ha podido guardar los archivos'
                    });
                } else {
                    response.status(200).send({
                        operator: operatorStored
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


function getOperators(request, response) {
    Operator.find({}).populate({ path: 'user_id' }).exec((error, operators) => {
        if (error) {
            response.status(500).send({
                message: 'Error en la peticion'
            });
        } else {
            if (!operators) {
                response.stutus(404).send({
                    message: 'No hay tareas'
                });
            } else {
                response.status(200).send({
                    operators
                });

            }
        }
    });
}

module.exports = {
    saveOperator,
    getOperators
}