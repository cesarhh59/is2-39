//Requires, importacion de librerias 
var express = require('express');
var bodyParser = require('body-parser')


//Body Parser
var express = require('express')
var bodyParser = require('body-parser')

var app = express()




//Inicializar variables
var app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//Conexion a la base de datos
/*
mongoose.connection.openUri('mongodb://localhost:27017/hospitalDB', (err, res) => {
        if (err) throw err;

        console.log('Estado: \x1b[32m%s\x1b[0m', 'conectado');

    })
    //Escuchar peticiones
    */
app.listen(3000, () => {
    console.log('Express server corriendo en el puerto 3000: \x1b[32m%s\x1b[0m', 'online');

});

//Rutas 
var routesPlatos = require('./gestorPlatos');
var routesUsuarios = require('./gestorUsuarios');

app.use('/platos', routesPlatos);
app.use('/usuarios', routesUsuarios);
/*
var usuarioRoutes = require('./routes/usuario');

app.use('/', appRoutes);
*/