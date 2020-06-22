'use strict'

var express = require('express');
var api = express.Router();

var StrobellController = require('../controllers/strobell');
var md_auth = require('../middlewares/authenticated');

api.post('/strobell', md_auth.ensureAuth, StrobellController.saveStrobell);

module.exports = api;
