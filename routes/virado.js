'use strict'

var express = require('express');
var ViradoController = require('../controllers/virado');

var api = express.Router();
var md_auth = require('../middlewares/authenticated');

api.post('/virado', md_auth.ensureAuth, ViradoController.saveVirado);

module.exports = api;