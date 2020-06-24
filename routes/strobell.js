'use strict'

var express = require('express');
var api = express.Router();

var StrobellController = require('../controllers/strobell');
var md_auth = require('../middlewares/authenticated');

api.post('/addstrobell', md_auth.ensureAuth, StrobellController.saveStrobell);
api.get('/getstrobell', StrobellController.getStrobell);

module.exports = api;