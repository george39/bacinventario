'use strict'


//acciones
var express = require('express');
var Warehouse1Controller = require('../controllers/warehouse1');
var TroqueladoController = require('../controllers/troquelado');

var api = express.Router();
var md_auth = require('../middlewares/authenticated');
var md_register = require('../middlewares/warehouse1');

var multipart = require('connect-multiparty');

api.get('/pruebas-warehouse1', md_auth.ensureAuth, Warehouse1Controller.pruebas);
api.post('/warehouse1', md_auth.ensureAuth, Warehouse1Controller.saveWarehouse1);
api.post('/add-register', [md_auth.ensureAuth, md_register.Almacen1], Warehouse1Controller.saveWarehouse1);
api.get('/getwarehouses1', Warehouse1Controller.getWarehouses1);
api.put('/updatewarehouse1', Warehouse1Controller.updateWarehouses1);
api.delete('/deletewarehouse1/:id', Warehouse1Controller.deleteWarehouse);



module.exports = api;