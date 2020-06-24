'use strict'

var express = require('express');
var OjaleteadoController = require('../controllers/ojaleteado');

var api = express.Router();
var md_auth = require('../middlewares/authenticated');

api.post('/ojaleteado', OjaleteadoController.saveOjaleteado);
api.put('/delete-item-ojaleteado', md_auth.ensureAuth, OjaleteadoController.deleteItemOjaleteado);
api.get('/getojaleteado', OjaleteadoController.getOjaleteado);
api.get('/deleteojaleteado', OjaleteadoController.deleteOjaleteado);

module.exports = api;