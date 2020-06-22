var express = require('express');

var app = express();

var Warehouse1 = require('../models/warehouse1');
var Warehouse2 = require('../models/warehouse2');
var Injection1 = require('../models/injection1');
var Injection2 = require('../models/injection2');
var Ojaleteado = require('../models/ojaleteado');
var Strobell = require('../models/strobell');
var Terminacion = require('../models/terminacion');
var Cementado = require('../models/cementado');
var Vulcanizado = require('../models/vulcanizado');
var GuarnecidaExterna = require('../models/guarnecida.externa');
var GuarnecidaInterna = require('../models/guarnecida.interna');
var Virado = require('../models/virado');
var TareaUnidad = require('../models/tareaUnidad');
var ReprocesoCarlosJ = require('../models/reproceso.carlos.julio');

app.get('/todo/:busqueda', (req, res, nest) => {

    var busqueda = req.params.busqueda;
    var regex = new RegExp(busqueda, 'i');

    Promise.all([
            buscarTroquelado(busqueda, regex),
            buscarGuarnecidaInterna(busqueda, regex.registros),
            buscarGuarnecidaExterna(busqueda, regex.registros),
            buscarWarehouse1(busqueda, regex.registros),
            buscarOjaleteado(busqueda, regex.registros),
            buscarStrobell(busqueda, regex.registros),
            buscarInjection1(busqueda, regex.registros),
            buscarWarehouse2(busqueda, regex.registros),
            buscarTerminado(busqueda, regex.registros),
            buscarVulcanizado(busqueda, regex.registros),
            buscarReproceso(busqueda, regex.registros),
            buscarInjection2(busqueda, regex.registros),
            buscarCementado(busqueda, regex.registros)


        ])
        .then(respuestas => {
            res.status(200).json({
                ok: true,
                tareaUnidad: respuestas[0],
                guarnecidaInterna: respuestas[1],
                guarnecidaExterna: respuestas[2],
                warehouse1: respuestas[3],
                warehouse2: respuestas[4],
                ojaleteado: respuestas[5],
                injection1: respuestas[6],
                injection2: respuestas[7],
                cementado: respuestas[8],
                strobell: respuestas[9],
                termination: respuestas[10],
                reproceso: respuestas[11],
                vulcanizado: respuestas[12],
            });

        });

});

// ================================================
// Busqueda general de todo 
// ================================================


function buscarWarehouse1(busqueda, regex) {
    return new Promise((resolve, reject) => {
        Warehouse1.find({ reference: regex }, (err, warehouse1) => {
            if (err) {
                reject('Error al cargar wahehouse1', err);
            } else {
                resolve(warehouse1)
            }
        });
    });
}

function buscarWarehouse2(busqueda, regex) {
    return new Promise((resolve, reject) => {
        Warehouse2.find({ reference: regex }, (err, warehouse2) => {
            if (err) {
                reject('Error al cargar wahehouse2', err);
            } else {
                resolve(warehouse2)
            }
        });
    });
}

function buscarInjection1(busqueda, regex) {
    return new Promise((resolve, reject) => {
        Injection1.find({ reference: regex }, (err, injection1) => {
            if (err) {
                reject('Error al cargar Injeccion1', err);
            } else {
                resolve(injection1)
            }
        });
    });
}


function buscarInjection2(busqueda, regex) {
    return new Promise((resolve, reject) => {
        Injection2.find({ reference: regex }, (err, injection2) => {
            if (err) {
                reject('Error al cargar Injeccion2', err);
            } else {
                resolve(injection2)
            }
        });
    });
}

function buscarCementado(busqueda, regex) {
    return new Promise((resolve, reject) => {
        Cementado.find({ reference: regex }, (err, cementado) => {
            if (err) {
                reject('Error al cargar Cementado', err);
            } else {
                resolve(cementado)
            }
        });
    });
}


function buscarTroquelado(busqueda, regex) {
    return new Promise((resolve, reject) => {
        TareaUnidad.find({ reference: regex }, (err, tareaUnidad) => {
            if (err) {
                reject('Error al cargar tareaUnidad', err);
            } else {
                resolve(tareaUnidad)
            }
        });
    });
}

function buscarGuarnecidaInterna(busqueda, regex) {
    return new Promise((resolve, reject) => {
        GuarnecidaInterna.find({ reference: regex }, (err, guarnecidaInterna) => {
            if (err) {
                reject('Error al cargar guarnInterna', err);
            } else {
                resolve(guarnecidaInterna)
            }
        });
    });
}


function buscarGuarnecidaExterna(busqueda, regex) {
    return new Promise((resolve, reject) => {
        GuarnecidaExterna.find({ reference: regex }, (err, guarnecidaExterna) => {
            if (err) {
                reject('Error al cargar guarn externa', err);
            } else {
                resolve(guarnecidaExterna)
            }
        });
    });
}


function buscarOjaleteado(busqueda, regex) {
    return new Promise((resolve, reject) => {
        Ojaleteado.find({ reference: regex }, (err, ojaleteado) => {
            if (err) {
                reject('Error al cargar ojaleteado', err);
            } else {
                resolve(ojaleteado)
            }
        });
    });
}


function buscarStrobell(busqueda, regex) {
    return new Promise((resolve, reject) => {
        Strobell.find({ reference: regex }, (err, strobell) => {
            if (err) {
                reject('Error al cargar strobell', err);
            } else {
                resolve(strobell)
            }
        });
    });
}


function buscarTerminado(busqueda, regex) {
    return new Promise((resolve, reject) => {
        Terminacion.find({ reference: regex }, (err, termination) => {
            if (err) {
                reject('Error al cargar termination', err);
            } else {
                resolve(termination)
            }
        });
    });
}



function buscarReproceso(busqueda, regex) {
    return new Promise((resolve, reject) => {
        ReprocesoCarlosJ.find({ reference: regex }, (err, reproceso) => {
            if (err) {
                reject('Error al cargar reproceso', err);
            } else {
                resolve(reproceso)
            }
        });
    });
}


function buscarVulcanizado(busqueda, regex) {
    return new Promise((resolve, reject) => {
        Vulcanizado.find({ reference: regex }, (err, vulcanizado) => {
            if (err) {
                reject('Error al cargar vulcanizado', err);
            } else {
                resolve(vulcanizado)
            }
        });
    });
}



// ================================================
// Busqueda especifica 
// ================================================
app.get('/coleccion/:tabla/:busqueda', (req, res) => {
    var busqueda = req.params.busqueda;
    var tabla = req.params.tabla;
    var regex = new RegExp(busqueda, 'i');

    var promesa;

    switch (tabla) {
        case 'troquelado':
            promesa = buscarTroquelado(busqueda, regex)
            break;

        case 'guarnedida.interna':
            promesa = buscarGuarnecidaI(busqueda, regex)
            break;

        case 'warehouse1':
            promesa = buscarWarehouse1(busqueda, regex)
            break;

        case 'warehouse2':
            promesa = guscarWarehouse2(busqueda, regex)
            break;
        case 'cementado':
            promesa = guscarCementado(busqueda, regex)
            break;

        case 'injection1':
            promesa = buscarInjection1(busqueda, regex)
            break;

        case 'injection2':
            promesa = buscarInjection2(busqueda, regex)
            break;

        case 'ojaleteado':
            promesa = buscarOjaleteado(busqueda, regex)
            break;

        case 'reproceso.cj':
            promesa = buscarReprocesoCj(busqueda, regex)
            break;

        case 'strobell':
            promesa = guscarStrobell(busqueda, regex)
            break;

        case 'terminacion':
            promesa = buscarTerminacion(busqueda, regex)
            break;

        case 'vulcanizado':
            promesa = buscarVulcanizado(busqueda, regex)
            break;

        default:
            return res.status(400).json({
                ok: false,
                mensaje: 'Los tipos de busqueda solo son, almacenes, troquelado, guarnecida e inyecciones',
                error: { message: 'Tipo de tabla/coleccion no válida' }


            });


    }

    promesa.then(data => {
        res.status(200).json({
            ok: true,
            [tabla]: data
        });
    });
});


module.exports = app;