'use strict'

var express = require('express');
var OjaleteadoController = require('../controllers/ojaleteado');

var api = express.Router();
var md_auth = require('../middlewares/authenticated');

api.post('/ojaleteado', md_auth.ensureAuth, OjaleteadoController.saveOjaleteado);

module.exports = api;
