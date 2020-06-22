'use strict'

var fs = require('fs');
var path = require('path');
var Clasification = require('../models/clasification');

function saveClasification(request, response){
	var clasification = new Clasification();
	var params = request.body;

	if (params.name) {
		clasification.name = params.name;

		clasification.save((error, clasificationStored) => {
			if (error) {
				response.status(500).send({
					message: 'Error en el servidor'
				});
			}else{
				if (!clasificationStored) {
					response.status(404).send({
						message: 'No se han podido guardar los datos'
					});
				}else{
					response.status(200).send({
						clasification: clasificationStored
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
	saveClasification
} 