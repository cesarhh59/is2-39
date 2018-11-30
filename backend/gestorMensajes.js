var express = require('express');
var HashMap = require('hashmap');

var app = express();
// Hashmap de usuarios, dentro de cada usuario: Hashmap de mensajes, con key: idMensaje y value: mensaje.
var lista_idMensajes = new HashMap();//lista de los ids de mensajes activos de cada usuario
var lista_mensajes = new HashMap();//lista de los mensajes activos de cada usuario
// Ejemplos para pruebas:
lista_idMensajes.set("felix_cesar_macarrones", {idMensaje: "felix_cesar_macarrones", fecha: "30-11-2018", texto: "Hola!", receptor: "cesar", emisor: "felix", oferta: "macarrones"}); // ID: emisor+receptor+oferta
lista_idMensajes.set("felix_cesar_Champiñones", {idMensaje: "felix_cesar_Champiñones", fecha: "30-11-2018", texto: "Hola!", receptor: "cesar", emisor: "felix", oferta: "Champiñones"}); // ID: emisor+receptor+oferta

lista_mensajes.set("felix", lista_idMensajes);

function verListaMensajes(usuario){
    return lista_mensajes.get(usuario).keys();
}



app.get('/', function(req, res) {
    res.send('Bienvenido a la apliación de compra y venta de comidas desarrollada por el grupo 39 de Ingeniería del Software II!');
});
app.get('/listaMensajes/:user', function(req, res) {
    var error = verListaMensajes(req.params.user);
    if (error != 'OK') {
        return res.status(200).json({
            ok: false,
            mensaje: 'Se han producido errores listando los mensajes de ' + req.params.user,
            errors: error
        });
    }
    res.status(200).json({
        ok: true,
        body: error
    });
})


////////////////////// PRUEBAS Platos //////////////////////
const util = require('util');

console.log(
    "\n\n lista_mensajes -> " + util.inspect(lista_mensajes,{showHidden: false, depth: null}) + 
    "\n\n verListaMensajes(felix) -> " + verListaMensajes("felix") +
    "\n\n lista_mensajes -> " + util.inspect(lista_mensajes,{showHidden: false, depth: null})
    /// Hasta aqui todo funciona ///
)