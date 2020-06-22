'user strict'

var express = require('express');
var Injection2Controller = require('../controllers/injection2');

var api = express.Router();
var md_auth = require('../middlewares/authenticated');


api.post('/injection2', md_auth.ensureAuth, Injection2Controller.saveInjection2);

module.exports = api;