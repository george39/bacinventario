'use strict'

var fs = require('fs');
var path = require('path');

var Virado = require('../models/virado');

function saveVirado(request, response){
	var virado= new Virado();
	var params = request.body;

	if (params.name) {
		virado.operator = params.operator;
		virado.name = params.name;
		virado.size = params.size;
		virado.reference = params.reference;
		virado.user_id = request.user.sub;

		virado.save((error, viradoStored) => {
			if (error) {
				response.status(500).send({
					message: 'Error en el servidor'
				});
			}else{
				if (!viradoStored) {
					response.status(404).send({
						message: 'No se han podido guardar los datos'
					});
				}else{
					response.status(200).send({
						virado: viradoStored
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
	saveVirado
}