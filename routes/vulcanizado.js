'use strict'

var express = require('express');
var VulcanizadoController = require('../controllers/vulcanizado');

var api = express.Router();
var md_auth = require('../middlewares/authenticated');

api.post('/vulcanizado', md_auth.ensureAuth, VulcanizadoController.saveVulcanizado);

module.exports = api;