'use strict'


//acciones
var express = require('express');
var HomeworkController = require('../controllers/homework');
var Warehouse1Controller = require('../controllers/warehouse1');
var Warehouse2Controller = require('../controllers/warehouse2');
var GuarnecidaController = require('../controllers/guarnecida.interna');

var api = express.Router();
var md_auth = require('../middlewares/authenticated');
var md_admin = require('../middlewares/is_admin');
var md_homework = require('../middlewares/is_homework');
var md_warehouse1 = require('../middlewares/warehouse1');
var md_warehouse1 = require('../middlewares/warehouse2');
var md_guarnecida = require('../middlewares/guarnecida');


api.get('/pruebas-homework', md_auth.ensureAuth, HomeworkController.pruebas);
api.post('/homework', [md_auth.ensureAuth, md_admin.isAdmin], HomeworkController.saveHomework);
api.get('/gethomeworks', HomeworkController.getHomeworks);
api.get('/gethomework/:id', HomeworkController.getHomework);
api.put('/update-homework/:id', [md_auth.ensureAuth, md_admin.isAdmin], HomeworkController.updateHomework);
api.delete('/delete-homework/:id', [md_auth.ensureAuth, md_admin.isAdmin], HomeworkController.deleteHomework);


module.exports = api;