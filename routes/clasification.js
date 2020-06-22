'use strict'

var express = require('express');
var ClasificationController = require('../controllers/clasification');
var api = express.Router();

var md_auth = require('../middlewares/authenticated');

api.post('/clasification', md_auth.ensureAuth, ClasificationController.saveClasification);

module.exports = api;