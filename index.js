'use stric'

var mongoose = require('mongoose');
var app = require('./app');

var port = process.env.PORT || 3789;


mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/alpaca', { useNewUrlParser: true })

 	.then(() => {
 		
		console.log('Conexion a la bd alpaca con exito en el puerto 3789');

		app.listen(port, () => {
			console.log('El servidor con Node y Express esta corriendo correctamente');
		});
		
	})
	.catch(error => console.log(error));
	