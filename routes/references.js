'use strict'


//acciones
var express = require('express');
var ReferencesController = require('../controllers/references');

var api = express.Router();
var md_auth = require('../middlewares/authenticated');

var multipart = require('connect-multiparty');

api.get('/pruebas-references', md_auth.ensureAuth, ReferencesController.pruebas);
api.get('/references', ReferencesController.getReferences);
api.post('/save-reference', md_auth.ensureAuth, ReferencesController.saveReference);

module.exports = api;