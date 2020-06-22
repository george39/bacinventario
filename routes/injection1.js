'use strict'

var express = require('express');
var Injection1Controller = require('../controllers/injection1');

var api = express.Router();
var md_auth = require('../middlewares/authenticated');

api.post('/injection1', md_auth.ensureAuth, Injection1Controller.saveInjection1);

module.exports = api;