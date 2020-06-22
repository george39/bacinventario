'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var AutoIncrement = require('mongoose-sequence')(mongoose);

var TroqueladoSchema = Schema({

    operator: String,
    name: String,
    size: String,
    reference: String,
    quantity: Number,
    date: { type: Date, default: Date.now() },
    ObjectId: String,
    user_id: { type: Schema.ObjectId, ref: 'User' },



});



module.exports = mongoose.model('Troquelado', TroqueladoSchema);