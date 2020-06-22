'use strict'

var express = require('express');
var api = express.Router();

var ReprocesoController = require('../controllers/reproceso.cj');

var md_auth = require('../middlewares/authenticated');

api.post('/reproceso', md_auth.ensureAuth, ReprocesoController.saveReproceso);

module.exports = api;