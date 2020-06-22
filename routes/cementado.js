'use strict'

var express = require('express');
var CementadoController = require('../controllers/cementado');

var api = express.Router();
var md_auth = require('../middlewares/authenticated');

api.post('/cementado', md_auth.ensureAuth, CementadoController.saveCementado);

module.exports = api;