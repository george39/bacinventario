'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var StrobelSchema = Schema ({
	operator: String,
	name: String,
	size: String,
	quantity: String,
	reference: String,
	date: {type: Date, default: Date.now()},
	homework: { type: Schema.ObjectId, ref: 'Homework'},
	user_id: { type: Schema.ObjectId, ref: 'User'}
});

module.exports = mongoose.model('Strobell', StrobelSchema);