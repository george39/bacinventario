'use strict'

var fs = require('fs');
var path = require('path');
var moment = require('moment');

var GuarnecidaExterna = require('../models/guarnecida.externa');

function saveGuarnecidaExterna(request, response){
	var guarnecidaExterna = new GuarnecidaExterna();
	var params = request.body;

	if (params.name) {
		guarnecidaExterna.operator = params.operator;
		guarnecidaExterna.name = params.name;
		guarnecidaExterna.size = params.size;
		guarnecidaExterna.quantity = params.quantity;
		guarnecidaExterna.reference = params.reference;
		//guarnecidaExterna.date = params.date;
		guarnecidaExterna.user_id = request.user.sub;

		guarnecidaExterna.save((error, guarnecidaExternaStored) => {
			if (error) {
				response.status(500).send({
					message: 'Error en el servidor'
				});
			}else{
				if (!guarnecidaExternaStored) {
					response.status(404).send({
						message: 'No se ha podido guardar el registro'
					});
				}else{
					response.status(200).send({
						guarnecidaExterna: guarnecidaExternaStored
					});
				}
			}
		});
	}else{
		response.status(200).send({
			message: 'El nombre es obligatorio'
		});
	}
}

module.exports = {
	saveGuarnecidaExterna
}
