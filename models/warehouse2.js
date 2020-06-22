'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Warehouse2Schema = Schema ({
	operator: String,
	name: String,
	size: String,
	reference: String,
	date: {type: Date, default: Date.now()},
	clasification: String
});

module.exports = mongoose.model('Warehouse2', Warehouse2Schema);