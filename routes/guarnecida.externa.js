'use strict'

var express = require('express');
var GuarnecidaExternaController = require('../controllers/guarnecida.externa');

var api = express.Router();
var md_auth = require('../middlewares/authenticated');

api.post('/guarnecida-externa', md_auth.ensureAuth, GuarnecidaExternaController.saveGuarnecidaExterna);

module.exports = api;