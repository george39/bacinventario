'use strict'

var express = require('express');
var bodyParser = require('body-parser');

var app = express();

//cargar rutas
var user_routes = require('./routes/user');
var warehouse1_routes = require('./routes/warehouse1');
var references_ruoutes = require('./routes/references');
var homework_ruoutes = require('./routes/homework');
var injection1_ruoutes = require('./routes/injection1');
var injection2_ruoutes = require('./routes/injection2');
var guarnecidaExt_routes = require('./routes/guarnecida.externa');
var guarnecidaInt_routes = require('./routes/guarnecida.interna');
var warehouse2_routes = require('./routes/warehouse2');
var cementado_routes = require('./routes/cementado');
var clasification_routes = require('./routes/clasification');
var ojaleteado_routes = require('./routes/ojaleteado');
var reproceso_routes = require('./routes/reproceso.cj');
var strobell_routes = require('./routes/strobell');
var terminacion_routes = require('./routes/terminacion');
var troquelado_routes = require('./routes/troquelado');
var virado_routes = require('./routes/virado');
var vulcanizado_routes = require('./routes/vulcanizado');
var busqueda = require('./routes/busqueda');
var tareaUnidad = require('./routes/tareaUnidad');
var operator = require('./routes/operator');





//middlewares de body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//configurar cabeceras y cors
app.use((request, response, next) => {
    response.header('Access-Control-Allow-Origin', '*');
    response.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    response.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    response.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});


//rutas base
app.use('/', user_routes);
app.use('/', warehouse1_routes);
app.use('/', references_ruoutes);
app.use('/', homework_ruoutes);
app.use('/', injection1_ruoutes);
app.use('/', injection2_ruoutes);
app.use('/', guarnecidaExt_routes);
app.use('/', guarnecidaInt_routes);
app.use('/', warehouse2_routes);
app.use('/', cementado_routes);
app.use('/', clasification_routes);
app.use('/', ojaleteado_routes);
app.use('/', reproceso_routes);
app.use('/', strobell_routes);
app.use('/', terminacion_routes);
app.use('/', troquelado_routes);
app.use('/', virado_routes);
app.use('/', vulcanizado_routes);
app.use('/', operator);

app.use('/busqueda', busqueda);
app.use('/', tareaUnidad);


module.exports = app;