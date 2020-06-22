'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var AutoIncrement = require('mongoose-sequence')(mongoose);

var TroqueladoSchema = Schema({
    _id: Number,
    operator: String,
    name: String,
    size: String,
    reference: String,
    quantity: Number,
    date: { type: Date, default: Date.now() },
    user_id: { type: Schema.ObjectId, ref: 'User' }

}, {
    _id: false

});

TroqueladoSchema.plugin(AutoIncrement);

module.exports = mongoose.model('Troquelado', TroqueladoSchema);