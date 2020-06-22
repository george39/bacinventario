'use strict'

exports.isHomework = function(request, response, next){
	if (request.user.role != 'ROLE_HOMEWORK') {
		return response.status(200).send({
			message: 'No tienes acceso a esta zona'
		});
	}
	next();
}