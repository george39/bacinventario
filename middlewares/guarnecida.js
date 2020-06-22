'use strict'

exports.Guarnecida = function(request, response, next) {
    if (request.user.role != 'ROLE_GUARNECIDA') {
        return response.status(200).send({
            message: 'No tienes acceso a esta zona'
        });
    }
    next();
}