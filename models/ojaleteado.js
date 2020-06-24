'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var OjaleteadoSchema = Schema({

    operator: String,
    registros: { type: Array },
    date: { type: Date, default: Date.now() },
    homework_id: { type: Schema.ObjectId, ref: 'Homework' },
    user_id: { type: Schema.ObjectId, ref: 'User' }

});

module.exports = mongoose.model('Ojaleteado', OjaleteadoSchema);