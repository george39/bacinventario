'use strict'

var express = require('express');
var TroqueladoController = require('../controllers/troquelado');
var api = express.Router();

var md_auth = require('../middlewares/authenticated');

var md_auth = require('../middlewares/authenticated');
var md_admin = require('../middlewares/is_admin');

api.post('/troquelado', [md_auth.ensureAuth, md_admin.isAdmin], TroqueladoController.saveTroquelado);
api.delete('/deleteTroquelado/:id', TroqueladoController.deleteTroquelado);

module.exports = api;