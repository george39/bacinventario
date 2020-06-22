'use strict'

var fs = require('fs');
var path = require('path');

var ReprocesoCJ = require('../models/reproceso.carlos.julio');

function saveReproceso(request, response){
	var reproceso = ReprocesoCJ();
	var params = request.body;

	if (params.name) {
		reproceso.name = params.name;
		reproceso.reference = params.reference;
		reproceso.size = params.size;

		reproceso.save((error, reprocesoStored) => {
			if (error) {
				response.status(500).send({

					message: 'Error en el servidor'
				});
			}else{
				if (!reprocesoStored) {
					response.status(404).send({
						message: 'No se han podido guardar los datos'
					});
				}else{
					response.status(200).send({
						reproceso: reprocesoStored
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
	saveReproceso
}