'use strict'

var fs = require('fs');
var path = require('path');

var Injection = require('../models/injection1');

function saveInjection1(request, response){
	var injection1 = new Injection();
	var params = request.body;

	if (params.name) {
		injection1.operator = params.operator;
		injection1.name = params.name;
		injection1.reference = params.reference;
		injection1.size = params.size;
		//injection1.date = params.date;
		injection1.user_id = request.user.sub;

		injection1.save((error, injection1Stored) => {
			if (error) {
				response.status(500).send({
					message: 'Error en el servidor'
				});
			}else{
				if (!injection1Stored) {
					response.status(404).send({
						message: 'No se ha podido guardar el registro'
					});
				}else{
					response.status(200).send({
						injection1: injection1Stored
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
	saveInjection1
}