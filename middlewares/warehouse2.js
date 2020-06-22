'use strict'

exports.Almacen2 = function(request, response, next) {
    if (request.user.role !== 'ALMACEN2') {
        return response.status(200).send({
            message: 'No tienes acceso a esta zona'
        });
    }
    next();
}