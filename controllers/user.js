'use strict'

// cargar modulos
var bcrypt = require('bcrypt-nodejs');

// cargar modelos
var User = require('../models/user');

//servicio jwt
var jwt = require('../services/jwt');

function pruebas(request, response) {
    response.status(200).send({
        message: 'Probando el controlador de usuarios',
        user: request.user
    });
}

//acciones

// Metodo para guardar un usuario
function saveUser(request, response) {
    //crear objeto usuario
    var user = new User();

    //recoger parametros
    var params = request.body;

    if (params.password && params.name && params.nick) {
        // Asignar valores al objeto usuario
        user.name = params.name;
        user.surname = params.surname;
        user.nick = params.nick;
        user.role = 'ROLE_USER';
        user.section = params.section;


        User.findOne({ nick: user.nick.toLowerCase() }, (error, issetUser) => {
            if (error) {
                response.status(500).send({ message: 'Error al comprobar usuario' });
            } else {
                if (!issetUser) {
                    bcrypt.hash(params.password, null, null, function(error, hash) {
                        user.password = hash;

                        //guardar usuario en bd
                        user.save((error, userStored) => {
                            if (error) {
                                response.status(500).send({ message: 'Error al guardar el usuario' });
                            } else {
                                if (!userStored) {
                                    response.status(404).send({ message: 'No se ha guardado el usuario' });
                                } else {
                                    response.status(200).send({ user: userStored });
                                }
                            }
                        });
                    });
                } else {
                    response.status(200).send({
                        message: 'El usuario no se ha guardado porque ya existe'
                    });
                }
            }
        });

    } else {
        response.status(200).send({
            message: 'Introduce los datos correctamente'
        });
    }


}

// Metodo de login
function login(request, response) {
    var params = request.body;

    var nick = params.nick;
    var password = params.password;
    User.findOne({ nick: nick.toLowerCase() }, (error, user) => {
        if (error) {
            response.status(500).send({ message: 'Error al comprobar usuario' });
        } else {
            if (user) {
                bcrypt.compare(password, user.password, (error, check) => {
                    if (check) {

                        //comprobar y generar el token
                        if (params.gettoken) {
                            //devolver token fwt
                            response.status(200).send({
                                token: jwt.createToken(user)
                            });
                        } else {
                            response.status(200).send({ user })
                        }

                    } else {
                        response.status(404).send({
                            message: 'El usuario no ha podido loguearse correctamente'
                        });
                    }
                });

            } else {
                response.status(404).send({
                    message: 'El usuario no ha podido loguearse'
                });
            }
        }
    });
}

//Metodo para actualizar un usuario
function updateUser(request, response) {
    var userId = request.params.id;
    var update = request.body;
    delete update.password;

    if (userId != request.user.sub) {
        return response.status(500).send({
            message: 'No tienes permiso para actualizar el usuario'
        });
    }

    User.findByIdAndUpdate(userId, update, { new: true }, (error, userUpdated) => {
        if (error) {
            response.status(500).send({
                message: 'Error al actualizar el usuario'
            });
        } else {
            if (!userUpdated) {
                response.status(404).send({
                    message: 'No se ha podido actualizar el usuario'
                });
            } else {
                response.status(200).send({ user: userUpdated });
            }
        }
    });
}

//Metodo para listar los usuarios con role admin
function getAdmins(request, response) {
    User.find({ role: 'ROLE_ADMIN' }).exec((error, users) => {
        if (error) {
            response.status(500).send({
                message: 'Error en la peticion'
            });
        } else {
            if (!users) {
                response.status(404).send({
                    message: 'No hay administradores'
                });
            } else {
                response.status(200).send({ users });
            }
        }
    });

}

//Metodo para listar los usuarios con role user
function getAlmacen1(request, response) {
    User.find({ role: 'ROLE_ALMACEN1' }).exec((error, users) => {
        if (error) {
            response.status(500).send({
                message: 'Error en la peticion'
            });
        } else {
            if (!users) {
                response.status(404).send({
                    message: 'No hay administradores'
                });
            } else {
                response.status(200).send({ users });
            }
        }
    });

}


module.exports = {
    pruebas,
    saveUser,
    login,
    updateUser,
    getAdmins,
    getAlmacen1
};