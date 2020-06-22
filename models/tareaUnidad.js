'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TareaUnidadSchema = Schema({
    operator: String,
    name: String,
    reference: String,
    size: String,
    code: String,
    quantity: Number,
    date: { type: Date, default: Date.now() },
    homework_id: { type: Schema.ObjectId, ref: 'Homework' },
    user_id: { type: Schema.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('TareaUnidad', TareaUnidadSchema);