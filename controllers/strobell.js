'use strict'

var fs = require('fs');
var path = require('path');

var Strobell = require('../models/strobell');

function saveStrobell(request, response){
	var strobell = new Strobell();
	var params = request.body;

	if (params.name) {
		strobell.operator = params.operator;
		strobell.name = params.name;
		strobell.size = params.size;
		strobell.reference = params.reference;
		strobell.user_id = request.user.sub;

		strobell.save((error, strobellStored) => {
			if (error) {
				response.status(500).send({
					message: 'Error en el servidor'
				});
			}else{
				if (!strobellStored) {
					response.status(404).send({
						message: 'No se han podido guardar los datos'
					});
				}else{
					response.status(200).send({
						strobell: strobellStored
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
	saveStrobell
}