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

    var guarnecidaInterna = request.params.id;
    var war = request.params;
    var update = request.body._id;
    var codigo = request.body.code;
    var idGuarnecida = request.body.id;


    GuarnecidaInterna.findByIdAndUpdate(update, { "$pull": { "registros": { "code": codigo } } }, { safe: true, multi: true }, (err, guarnecida) => {

        if (err) {
            return response.status(500).json({
                ok: false,
                mensaje: 'Error al buscar usuario',
                errors: err
            });
        } else {
            if (!guarnecida) {
                return response.status(404).json({
                    ok: false,
                    mensaje: "el codigo no existe"
                });
            } else {

                response.status(200).json({
                    ok: true,
                    guarnecidaInterna: guarnecida
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
    getGuarnecidas,

}