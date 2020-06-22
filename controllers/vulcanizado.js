'use strict'

var fs = require('fs');
var path = require('path');

var Vulcanizado = require('../models/vulcanizado');

function saveVulcanizado(request, response){
	var vulcanizado= new Vulcanizado();
	var params = request.body;

	if (params.name) {
		vulcanizado.operator = params.operator;
		vulcanizado.name = params.name;
		vulcanizado.size = params.size;
		vulcanizado.reference = params.reference;
		vulcanizado.user_id = request.user.sub;

		vulcanizado.save((error, vulcanizadoStored) => {
			if (error) {
				response.status(500).send({
					message: 'Error en el servidor'
				});
			}else{
				if (!vulcanizadoStored) {
					response.status(404).send({
						message: 'No se han podido guardar los datos'
					});
				}else{
					response.status(200).send({
						vulcanizado: vulcanizadoStored
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
	saveVulcanizado
}