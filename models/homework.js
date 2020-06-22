'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var autoIncrement = require('mongoose-auto-increment');

var AutoIncrement = require('mongoose-sequence')(mongoose);

var Sequelize = require('sequelize');


var HomeworkSchema = Schema({
    _id: Number,
    operator: String,
    name: String,
    size: String,
    quantity: Number,
    reference: Number,
    treintaytres: Number,
    treintaycuatro: Number,
    treintaycinco: Number,
    treintayseis: Number,
    treintaysiete: Number,
    treintayocho: Number,
    treintaynueve: Number,
    cuarenta: Number,
    cuarentayuno: Number,
    cuarentaydos: Number,
    cuarentaytres: Number,
    cuarentaycuatro: Number,
    cuarentaycinco: Number,
    cuarentayseis: Number,
    cuarentaysiete: Number,
    date: { type: Date, default: Date.now() },
    objectId: String,
    user_id: { type: Schema.ObjectId, ref: 'User' },
}, {
    _id: false
});
HomeworkSchema.plugin(AutoIncrement);

module.exports = mongoose.model('Homework', HomeworkSchema);