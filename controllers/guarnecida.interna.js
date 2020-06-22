'use strict'

var fs = require('fs');
var path = require('path');
var moment = require('moment');

var GuarnecidaInterna = require('../models/guarnecida.interna');

function saveGuarnecidaInterna(request, response) {
    var guarnecidaInterna = new GuarnecidaInterna();
    var params = request.body;

    if (params.registros) {
        guarnecidaInterna.operator = params.operator;
        guarnecidaInterna.date = params.date;
        guarnecidaInterna.registros = params.registros;
        //guarnecidaInterna.date = params.date;//moment().unix();
        guarnecidaInterna.user_id = request.user.sub;

        guarnecidaInterna.save((error, guarnecidaInternaStored) => {
            if (error) {
                response.status(500).send({
                    message: 'Error en el servidor'
                });
            } else {
                if (!guarnecidaInternaStored) {
                    response.status(404).send({
                        message: 'No se ha podido guardar el registro'
                    });
                } else {
                    response.status(200).send({
                        guarnecidaInterna: guarnecidaInternaStored
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


function deleteItemGuarnecida(request, response) {
    var guarnecidaId = request.params.id;
    var guarnecidaCode = request.params.registros;
    var update = request.body;
    var s = GuarnecidaInterna.name;
    console.log(s);

    GuarnecidaInterna.findOneAndUpdate(guarnecidaId, update, { 'new': true }, (error, itemRemoved) => {

        if (error) {
            response.status(500).send({
                message: 'Error en la peticion'
            });
        } else {
            if (!itemRemoved) {
                response.status(404).send({
                    message: 'La tarea no existe',
                });
                console.log(itemRemoved);
            } else {
                response.status(200).send({
                    troquelado: itemRemoved

                });
            }
        }

    });
}

function getGuarnecidas(request, response) {
    GuarnecidaInterna.find({}).populate({ path: 'user_id' }).exec((error, guarnecidaInterna) => {
        if (error) {
            response.status(500).send({
                message: 'Error en la peticion'
            });
        } else {
            if (!guarnecidaInterna) {
                response.stutus(404).send({
                    message: 'No hay tareas'
                });
            } else {
                response.status(200).send({
                    guarnecidaInterna
                });

            }
        }
    });
}

module.exports = {
    saveGuarnecidaInterna,
    deleteItemGuarnecida,
    getGuarnecidas
}