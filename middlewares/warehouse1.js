'use strict'

exports.Almacen1 = function(request, response, next) {
    if (request.user.role != 'ROLE_ALMACEN1') {
        return response.status(200).send({
            message: 'No tienes acceso a esta zona'
        });
    }
    next();
}