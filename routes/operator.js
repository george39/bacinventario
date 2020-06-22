'use strict'

var express = require('express');
var OperatorController = require('../controllers/operator');

var api = express.Router();
var md_auth = require('../middlewares/authenticated');

api.post('/operator', OperatorController.saveOperator);
api.get('/getoperator', OperatorController.getOperators);

module.exports = api;