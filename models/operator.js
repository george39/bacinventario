'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var OperatorSchema = Schema({

    name: String,
    lastname: String,
    section: String,
    date: { type: Date, default: Date.now() },
    user_id: { type: Schema.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('Operator', OperatorSchema);