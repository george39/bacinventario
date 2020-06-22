'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var autoIncrement = require('mongoose-auto-increment');

var AutoIncrement = require('mongoose-sequence')(mongoose);
var Sequelize = require('sequelize');


var con = mongoose.createConnection('mongodb://localhost/alpaca');
autoIncrement.initialize(con);

var Warehouse1Schema = Schema({


    date: { type: Date, default: Date.now() },
    clasification: String,
    registros: { type: Array },
    user_id: { type: Schema.ObjectId, ref: 'User' }

});
Warehouse1Schema.plugin(autoIncrement.plugin, 'Warehouse1');


module.exports = mongoose.model('Warehouse1', Warehouse1Schema);