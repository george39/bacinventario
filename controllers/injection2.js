'use strict'

var fs = require('fs');
var path = require('path');

var Injection2 = require('../models/injection2');

function saveInjection2(request, response){
	var injection2 = new Injection2();
	var params = request.body;

	if (params.name) {
		injection2.operator = params.operator;
		injection2.name = params.name;
		injection2.reference = params.reference;
		injection2.size = params.size;
		//injection2.date = params.date;
		injection2.user_id = request.user.sub;

		injection2.save((error, injection2Stored) =>{
			if (error) {
				response.status(500).send({
					message: 'Error en el servidor'
				});
			}else{
				if (!injection2Stored) {
					response.status(404).send({
						message: 'No se ha podido guardar el registro'
					});
				}else{
					response.status(200).send({
						injection2: injection2Stored
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
	saveInjection2
}