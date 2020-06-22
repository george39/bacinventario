'use strict'

var fs = require('fs');
var path = require('path');

var Cementado = require('../models/cementado');

function saveCementado(request, response){
	var cementado = new Cementado();
	var params = request.body;

	if (params.name) {
		cementado.operator = params.operator;
		cementado.name = params.name;
		cementado.size = params.size;
		cementado.reference = params.reference;
		cementado.user_id = request.user.sub;

		cementado.save((error, cementadoStored) => {
			if (error) {
				response.status(500).send({
					message: 'Error en el servidor'
				});
			}else{
				if (!cementadoStored) {
					response.status(404).send({
						message: 'No se ha podido guardar los archivos'
					});
				}else{
					response.status(200).send({
						cementado: cementadoStored
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
	saveCementado
}