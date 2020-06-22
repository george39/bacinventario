'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ReferenceSchema = Schema({
    name: String,
    code: String,
    forradura: String,
    capellada: String,
    suela: String,
    user_id: { type: Schema.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('Reference', ReferenceSchema);