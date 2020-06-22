'use strict'

var fs = require('fs');
var path = require('path');

var TareaUnidad = require('../models/tareaUnidad');


function saveTareaUnidad(request, response) {
    var tareau = new TareaUnidad();
    var params = request.body;



    if (params.name) {
        tareau.operator = params.opereator;
        tareau.name = params.name;
        tareau.reference = params.reference;
        tareau.size = params.size;
        tareau.code = params.code;
        tareau.quantity = 0.5;
        tareau.user_id = request.user.sub;

        tareau.save((error, tareauStored) => {
            if (error) {
                response.status(500).send({
                    message: 'Error en el servidor'
                });
            } else {
                if (!tareauStored) {
                    response.status(404).send({
                        message: 'No se ha podido guardar los archivos'
                    });
                } else {
                    response.status(200).send({
                        tareau: tareauStored
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


function getHomeworkUnit(request, response) {
    TareaUnidad.find({}).populate({ path: 'user_id' }).exec((error, tareaUnidad) => {
        if (error) {
            response.status(500).send({
                message: 'Error en la peticion'
            });
        } else {
            if (!tareaUnidad) {
                response.stutus(404).send({
                    message: 'No hay tareas'
                });
            } else {
                response.status(200).send({
                    tareaUnidad
                });

            }
        }
    });
}





function deleteTareaUnidad(request, response) {
    var tareaUnidadId = request.params.id;
    var tareaUnidadCode = request.params.code;


    if (tareaUnidadCode === TareaUnidad.code) {
        TareaUnidad.findByIdAndRemove(tareaUnidadId, (error, tareaUnidadRemoved) => {
            if (error) {
                response.status(500).send({
                    message: 'Error en la peticion'
                });
            } else {
                if (!tareaUnidadRemoved) {
                    response.status(404).send({
                        message: 'La tarea no existe'
                    });
                } else {
                    response.status(200).send({
                        tareaUnidad: tareaUnidadRemoved
                    });
                }
            }

        });
    }
}

module.exports = {
    saveTareaUnidad,
    getHomeworkUnit,
    deleteTareaUnidad,

}