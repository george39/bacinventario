'use strict'

var express = require('express');
var GuarnecidaInternaController = require('../controllers/guarnecida.interna');

var api = express.Router();
var md_auth = require('../middlewares/authenticated');

api.post('/guarnecida-interna', md_auth.ensureAuth, GuarnecidaInternaController.saveGuarnecidaInterna);
api.put('/deleteitem', md_auth.ensureAuth, GuarnecidaInternaController.deleteItemGuarnecida);
api.get('/getguarnecidas', GuarnecidaInternaController.getGuarnecidas);

module.exports = api;