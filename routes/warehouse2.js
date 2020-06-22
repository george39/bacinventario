'use strict'

var express = require('express');
var Warehouse2Controller = require('../controllers/warehouse2');

var api = express.Router();
var md_auth = require('../middlewares/authenticated');

api.post('/warehouse2', md_auth.ensureAuth, Warehouse2Controller.saveWarehouse2);

module.exports = api; 
