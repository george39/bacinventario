'use strict'


var fs = require('fs');
var path = require('path');


var Warehouse1 = require('../models/warehouse1');

function pruebas(request, response) {
    response.status(200).send({
        message: 'Probando el controlador de warehouse1'
    });
}

function saveWarehouse1(request, response) {
    var warehouse1 = new Warehouse1();
    var params = request.body;
    var rg = params.registros;

    if (params.registros) {


        warehouse1.registros = params.registros;
        warehouse1.date = params.date;
        warehouse1.clasification = params.clasification;
        warehouse1.user_id = request.user.sub;



        warehouse1.save((error, warehouse1Stored) => {
            if (error) {
                response.status(500).send({
                    message: 'Error en el servidor'
                });
            } else {
                if (!warehouse1Stored) {
                    response.status(404).send({
                        message: 'No se ha podido crear el registro'
                    });
                } else {
                    response.status(200).send({
                        Warehouse1: warehouse1Stored
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

function getWarehouses1(request, response) {
    Warehouse1.find({}).populate({ path: 'user_id' }).exec((error, warehouse1) => {
        if (error) {
            response.status(500).send({
                message: 'Error en la peticion'
            });
        } else {
            if (!warehouse1) {
                response.status(404).send({
                    message: 'No hay tareas'
                });
            } else {



                response.status(200).send({
                    warehouse1
                });




            }
        }
    });
}

function getWarehouse1(request, response) {
    var warehouse1Id = request.params.id;

    Warehouse1.findById(warehouse1Id).populate({ path: 'user_id' }).exec((error, warehouse1) => {
        if (error) {
            response.status(500).send({
                message: 'Error en la peticion'
            });
        } else {
            if (!warehouse1) {
                response.status(404).send({
                    message: 'La tarea no existe'
                });
            } else {
                response.status(200).send({
                    warehouse1
                });
            }
        }
    });
}


function updateWarehouses1(request, response) {

    var warehouse1Id = request.params.id;
    var war = request.params;
    var update = request.body._id;
    var codigo = request.body.code;
    var idWarehouse = request.body.id;


    Warehouse1.findByIdAndUpdate(update, { "$pull": { "registros": { "code": codigo } } }, { safe: true, multi: true }, (err, warehouse1) => {

        if (err) {
            return response.status(500).json({
                ok: false,
                mensaje: 'Error al buscar usuario',
                errors: err
            });
        } else {
            if (!warehouse1) {
                return response.status(404).json({
                    ok: false,
                    mensaje: "el codigo no existe"
                });
            } else {

                response.status(200).json({
                    ok: true,
                    warehouse: warehouse1
                });
            }
        }

    });

}


function deleteWarehouse(request, response) {
    var warehouse1Id = request.params.id;

    Warehouse1.findByIdAndRemove(warehouse1Id, (error, warehouse1Removed) => {
        if (error) {
            response.status(500).send({
                message: 'Error en la peticion'
            });
        } else {
            if (!warehouse1Removed) {
                response.status(404).send({
                    message: 'La tarea no existe'
                });
            } else {
                response.status(200).send({
                    warehouse1: warehouse1Removed
                });
            }
        }

    });
}

module.exports = {
    pruebas,
    saveWarehouse1,
    getWarehouses1,
    getWarehouse1,
    updateWarehouses1,
    deleteWarehouse
};