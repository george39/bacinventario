'use strict'

var fs = require('fs');
var path = require('path');



var Warehouse2 = require('../models/warehouse2');

function saveWarehouse2(request, response){
	var warehouse2 = new Warehouse2();
	var params = request.body;

	if (params.name) {
		warehouse2.operator = params.operator;
		warehouse2.name = params.name;
		warehouse2.size = params.size;
		warehouse2.reference = params.reference;
		warehouse2.clasification = params.clasification;
		warehouse2.user_id = request.user.sub;

		warehouse2.save((error, warehouse2Stored) => {
			if (error) {
				response.status(500).send({
					message: 'Error en el servidar'
				});
			}else{
				if (!warehouse2Stored) {
					response.status(404).send({
						message: 'No se han podido guardar los datos'
					});
				}else{
					response.status(200).send({
						warehouse2: warehouse2Stored
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
	saveWarehouse2
}