'use strict'

var fs = require('fs');
var path = require('path');
var moment = require('moment');


var Homework = require('../models/homework');

function pruebas(reuqest, response) {
    response.status(200).send({
        message: 'controlador de tareas'
    });
}

function saveHomework(request, response) {
    var homework = new Homework();
    var params = request.body;


    if (params.name) {
        homework.operator = params.operator;
        homework.name = params.name;
        homework.size = params.size;
        homework.reference = params.reference;
        //homework.date = moment().unix();
        homework.quantity = params.quantity;
        homework.treintaytres = params.treintaytres;
        homework.treintaycuatro = params.treintaycuatro;
        homework.treintaycinco = params.treintaycinco;
        homework.treintayseis = params.treintayseis;
        homework.treintaysiete = params.treintaysiete;
        homework.treintayocho = params.treintayocho;
        homework.treintaynueve = params.treintaynueve;
        homework.cuarenta = params.cuarenta;
        homework.cuarentayuno = params.cuarentayuno;
        homework.cuarentaydos = params.cuarentaydos;
        homework.cuarentaytres = params.cuarentaytres;
        homework.cuarentaycuatro = params.cuarentaycuatro;
        homework.cuarentaycinco = params.cuarentaycinco;
        homework.cuarentayseis = params.cuarentayseis;
        homework.cuarentaysiete = params.cuarentaysiete;
        homework.user_id = request.user.sub;
        homework.save((error, homeworkStored) => {


            if (error) {
                response.status(500).send({
                    message: 'Error en el servidor'
                });
            } else {
                if (!homeworkStored) {
                    response.status(404).send({
                        message: 'No se ha podido crear la tarea'
                    });

                } else {

                    response.status(200).send({
                        homework: homeworkStored,
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

function getHomeworks(request, response) {
    Homework.find({}).populate({ path: 'user_id' }).exec((error, homeworks) => {
        if (error) {
            response.status(500).send({
                message: 'Error en la peticion'
            });
        } else {
            if (!homeworks) {
                response.stutus(404).send({
                    message: 'No hay tareas'
                });
            } else {
                response.status(200).send({
                    homeworks
                });

            }
        }
    });
}

function getHomework(request, response) {
    var homeworkId = request.params.id;

    Homework.findById(homeworkId).populate({ path: 'user_id' }).exec((error, homework) => {
        if (error) {
            response.status(500).send({
                message: 'Error en la peticion'
            });
        } else {
            if (!homework) {
                response.status(404).send({
                    message: 'La tarea no existe'
                });
            } else {
                response.status(200).send({
                    homework
                });
            }
        }
    });
}

function updateHomework(request, response) {
    var homeworkId = request.params.id;
    var update = request.body;

    Homework.findByIdAndUpdate(homeworkId, update, { new: true }, (error, homeworkUpdated) => {
        if (error) {
            response.status(500).send({
                message: 'Error en la peticion'
            });
        } else {
            if (!homeworkUpdated) {
                response.status(404).send({
                    message: 'No se ha actualizado la tarea'
                });
            } else {
                response.status(200).send({
                    homework: homeworkUpdated
                })
            }
        }
    });
}

function deleteHomework(request, response) {
    var homeworkId = request.params.id;

    Homework.findByIdAndRemove(homeworkId, (error, homeworkRemoved) => {
        if (error) {
            response.status(500).send({
                message: 'Error en la peticion'
            });
        } else {
            if (!homeworkRemoved) {
                response.status(404).send({
                    message: 'La tarea no existe'
                });
            } else {
                response.status(200).send({
                    homework: homeworkRemoved
                });
            }
        }

    });
}


module.exports = {
    pruebas,
    saveHomework,
    getHomeworks,
    getHomework,
    updateHomework,
    deleteHomework
};